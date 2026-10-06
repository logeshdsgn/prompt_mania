/**
 * Prompt Engineering Framework Library — Data Layer
 * Strict adherence to official core framework acronyms,
 * with supplementary components cleanly separated as "Recommended Additions".
 */

export const frameworks = [
  {
    id: 'race',
    name: 'RACE',
    subtitle: 'Role · Action · Context · Explanation',
    material: 'quilted-green',
    collection: 'Core',
    cards: [
      {
        title: 'ROLE',
        icon: 'UserCog',
        isCore: true,
        description:
          'Assign a specific persona and specialized knowledge base to the AI. Define expertise level, communication style, and domain authority to shape response personality.',
        detail: 'e.g. "You are a senior UX researcher with 15 years of experience in automotive luxury interfaces."',
      },
      {
        title: 'ACTION',
        icon: 'Crosshair',
        isCore: true,
        description:
          'Specify exact instructions for the AI to follow. Be clear, directive, and sequential. Outline the precise task, deliverable format, and execution steps.',
        detail: 'e.g. "Conduct a heuristic evaluation of the dashboard layout and produce a prioritized findings report."',
      },
      {
        title: 'CONTEXT',
        icon: 'Network',
        isCore: true,
        description:
          'Provide detailed background, situation analysis, and necessary input materials. Include constraints, audience demographics, and environmental factors.',
        detail: 'e.g. "The target audience is high-net-worth individuals aged 35-60 who value craftsmanship and heritage."',
      },
      {
        title: 'EXPLANATION',
        icon: 'ClipboardCheck',
        isCore: true,
        description:
          'Describe constraints, desired style, output format, and quality criteria. Set tone, length expectations, and success benchmarks for the deliverable.',
        detail: 'e.g. "Output as a structured markdown report with severity ratings, screenshot references, and remediation steps."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'GUARDRAILS & BOUNDARIES',
        icon: 'ShieldAlert',
        isCore: false,
        description:
          'Define hard restrictions, off-limit topics, and negative constraints to prevent hallucinations or out-of-scope recommendations.',
        detail: 'e.g. "Do not recommend third-party frameworks. Limit remedies to native CSS glassmorphic tokens."',
      },
      {
        title: 'FEW-SHOT EXEMPLAR',
        icon: 'FileText',
        isCore: false,
        description:
          'Provide 1-2 high-quality example outputs to anchor the AI\'s formatting and depth expectations.',
        detail: 'e.g. "Reference attached Sample Audit Report #104 as the golden benchmark for section depth."',
      },
    ],
  },
  {
    id: 'co-star',
    name: 'CO-STAR',
    subtitle: 'Context · Objective · Style · Tone · Audience · Response',
    material: 'dark-walnut',
    collection: 'Core',
    cards: [
      {
        title: 'CONTEXT',
        icon: 'BookOpen',
        isCore: true,
        description:
          'Set the stage with background information. Describe the situation, environment, business background, and relevant history the AI needs to understand.',
        detail: 'e.g. "We are launching a new luxury electric sedan targeting the European market."',
      },
      {
        title: 'OBJECTIVE',
        icon: 'Target',
        isCore: true,
        description:
          'Define the specific goal or task you want accomplished. Be precise about the desired outcome and measurable success criteria.',
        detail: 'e.g. "Generate three distinct tagline options that convey silent power and refined elegance."',
      },
      {
        title: 'STYLE',
        icon: 'Palette',
        isCore: true,
        description:
          'Specify the writing or communication style. Reference known authors, brands, or stylistic benchmarks to guide the output character.',
        detail: 'e.g. "Write in the style of Bentley\'s brand communications — understated, authoritative, heritage-rich."',
      },
      {
        title: 'TONE',
        icon: 'Volume2',
        isCore: true,
        description:
          'Set the emotional quality and attitude. Define whether the response should be formal, conversational, inspirational, or analytical.',
        detail: 'e.g. "Maintain a tone of quiet confidence and refined sophistication throughout."',
      },
      {
        title: 'AUDIENCE',
        icon: 'Users',
        isCore: true,
        description:
          'Identify who the output is intended for. Detail demographic traits, technical knowledge level, preferences, and expectations of the audience.',
        detail: 'e.g. "C-suite executives, high-net-worth buyers, and automotive journalists with high expectations for luxury design."',
      },
      {
        title: 'RESPONSE',
        icon: 'FileOutput',
        isCore: true,
        description:
          'Define the exact format and structure of the response. Specify document type, visual layout, length constraints, and required sections.',
        detail: 'e.g. "Provide output formatted as a sleek executive briefing document with a summary bullet list and 3 tagline variants."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'SUCCESS CRITERIA & KPIS',
        icon: 'Award',
        isCore: false,
        description:
          'Include explicit evaluation metrics for scoring output relevance, accuracy, and tone alignment.',
        detail: 'e.g. "Success measure: Taglines must pass 90%+ alignment with brand luxury benchmarks."',
      },
    ],
  },
  {
    id: 'rtf',
    name: 'RTF',
    subtitle: 'Role · Task · Format',
    material: 'brushed-chrome',
    collection: 'Core',
    cards: [
      {
        title: 'ROLE',
        icon: 'Shield',
        isCore: true,
        description:
          'Establish the AI\'s professional identity. Define the expert persona with specific domain credentials and years of experience.',
        detail: 'e.g. "Act as a certified brand strategist specializing in luxury automotive positioning."',
      },
      {
        title: 'TASK',
        icon: 'ListChecks',
        isCore: true,
        description:
          'Clearly outline the task with specific deliverables. Break complex tasks into numbered steps with clear completion criteria.',
        detail: 'e.g. "Analyze three competitor brand positions and create a differentiation matrix."',
      },
      {
        title: 'FORMAT',
        icon: 'LayoutGrid',
        isCore: true,
        description:
          'Specify the exact output structure — tables, bullet points, markdown, JSON, or narrative. Include length constraints and sectioning.',
        detail: 'e.g. "Present findings in a 3-column comparison table followed by a 200-word executive summary."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'REFINEMENT PASS',
        icon: 'Settings2',
        isCore: false,
        description:
          'Add iterative improvement instructions. Specify quality checks, self-review criteria, and enhancement passes to elevate output quality.',
        detail: 'e.g. "Review for jargon, ensure all claims are substantiated, and polish for C-suite readability."',
      },
      {
        title: 'CONTEXT LAYER',
        icon: 'Network',
        isCore: false,
        description:
          'Provide market context or audience parameters to inform task execution.',
        detail: 'e.g. "Market scope: European ultra-luxury EV segment Q3 2026."',
      },
    ],
  },
  {
    id: 'ape',
    name: 'APE',
    subtitle: 'Action · Purpose · Expectation',
    material: 'obsidian-stone',
    collection: 'Core',
    cards: [
      {
        title: 'ACTION',
        icon: 'Zap',
        isCore: true,
        description:
          'Define the specific action the AI must take. Use imperative verbs — analyze, create, compare, synthesize — with clear scope boundaries.',
        detail: 'e.g. "Analyze the user onboarding flow and identify the three highest-friction touchpoints."',
      },
      {
        title: 'PURPOSE',
        icon: 'Compass',
        isCore: true,
        description:
          'Explain why this action matters. Provide the strategic context and business objective that drives the request to align AI reasoning.',
        detail: 'e.g. "This analysis will inform our Q3 retention strategy and reduce churn by targeting drop-off points."',
      },
      {
        title: 'EXPECTATION',
        icon: 'Award',
        isCore: true,
        description:
          'Describe the ideal outcome in detail. Set quality bars, format preferences, and define what "excellent" looks like for this deliverable.',
        detail: 'e.g. "Deliver a slide-ready summary with data visualizations, root cause hypotheses, and three actionable recommendations."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'FEW-SHOT EXAMPLES',
        icon: 'FileText',
        isCore: false,
        description:
          'Provide reference examples of desired output quality to guide the model\'s tone and depth.',
        detail: 'e.g. "See the attached competitive analysis from Q1 as a reference for depth and formatting standards."',
      },
      {
        title: 'NEGATIVE CONSTRAINTS',
        icon: 'Ban',
        isCore: false,
        description:
          'Specify explicit anti-patterns and topics to avoid during response generation.',
        detail: 'e.g. "Do not include speculative financial statistics without explicit sources."',
      },
    ],
  },
  {
    id: 'tag',
    name: 'TAG',
    subtitle: 'Task · Action · Goal',
    material: 'rosewood',
    collection: 'Core',
    cards: [
      {
        title: 'TASK',
        icon: 'ClipboardList',
        isCore: true,
        description:
          'Define the overarching task or challenge. Frame the problem statement clearly, including scope, domain, and key variables at play.',
        detail: 'e.g. "Redesign the customer feedback collection process for our luxury concierge service."',
      },
      {
        title: 'ACTION',
        icon: 'Play',
        isCore: true,
        description:
          'Specify the concrete actions the AI should take to address the task. Order them logically and indicate dependencies between steps.',
        detail: 'e.g. "1. Audit current touchpoints. 2. Benchmark against Ritz-Carlton and Four Seasons. 3. Propose three new flows."',
      },
      {
        title: 'GOAL',
        icon: 'Trophy',
        isCore: true,
        description:
          'Articulate the end goal with measurable success criteria. Define KPIs, quality metrics, or observable outcomes that signal completion.',
        detail: 'e.g. "Achieve a 40% increase in feedback response rate while maintaining NPS above 85."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'GUARDRAILS & LIMITS',
        icon: 'ShieldCheck',
        isCore: false,
        description:
          'Set boundaries and constraints. Define what the AI should avoid, ethical considerations, and hard brand limits.',
        detail: 'e.g. "Do not suggest incentivized reviews. Maintain brand voice. Keep all flows under 3 steps for the customer."',
      },
      {
        title: 'DELIVERABLE FORMAT',
        icon: 'FileOutput',
        isCore: false,
        description:
          'Specify structural layout, section breakdown, and presentation format.',
        detail: 'e.g. "Deliver as a 3-page PDF slide deck outline with executive bullet points."',
      },
    ],
  },
  {
    id: 'risen',
    name: 'RISEN',
    subtitle: 'Role · Instructions · Steps · End Goal · Narrowing',
    material: 'carbon-fiber',
    collection: 'Core',
    cards: [
      {
        title: 'ROLE',
        icon: 'Crown',
        isCore: true,
        description:
          'Assign an authoritative expert role with deep domain specialization. The more specific the persona, the more focused the AI\'s reasoning becomes.',
        detail: 'e.g. "You are the Chief Design Officer at a heritage British luxury automaker with 30 years of experience."',
      },
      {
        title: 'INSTRUCTIONS',
        icon: 'ScrollText',
        isCore: true,
        description:
          'Provide precise, unambiguous instructions. Use numbered lists for multi-step processes and clearly mark required versus optional elements.',
        detail: 'e.g. "Evaluate the interior material palette. Focus on tactile quality, visual harmony, and perceived value."',
      },
      {
        title: 'STEPS',
        icon: 'GitBranch',
        isCore: true,
        description:
          'Break the task into sequential, logical steps. Each step should have a clear input, process, and output to maintain chain-of-thought reasoning.',
        detail: 'e.g. "Step 1: Inventory current materials. Step 2: Score each on 5 criteria. Step 3: Recommend substitutions."',
      },
      {
        title: 'END GOAL',
        icon: 'Flag',
        isCore: true,
        description:
          'Paint a vivid picture of the desired final state. Describe what success looks like in concrete, observable terms that leave no room for ambiguity.',
        detail: 'e.g. "A materials specification document ready for the prototype workshop, with supplier contacts and cost estimates."',
      },
      {
        title: 'NARROWING',
        icon: 'Filter',
        isCore: true,
        description:
          'Prune off-target outputs by establishing strict boundary conditions, negative prompts, exclusions, and domain constraints.',
        detail: 'e.g. "Exclude all synthetic vinyls or artificial leathers. Only evaluate natural, sustainably sourced luxury materials."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'VALIDATION CHECKLIST',
        icon: 'ClipboardCheck',
        isCore: false,
        description:
          'Self-verification checklist to ensure all constraints and design requirements are met before finalizing.',
        detail: 'e.g. "Verify that sustainability certifications match EU REACH compliance standards."',
      },
    ],
  },
  {
    id: 'create',
    name: 'CREATE',
    subtitle: 'Character · Request · Examples · Adjustments · Type · Extras',
    material: 'marble',
    collection: 'Core',
    cards: [
      {
        title: 'CHARACTER',
        icon: 'Drama',
        isCore: true,
        description:
          'Build a rich, multi-dimensional AI persona. Beyond expertise, define personality traits, communication preferences, and decision-making style.',
        detail: 'e.g. "A meticulous Swiss watchmaker who values precision above all, speaks sparingly, and backs every claim with data."',
      },
      {
        title: 'REQUEST',
        icon: 'MessageSquare',
        isCore: true,
        description:
          'Formulate your core request with surgical precision. State exactly what you need, by when, and at what quality level. Eliminate all ambiguity.',
        detail: 'e.g. "Draft a 1500-word white paper on sustainable luxury materials for our 2026 sustainability report."',
      },
      {
        title: 'EXAMPLES',
        icon: 'Images',
        isCore: true,
        description:
          'Supply 2–3 exemplary outputs that demonstrate ideal quality, structure, and tone. Few-shot examples are the single most effective prompt technique.',
        detail: 'e.g. "Attached: Two previous white papers from our sustainability series as style and depth references."',
      },
      {
        title: 'ADJUSTMENTS',
        icon: 'SlidersHorizontal',
        isCore: true,
        description:
          'Set parameters for iterative refinement, tone tuning, length calibration, and self-correction passes during generation.',
        detail: 'e.g. "Calibrate vocabulary for academic rigor. If technical terms are used, provide brief inline definitions."',
      },
      {
        title: 'TYPE OF OUTPUT',
        icon: 'FileOutput',
        isCore: true,
        description:
          'Explicitly define the output format and medium. Specify document type, structure, sections, visual elements, and any template to follow.',
        detail: 'e.g. "Markdown document with H2 sections, pull quotes, data callout boxes, and a references section in APA format."',
      },
      {
        title: 'EXTRAS',
        icon: 'Sparkles',
        isCore: true,
        description:
          'Include supplementary directives, edge-case handling rules, fallback formats, and quality assurance benchmarks.',
        detail: 'e.g. "Include an Executive Summary callout box at the top and a 5-bullet Key Takeaways section at the end."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'EXCLUSIONS & BOUNDARIES',
        icon: 'Ban',
        isCore: false,
        description:
          'Explicit list of topics, formats, or opinions to exclude from white paper narrative.',
        detail: 'e.g. "Exclude unverified lab prototypes; only feature commercially viable sustainable materials."',
      },
    ],
  },
  {
    id: 'role',
    name: 'ROLE',
    subtitle: 'Role · Objective · Layout · Evaluation',
    material: 'ivory-leather',
    collection: 'Core',
    cards: [
      {
        title: 'ROLE',
        icon: 'User',
        isCore: true,
        description:
          'Define who the AI should become — their profession, seniority, specialty, and unique perspective. The richer the role, the better the output.',
        detail: 'e.g. "You are an award-winning interior architect who specializes in ultra-luxury residential spaces."',
      },
      {
        title: 'OBJECTIVE',
        icon: 'Milestone',
        isCore: true,
        description:
          'State the primary objective with crystal clarity. What must be achieved? What problem is being solved? What decision will this output inform?',
        detail: 'e.g. "Create a mood board concept for a penthouse living space that balances warmth with minimalist grandeur."',
      },
      {
        title: 'LAYOUT',
        icon: 'LayoutTemplate',
        isCore: true,
        description:
          'Structure the expected response. Define sections, hierarchy, visual organization, and information density. Guide how content should flow.',
        detail: 'e.g. "Organize as: 1. Design Philosophy, 2. Material Palette, 3. Spatial Flow, 4. Lighting Concept, 5. Key Furniture Pieces."',
      },
      {
        title: 'EVALUATION',
        icon: 'CheckSquare',
        isCore: true,
        description:
          'Set evaluation criteria and benchmark standards to score the generated layout and design recommendations.',
        detail: 'e.g. "Evaluate spatial flow against luxury usability standards and acoustics parameters."',
      },
    ],
    recommendedAdditions: [
      {
        title: 'LIMITATIONS & CONSTRAINTS',
        icon: 'Ban',
        isCore: false,
        description:
          'Set explicit boundaries. Define budget caps, material exclusions, and heritage building compliance rules.',
        detail: 'e.g. "No synthetic materials. Budget cap: €500K. Must comply with heritage building regulations."',
      },
    ],
  },
];

export const getFrameworkById = (id) =>
  frameworks.find((f) => f.id === id) || frameworks[0];
