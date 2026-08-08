/* Anonymized synthetic fixtures for the DMF Brain mini-demo.
   Fictional contractor-ops company — not live DMF data. */
window.BRAIN_FIXTURES = {
  label: "SYNTHETIC · FICTIONAL TRADES CO.",
  company: "Ridgeway Field Services",
  seedNodes: [
    {
      id: "proj-intake",
      label: "Intake Rebuild",
      kind: "project",
      blurb: "Phone + web booking rewrite for a 12-truck HVAC shop.",
    },
    {
      id: "proj-crm",
      label: "CRM Briefs",
      kind: "project",
      blurb: "Stage-triggered opportunity briefs over the CRM of record.",
    },
    {
      id: "proj-voice",
      label: "Voice Line Build",
      kind: "project",
      blurb: "Compile a messy service business into a phone-agent definition.",
    },
    {
      id: "store-hybrid",
      label: "Hybrid Store",
      kind: "store",
      blurb: "pgvector + keyword index. Only promoted artifacts land here.",
    },
    {
      id: "gate-human",
      label: "Human Gate",
      kind: "gate",
      blurb: "Nothing is retrievable until an operator promotes it.",
    },
    {
      id: "mcp-serve",
      label: "MCP Serve",
      kind: "mcp",
      blurb: "Nine tools models use to ask the company brain.",
    },
  ],
  seedEdges: [
    { id: "e-gate-store", source: "gate-human", target: "store-hybrid", label: "promotes into" },
    { id: "e-store-mcp", source: "store-hybrid", target: "mcp-serve", label: "serves" },
    { id: "e-mcp-crm", source: "mcp-serve", target: "proj-crm", label: "grounds" },
    { id: "e-mcp-intake", source: "mcp-serve", target: "proj-intake", label: "grounds" },
    { id: "e-mcp-voice", source: "mcp-serve", target: "proj-voice", label: "grounds" },
  ],
  /** Ingress artifacts waiting to be injected. */
  artifacts: [
    {
      id: "art-agent-01",
      channel: "agent",
      channelLabel: "CODING AGENT",
      title: "Session handoff · dispatch rules",
      raw: "Agent session notes: Ridgeway techs double-book when storm tickets spike. Proposal — queue overflow to a standby roster; write the rule into the intake state machine before Friday's deploy.",
      projectHint: "proj-intake",
      unlocks: [
        {
          target: "proj-voice",
          label: "watcher · reuse",
          detail: "Overflow roster rule also belongs in the phone-agent build-spec (after-hours branch).",
        },
      ],
    },
    {
      id: "art-email-01",
      channel: "email",
      channelLabel: "EMAIL",
      title: "Ops email · missed bookings",
      raw: "From: ops@ridgeway.example — We lost three web bookings Tuesday night. Need the intake brain to surface 'why missed' next to each abandoned slot, not in a separate spreadsheet.",
      projectHint: "proj-intake",
      unlocks: [
        {
          target: "proj-crm",
          label: "watcher · cross-project",
          detail: "Abandoned-slot reasons map to the CRM brief's 'last inbound failure' field — clone the shape.",
        },
      ],
    },
    {
      id: "art-sms-01",
      channel: "sms",
      channelLabel: "SMS",
      title: "Owner SMS · Friday surge",
      raw: "SMS from owner: Friday AC surge starting. If the line fills, text customers a self-serve slot link before they hang up. Do not email blast.",
      projectHint: "proj-voice",
      unlocks: [
        {
          target: "proj-intake",
          label: "watcher · feeds",
          detail: "Self-serve slot link is an intake surface — voice build must call the same booking contract.",
        },
      ],
    },
    {
      id: "art-agent-02",
      channel: "agent",
      channelLabel: "CODING AGENT",
      title: "Spec draft · opportunity brief",
      raw: "Agent drafted a brief schema: account health, open work orders, last estimate, crew proximity. Waiting on human review before any model can retrieve it.",
      projectHint: "proj-crm",
      unlocks: [
        {
          target: "proj-voice",
          label: "watcher · clone-spec",
          detail: "Same brief shape can pre-load the phone agent before the first ring.",
        },
      ],
    },
    {
      id: "art-email-02",
      channel: "email",
      channelLabel: "EMAIL",
      title: "Vendor email · parts ETA",
      raw: "Vendor note: compressor ETA slipped to Monday. Ops wants this fact in the company brain so dispatch and the phone line both stop promising Saturday installs.",
      projectHint: "proj-crm",
      unlocks: [
        {
          target: "proj-intake",
          label: "watcher · blocks",
          detail: "Parts ETA becomes a booking constraint — intake must refuse Saturday installs for that SKU.",
        },
      ],
    },
    {
      id: "art-sms-02",
      channel: "sms",
      channelLabel: "SMS",
      title: "Dispatcher SMS · crew geography",
      raw: "Dispatch: two techs stuck north of the river. Prefer south-side jobs until 3pm. Put it where the agents can see it.",
      projectHint: "proj-intake",
      unlocks: [
        {
          target: "proj-crm",
          label: "watcher · enriches",
          detail: "Crew geography should land in the pre-visit CRM brief the AE opens on-site.",
        },
      ],
    },
  ],
};
