// Soft analytics sink — accepts same-site beacons and logs structured events.
// View in Netlify function logs. Optional Plausible runs client-side in parallel.

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 40;
const buckets = new Map();

function clientIp(req) {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function sameSite(req) {
  const host = req.headers.get("host");
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return Boolean(host) && new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  const site = req.headers.get("sec-fetch-site");
  return site === "same-origin" || site === "same-site" || site === "none";
}

function rateLimit(ip) {
  const now = Date.now();
  let bucket = buckets.get(ip);
  if (!bucket || now >= bucket.reset) {
    bucket = { count: 0, reset: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;
  if (buckets.size > 4000) {
    for (const [key, value] of buckets) {
      if (now >= value.reset) buckets.delete(key);
    }
  }
  return bucket.count <= MAX_PER_WINDOW;
}

function scrubProps(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out = {};
  for (const [k, v] of Object.entries(raw).slice(0, 12)) {
    const key = String(k).slice(0, 40);
    if (typeof v === "string") out[key] = v.slice(0, 120);
    else if (typeof v === "number" || typeof v === "boolean") out[key] = v;
  }
  return out;
}

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      },
    });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method-not-allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }
  if (!sameSite(req)) {
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }
  if (!rateLimit(clientIp(req))) {
    return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  }

  const name = typeof body?.name === "string" ? body.name.slice(0, 64) : "";
  if (!name) {
    return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  }

  console.log(
    JSON.stringify({
      type: "dmf_event",
      name,
      props: scrubProps(body.props),
      path: typeof body.path === "string" ? body.path.slice(0, 200) : "",
      ts: typeof body.ts === "number" ? body.ts : Date.now(),
      ip: clientIp(req),
    }),
  );

  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
};

export const config = { path: "/api/event" };
