/**
 * Assembled Total Prompts Library & Dynamic Generator.
 * Provides production-ready, cohesive prompt examples demonstrating how
 * individual framework modules combine into high-performance LLM prompts.
 */

const CURATED_PROMPTS = {
  race: `[ROLE]
You are a senior UX researcher and interface architect with 15+ years of experience in automotive luxury and high-performance digital cockpits.

[ACTION]
Conduct a comprehensive heuristic evaluation of the primary dashboard interface:
1. Identify the top 3 cognitive overload issues when viewing the screen at 60 mph.
2. Formulate 3 actionable UX redesign recommendations that streamline driver focus.
3. Provide revised typography, spacing, and micro-interaction guidelines tailored for luxury ergonomics.

[CONTEXT]
We are redesigning the center console dashboard for a flagship electric luxury vehicle. The target audience is high-net-worth individuals aged 35–60 who value craftsmanship, heritage, and glanceability without distraction.

[EXPLANATION]
Deliver your evaluation strictly in structured Markdown:
- Executive Summary (max 3 sentences)
- Heuristic Breakdown Table (Columns: Heuristic Violated, Severity Level 1-4, Observed Flaw, Recommended Fix)
- Redesigned Interface Specification (Bullet points with exact spacing and micro-copy standards)
- Tone: Direct, authoritative, engineering-grade, free of marketing fluff.

[GUARDRAILS & BOUNDARIES]
- Do not propose full-voice-only interfaces as a solution; physical touch/visual glanceability must remain primary.
- Do not introduce non-standard gestures.
- Limit all remedies to native CSS glassmorphic tokens and driver safety compliance standards.`,

  'co-star': `[CONTEXT]
We are launching a new flagship luxury electric sedan targeting the European executive market.

[OBJECTIVE]
Generate three distinct positioning tagline concepts that articulate silent electric powertrain performance combined with timeless bespoke craftsmanship.

[STYLE]
Write in the distinctive voice of heritage British luxury communications — understated, authoritative, evocative, and heritage-rich.

[TONE]
Maintain a tone of quiet confidence, aristocratic understatement, and refined sophistication.

[AUDIENCE]
C-suite executives, high-net-worth buyers, and discerning automotive critics who prioritize bespoke interior craftsmanship over tech gimmicks.

[RESPONSE]
Provide an executive briefing document containing:
1. Core Creative Angle (1 paragraph)
2. 3 Tagline Options (with 2-sentence rationale for each)
3. Sample Print Headline & Body Copy Snippet for each tagline`,

  ape: `[ACTION]
Analyze the user onboarding funnel for a high-value SaaS product and pinpoint the drop-off points between account creation and initial workflow completion.

[PURPOSE]
To increase Day-7 user retention by 25% and ensure users experience the primary product "aha moment" in their first 48 hours.

[EXPECTATION]
Deliver a prioritized 5-step action plan with clear conversion benchmarks, copy refinements for onboarding modals, and telemetry metrics to track each phase.`,

  tag: `[TASK]
Draft an executive announcement communicating a critical infrastructure migration to Cloud Native architecture.

[ACTION]
Explain the technical resilience benefits, reassure non-technical stakeholders about zero planned downtime, and outline the phased migration timeline across Q3-Q4.

[GOAL]
Secure leadership alignment and eliminate stakeholder anxiety regarding data integrity and system availability during migration.`,

  care: `[CONTEXT]
Our customer support team is transitioning to an AI-assisted ticket triage system for tier-1 inquiries.

[ACTION]
Design an escalation matrix and decision tree that determines when an issue should be handled automatically vs routed immediately to a senior specialist.

[RESULT]
A 40% reduction in average resolution time while maintaining a 98%+ customer satisfaction score.

[EXAMPLE]
Include a concrete walkthrough of a complex billing dispute showing the exact decision branching and handoff communication.`,

  rtf: `[ROLE]
You are a Staff Security Engineer specializing in OAuth 2.1, JWT handling, and zero-trust authentication flows.

[TASK]
Review the proposed token refresh architecture for our distributed microservices API gateway.

[FORMAT]
Provide a security threat model table (STRIDE methodology) followed by numbered code implementation recommendations in TypeScript/Node.js.`,

  era: `[EXPECTATION]
Produce a production-grade Redis caching strategy for our high-throughput catalog search API with 99.9th percentile latency under 20ms.

[ROLE]
Act as a Principal Database Reliability Engineer with deep expertise in in-memory datastores and cache invalidation patterns.

[ACTION]
Define key namespace schema, cache-aside eviction logic, TTL distribution, and circuit-breaker handling during Redis failover.`,

  risen: `[ROLE]
You are the Chief Design Officer at a heritage British luxury automaker with 30 years of interior craftsmanship experience.

[INSTRUCTIONS]
Conduct an exhaustive audit of our proposed sustainable cabin material palette. Focus on tactile luxury, acoustic dampening, perceived visual warmth, and ergonomic durability.

[STEPS]
1. Inventory all proposed natural veneers and organic textile options.
2. Score each material across 5 dimensions: Sustainability index, Luxury feel, Scratch resistance, Thermal stability, and Cost per unit.
3. Recommend top 3 sustainable substitutions for legacy petroleum-based trim.

[END GOAL]
Deliver a workshop-ready materials specification sheet formatted for our prototyping artisans, including supplier certifications and assembly notes.

[NARROWING]
Exclude all synthetic vinyls and faux leathers. Only evaluate natural, ethically harvested luxury materials that comply with EU REACH standards.`,

  create: `[CHARACTER]
A meticulous Swiss mechanical watchmaker and horological engineer who prizes micrometer precision, speaks concisely, and substantiates every design decision with empirical data.

[REQUEST]
Draft a 1,500-word engineering white paper analyzing ultra-high-frequency escapement mechanisms and their thermal expansion tolerances in luxury sports chronographs.

[EXAMPLES]
Reference the horological white paper structure from Vacheron Constantin Bulletin #42: Executive thesis, metallurgic breakdown, friction coefficient table, and conclusion.

[ADJUSTMENTS]
Maintain rigorous technical vocabulary. When citing tribological properties or synthetic jewel friction, include inline SI metric specifications.

[TYPE OF OUTPUT]
Structured technical Markdown featuring section headings (H2/H3), callout blocks for metallurgical formulas, and an APA-formatted reference bibliography.

[EXTRAS]
Include an Executive Summary callout box at the top, a 5-bullet Key Engineering Takeaways section, and a risk matrix table covering lubricant viscosity degradation over 10-year service intervals.`,

  role: `[ROLE]
You are an award-winning interior architect specializing in ultra-luxury minimalist residences and private galleries.

[OBJECTIVE]
Create a master interior spatial concept for a 6,000 sq ft penthouse living salon that balances gallery-level acoustic warmth with monolithic natural stone aesthetics.

[LAYOUT]
Structure the deliverable strictly into 4 sections:
1. Spatial Philosophy & Sightlines
2. Material & Texture Palette (Pietra Cardosa stone, smoked oak, brushed patinated brass)
3. Architectural Lighting Temperature & Hidden Cove Luminaire Schedule
4. Signature Bespoke Furniture Placement Plan

[EVALUATION]
Evaluate the spatial flow against luxury residential ergonomics, sound reverberation time (<0.6s), and privacy sightlines from entry vestibules.

[LIMITATIONS & CONSTRAINTS]
Budget ceiling is €750,000. All timber must be FSC-certified old-growth salvage. Exclude all polished high-gloss surfaces.`
};

/**
 * Returns a complete, production-ready assembled prompt for any framework.
 * Uses handcrafted curated prompts for built-in frameworks, or dynamically
 * generates one for custom / AI-generated frameworks.
 */
export function getAssembledPrompt(framework) {
  if (!framework) return '';

  if (CURATED_PROMPTS[framework.id]) {
    return CURATED_PROMPTS[framework.id];
  }

  // Fallback dynamic assembler for custom frameworks
  const cleanDetail = (detail) => {
    if (!detail) return '';
    return detail.replace(/^e\.g\.\s*["“']?|["”']?\s*$/g, '').trim();
  };

  const sections = [];

  (framework.cards || []).forEach((card) => {
    const text = cleanDetail(card.detail) || card.description;
    if (text) {
      sections.push(`[${card.title}]\n${text}`);
    }
  });

  if (framework.recommendedAdditions && framework.recommendedAdditions.length > 0) {
    framework.recommendedAdditions.forEach((card) => {
      const text = cleanDetail(card.detail) || card.description;
      if (text) {
        sections.push(`[${card.title}]\n${text}`);
      }
    });
  }

  return sections.join('\n\n');
}
