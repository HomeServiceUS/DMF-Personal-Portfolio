/* Grounding record for the "Ask my work" agent.
   Client-side fallback retrieval uses this; the Netlify function has its own copy. */
window.DMF_KB = [
  {
    q: "Who is Dave Freeman?",
    k: ["who","dave","freeman","about","bio","operator","applied","ai","engineer","new jersey","management","dmf"],
    a: "Dave Freeman is an Applied AI Engineer based in New Jersey (remote-friendly). He spent decades running trades operations — crews, assets, P&L, growth — and for the past two years has been the one-person AI department inside The DMF Company, shipping the DMF Brain, DMF control plane, DMF sales app, ServiceRelay, vision pipelines, and the production plumbing between them. He runs 20+ agents in production. Nothing in the portfolio is a demo; most of it is in daily use."
  },
  {
    q: "The operator-engineer edge",
    k: ["edge","hire","why","operator","journeyman","trades","management","kpi","p&l","ramp","difference","people"],
    a: "Most candidates learned the business after the code — Dave ran the business first, and the code exists because the operation needed it. He managed crews, clients, and vendor networks across B2B and B2C, ran KPI scoreboards and gamified performance systems, then built the full-stack software those operations needed — including 20+ agents now in production at The DMF Company. The result is zero ramp on operational context: he already knows where operations break, and the systems are built for that reality."
  },
  {
    q: "The DMF Brain — company knowledge engine",
    k: ["dmf","brain","knowledge","engine","rag","retrieval","ingestion","mcp","ledger","index","semantic","vector","architecture","grounding"],
    a: "The DMF Brain is The DMF Company's knowledge engine — a grounding brain that compounds as the company feeds it. It captures from every work surface (coding agents, chat, email, SMS) through one MCP agent protocol; runs staged ingestion (classify, chunk + embed) promoted only through a human review gate; stores an append-only decision ledger plus a pgvector store and a keyword index; and serves hybrid, RRF-fused retrieval back to models through a custom MCP server of nine tools. Watcher agents flag where one project's advance can be reused in another, and a plain-English review spans both the index and the raw ingest."
  },
  {
    q: "DMF control plane — agent platform",
    k: ["control","plane","safe","safety","governance","guardrails","human","approval","spec","langfuse","observability","budgets","retries","contract","fleet","20"],
    a: "The DMF control plane treats agents as governed infrastructure, not scripts — with 20+ agents in production. Every agent shares one spec shape — tools, outcome, guardrails, test suite — and runs on a shared harness with loop guards, budgets, and retries, observed run-by-run in Langfuse. State machines drive the pipelines, and a human approves anything that touches money or customers. That human-approval spine runs through the product work too: nothing reaches a real customer inbox without sign-off, and every run is logged and auditable."
  },
  {
    q: "DMF sales app — CRM intelligence + prospecting",
    k: ["sales","app","crm","salesforce","apex","lwc","flow","cpq","soql","brief","payments","esignature","dmf","prospecting","farm","enrich","score","reach"],
    a: "The DMF sales app is the AI layer inside Salesforce that the DMF sales team uses every day — CRM intelligence plus a prospecting board. It generates stage-triggered briefs from parallel queries across 15+ objects, runs a farm → enrich → score → reach state machine with a human-approval spine before any inbox send, exposes a conversational agent with live SOQL-backed tools over real orders, and puts pre-visit intel on the record. It also owns CPQ, payments, and e-signature. Built on Salesforce: Apex, LWC, Flow, CPQ."
  },
  {
    q: "Vision & document pipelines",
    k: ["vision","document","ocr","receipt","pdf","photo","extraction","json","perception","serverless","webhook"],
    a: "Perception pipelines that turn unstructured field reality into clean records: receipt photos become categorized ledger rows via vision plus strict structured JSON; serverless PDF estimate extraction; automated quality flags on field photos. Every pipeline validates, retries, and fails loudly — loud, logged, retried — over webhooks and serverless functions."
  },
  {
    q: "Voice agent pipeline",
    k: ["voice","phone","agent","elevenlabs","twilio","conversation","flows","build spec","microsite","servicerelay"],
    a: "A pipeline that goes from 'who is this business?' to a deployable phone agent — the same muscle behind ServiceRelay. It researches a business, derives what its phone line actually needs to do, and emits the complete build — configs, conversation flows, tools, knowledge base — staged so setup is mechanical and delivered as build-spec microsites. The hard problem it solves: compiling a messy, real business into a correct agent definition."
  },
  {
    q: "ServiceRelay — booking & intake (DMF product)",
    k: ["servicerelay","service","relay","booking","intake","contractor","voice","web","sms","calendar","white-label","product"],
    a: "ServiceRelay is the productized booking & intake line from The DMF Company: voice agents that answer and book, plus web intake wired to calendars and CRMs, with white-label skins per client. It answers, books, and follows up so a contractor never misses revenue while the operator stays on the roof. Proven inside a live operation before carrying the flag."
  },
  {
    q: "Prospecting & lead engine (DMF product)",
    k: ["lead","prospecting","engine","farm","enrich","score","outreach","state machine","approval","dmf"],
    a: "An agent-run lead engine from The DMF Company: source and farm leads, enrich them with agents, score for fit, then reach out — a status-column state machine with a human-approval spine. Nothing reaches a real inbox without sign-off, and every run is logged and auditable."
  },
  {
    q: "Image generation array (DMF product)",
    k: ["image","generation","brand","creative","prompt","multi-model","curation","campaign"],
    a: "A DMF generative image array that turns one creative brief into arrays of on-brand imagery, using style-locked prompt systems and multi-model routing, with human curation before anything ships — volume without the AI-slop look."
  },
  {
    q: "Video generation pipeline (DMF product)",
    k: ["video","generation","script","scenes","broll","ad","cut","short-form","hooks"],
    a: "A DMF script-to-cut ad assembly pipeline: model-written scripts become generated scenes and b-roll, then platform-ready cuts with hooks and captions built in — designed to close the loop against real ad-account performance, not taste."
  },
  {
    q: "Competitive intelligence platform (DMF product)",
    k: ["competitive","intelligence","seo","serp","ahrefs","semrush","market","dashboard","keywords","warehouse"],
    a: "A DMF Ahrefs/Semrush-class lens scoped to a single market: commercial SEO/SERP feeds (rankings, keywords, competitor pages and ads) ingested on schedule into a warehouse with live dashboards showing who ranks, who's spending, and where the gaps are. The big suites cover everyone; this tells one operator what to do next."
  },
  {
    q: "Marketing automation suite (DMF product)",
    k: ["marketing","automation","funnel","role","agents","strategist","copywriter","creative","analyst","skin","rebrand"],
    a: "DMF full-funnel automation — capture, nurture, campaign production — run by a team of role-agents (strategist, copywriter, creative director, analyst) under one brand memory. One config re-skins the whole suite; the skin-switch is the product."
  },
  {
    q: "The method — one operator, team-scale output",
    k: ["method","how","skills","library","tools","proof","qa","handoffs","loops","fit","full-stack"],
    a: "Frontier models are treated as production infrastructure. A 40-skill library encodes conventions, schemas, brand systems, error playbooks and QA gates so every session starts at full context. Tools act as hands via MCP connectors to the database, deploy target, automation platform and comms stack. Proof beats claims: headless-browser harnesses and numeric render gates (including a procedural 3D build QA'd through a 24-check pipeline) — if it can't be verified against real pixels or rows, it isn't done. Structured handoffs and append-only logs keep long builds honest, build loops improve the loop, and the tool has to fit the job exactly or it doesn't ship."
  },
  {
    q: "The stack",
    k: ["stack","tools","tech","claude","mcp","langfuse","supabase","postgres","pgvector","salesforce","n8n","twilio","elevenlabs","stripe","three","react","astro","vite","netlify"],
    a: "Models & agents: Claude API (tool use, structured outputs, vision, prompt caching), MCP custom servers & clients, Langfuse, agent SDKs & managed runners. Data & records: Supabase/Postgres (pgvector, RLS, Edge Functions), Salesforce (Apex, LWC, Flow, CPQ), append-only ledgers and state machines. Automation & comms: n8n, Twilio, ElevenLabs, Stripe. Web & 3D: three.js / R3F, React · Astro · Vite, Netlify sites & functions, headless Chromium QA rigs. Chosen for durability under one operator — boring where boring wins, sharp where it pays."
  },
  {
    q: "Contact & the standing challenge",
    k: ["contact","hire","email","reach","challenge","prototype","72","hours","references"],
    a: "Reach Dave at dave@thedmfcompany.com. There's a standing challenge: send the hardest problem — a broken workflow, a messy dataset, a process that eats your team's week — and within 72 hours you'll get a working prototype or an honest 'don't build this.' References and detail available on request."
  }
];
