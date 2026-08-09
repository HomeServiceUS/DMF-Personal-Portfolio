/* Soft analytics: Plausible (if loaded) + same-site /api/event beacon. */
(function () {
  "use strict";
  function track(name, props) {
    if (!name || typeof name !== "string") return;
    var payload = {
      name: String(name).slice(0, 64),
      props: props && typeof props === "object" ? props : {},
      path: location.pathname || "/",
      ts: Date.now(),
    };
    try {
      if (typeof window.plausible === "function") {
        window.plausible(payload.name, { props: payload.props });
      }
    } catch (_) {}
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/event",
          new Blob([body], { type: "application/json" }),
        );
      } else {
        fetch("/api/event", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: body,
          keepalive: true,
          credentials: "same-origin",
        }).catch(function () {});
      }
    } catch (_) {}
  }
  window.dmfTrack = track;
})();
