/**
 * AI Framework Architect Generator Utility
 * Generates domain-tailored, multi-option prompt framework structures,
 * educational reasoning breakdowns, and visual execution flows.
 */

// Preset domain templates for instant generation
const DOMAIN_PRESETS = {
  'medical diagnosis': [
    {
      id: 'medic',
      name: 'MEDIC',
      acronym: 'MEDIC',
      subtitle: 'Medical Role · Evidence · Differential · Investigation · Conclusion',
      material: 'quilted-green',
      collection: 'Healthcare',
      reasoning:
        'Follows the standard clinical reasoning methodology used in medical residency: establish physician authority, synthesize subjective/objective evidence, rank differential diagnoses, order investigations, and render actionable treatment conclusions.',
      flow: ['Medical Role', 'Evidence Collection', 'Differential Diagnosis', 'Investigation Plan', 'Clinical Conclusion'],
      cards: [
        {
          title: 'MEDICAL ROLE',
          icon: 'UserCog',
          isCore: true,
          description: 'Establish the AI as a board-certified specialist with extensive clinical experience.',
          detail: 'e.g. "Act as a board-certified neurologist with 20 years of clinical experience in movement disorders."',
        },
        {
          title: 'EVIDENCE COLLECTION',
          icon: 'ClipboardList',
          isCore: true,
          description: 'Gather patient history, onset, lab values, symptoms, medications, and vital signs.',
          detail: 'e.g. "Patient is a 58-year-old male presenting with acute unilateral resting tremor, onset 3 weeks ago."',
        },
        {
          title: 'DIFFERENTIAL DIAGNOSIS',
          icon: 'GitBranch',
          isCore: true,
          description: 'Rank probable conditions from most likely to rare edge cases with clinical rationales.',
          detail: 'e.g. "1. Early Parkinsonian syndrome (65%), 2. Essential tremor (25%), 3. Drug-induced parkinsonism (10%)."',
        },
        {
          title: 'INVESTIGATION PLAN',
          icon: 'Search',
          isCore: true,
          description: 'Recommend targeted diagnostic tests, imaging, bloodwork, or specialist referrals.',
          detail: 'e.g. "Order DATScan SPECT imaging, serum ceruloplasmin, and brain MRI with T2-weighted sequences."',
        },
        {
          title: 'CLINICAL CONCLUSION',
          icon: 'FileCheck',
          isCore: true,
          description: 'Provide preliminary diagnosis, therapeutic recommendations, red-flag warnings, and follow-up timeline.',
          detail: 'e.g. "Initiate low-dose levodopa/carbidopa trial; re-evaluate in 4 weeks. Red flag: acute dysphagia."',
        },
      ],
      recommendedAdditions: [
        {
          title: 'CONTRAINDICATION GUARDRAILS',
          icon: 'ShieldAlert',
          isCore: false,
          description: 'Strict safety filters to highlight black-box drug interactions and allergic risks.',
          detail: 'e.g. "Cross-check renal impairment dosage limits for all suggested medications."',
        },
      ],
    },
    {
      id: 'clinic',
      name: 'CLINIC',
      acronym: 'CLINIC',
      subtitle: 'Chief Complaint · Laboratory · Inspection · Notes · Intervention · Care',
      material: 'ivory-leather',
      collection: 'Healthcare',
      reasoning:
        'Mirrors out-patient clinic intake workflows: start with chief complaint, review lab metrics, inspect physical markers, summarize SOAP notes, design intervention, and specify care plan.',
      flow: ['Chief Complaint', 'Laboratory Review', 'Physical Inspection', 'SOAP Notes', 'Intervention', 'Care Plan'],
      cards: [
        {
          title: 'CHIEF COMPLAINT',
          icon: 'Activity',
          isCore: true,
          description: 'Primary symptom or reason for visit stated in patient\'s words with timeline.',
          detail: 'e.g. "Persistent subscapular pain for 5 days worsening upon deep inspiration."',
        },
        {
          title: 'LABORATORY REVIEW',
          icon: 'Microscope',
          isCore: true,
          description: 'Analyze bloodwork, metabolic panels, biomarker ranges, and abnormal values.',
          detail: 'e.g. "D-dimer: 420 ng/mL, Troponin I: <0.01 ng/mL, WBC: 8.4 k/uL."',
        },
        {
          title: 'INSPECTION & VITALS',
          icon: 'Stethoscope',
          isCore: true,
          description: 'Physical exam findings, auscultation, blood pressure, oxygen saturation.',
          detail: 'e.g. "BP: 135/85, HR: 88 bpm, SpO2: 98% on room air, lungs clear to auscultation bilaterally."',
        },
        {
          title: 'INTERVENTION STRATEGY',
          icon: 'Syringe',
          isCore: true,
          description: 'Pharmacological and non-pharmacological acute management steps.',
          detail: 'e.g. "Prescribe NSAID regimen for musculoskeletal strain; rest and local heat therapy."',
        },
        {
          title: 'CARE & FOLLOW-UP',
          icon: 'Calendar',
          isCore: true,
          description: 'Patient discharge instructions, warning signs, and return visit schedule.',
          detail: 'e.g. "Return immediately if shortness of breath occurs. Follow up in 7 days."',
        },
      ],
      recommendedAdditions: [],
    },
  ],

  'ai coding': [
    {
      id: 'code',
      name: 'CODE',
      acronym: 'CODE',
      subtitle: 'Context · Output Spec · Dependencies · Execution',
      material: 'obsidian-stone',
      collection: 'Software Engineering',
      reasoning:
        'Optimized for LLM code generation (Cursor, GitHub Copilot, Claude Code). Provides technical stack context, strict interface specification, dependency boundaries, and step-by-step execution logic to eliminate hallucinations.',
      flow: ['Tech Context', 'Output Spec', 'Dependencies', 'Execution Logic'],
      cards: [
        {
          title: 'CONTEXT & ARCHITECTURE',
          icon: 'Cpu',
          isCore: true,
          description: 'Define framework, language version, runtime environment, and project structure.',
          detail: 'e.g. "React 18 + Vite + TypeScript in strict mode, Node 20 runtime, Tailwind CSS v3."',
        },
        {
          title: 'OUTPUT SPECIFICATION',
          icon: 'FileCode',
          isCore: true,
          description: 'Specify function signatures, type definitions, props interfaces, and return shapes.',
          detail: 'e.g. "Export custom hook `useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void]`."',
        },
        {
          title: 'DEPENDENCIES & IMPORTS',
          icon: 'Boxes',
          isCore: true,
          description: 'Define allowed third-party libraries, utility functions, and import restrictions.',
          detail: 'e.g. "Only use native React hooks; do not import external state management libraries."',
        },
        {
          title: 'EXECUTION & TEST LOGIC',
          icon: 'CheckSquare',
          isCore: true,
          description: 'Write complete, self-contained implementation code with unit test cases.',
          detail: 'e.g. "Include error boundary handling for quota exceeded errors and bad JSON parsing."',
        },
      ],
      recommendedAdditions: [
        {
          title: 'PERFORMANCE GUARDRAILS',
          icon: 'Zap',
          isCore: false,
          description: 'Memory leak prevention, memoization guidelines, and O(1) time complexity rules.',
          detail: 'e.g. "Wrap heavy callbacks in `useCallback` and ensure zero unnecessary re-renders."',
        },
      ],
    },
    {
      id: 'build',
      name: 'BUILD',
      acronym: 'BUILD',
      subtitle: 'Blueprint · Architecture · Implementation · Logic · Debugging',
      material: 'carbon-fiber',
      collection: 'Software Engineering',
      reasoning:
        'Ideal for full-stack feature development: starts with high-level design blueprint, establishes system architecture, implements core files, verifies edge-case logic, and runs debug verification.',
      flow: ['Design Blueprint', 'Architecture Design', 'Implementation', 'Logic Verification', 'Debug & Tests'],
      cards: [
        {
          title: 'BLUEPRINT & SCOPE',
          icon: 'Layout',
          isCore: true,
          description: 'User story, feature requirements, UI state transitions, and API contract.',
          detail: 'e.g. "Build a drag-and-drop Kanban board with columns: To Do, In Progress, Done."',
        },
        {
          title: 'ARCHITECTURE & DATA MODEL',
          icon: 'Database',
          isCore: true,
          description: 'Schema definitions, state management strategy, and data flow hierarchy.',
          detail: 'e.g. "Task item type: `{ id: string, title: string, status: ColumnId, order: number }`."',
        },
        {
          title: 'IMPLEMENTATION CODE',
          icon: 'Code2',
          isCore: true,
          description: 'Production-ready code with clean separation of concerns and TypeScript types.',
          detail: 'e.g. "Implement `KanbanBoard`, `KanbanColumn`, and `KanbanCard` components with `@dnd-kit`."',
        },
        {
          title: 'LOGIC & EDGE CASES',
          icon: 'GitPullRequest',
          isCore: true,
          description: 'Handle empty states, re-ordering persistence, optimistic updates, and network retries.',
          detail: 'e.g. "Persist column reordering instantly using optimistic local state."',
        },
      ],
      recommendedAdditions: [],
    },
  ],

  'ux research': [
    {
      id: 'user',
      name: 'USER',
      acronym: 'USER',
      subtitle: 'User Persona · Objectives · Scenarios · Requirements',
      material: 'rosewood',
      collection: 'Design & UX',
      reasoning:
        'Standard UX research pipeline: ground AI in user persona research, set clear research objectives, construct realistic usage scenarios, and extract prioritized design requirements.',
      flow: ['User Persona', 'Research Objectives', 'Usage Scenarios', 'Design Requirements'],
      cards: [
        {
          title: 'USER PERSONA',
          icon: 'Users',
          isCore: true,
          description: 'Demographics, pain points, motivations, technical proficiency, and mental model.',
          detail: 'e.g. "Senior Financial Analyst, 42, values data density, relies on keyboard shortcuts."',
        },
        {
          title: 'OBJECTIVES',
          icon: 'Target',
          isCore: true,
          description: 'Core research questions, usability hypotheses, and success metrics.',
          detail: 'e.g. "Identify where users experience drop-off during the annual tax filing wizard."',
        },
        {
          title: 'SCENARIOS',
          icon: 'Compass',
          isCore: true,
          description: 'Realistic task scenarios, user journeys, edge cases, and environment constraints.',
          detail: 'e.g. "User receives an unexpected W-2 form and needs to amend a submitted tax return."',
        },
        {
          title: 'REQUIREMENTS',
          icon: 'ListChecks',
          isCore: true,
          description: 'Prioritized feature list, UX guidelines, accessibility standards (WCAG AAA).',
          detail: 'e.g. "1. Auto-save every 30 seconds. 2. Provide clear undo toast. 3. 4.5:1 contrast ratio."',
        },
      ],
      recommendedAdditions: [],
    },
  ],
};

/**
 * Generic AI generator function that generates tailored frameworks for ANY topic input!
 */
export function generateFrameworkForDomain(userPrompt) {
  const query = (userPrompt || '').toLowerCase().trim();

  // Check preset matches
  for (const [key, presetList] of Object.entries(DOMAIN_PRESETS)) {
    if (query.includes(key) || key.includes(query)) {
      return presetList;
    }
  }

  // Dynamic Generator for custom user prompt text!
  const cleanTitle = userPrompt.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const words = cleanTitle.split(/\s+/).filter(Boolean);
  const mainWord = words[0] || 'Framework';

  // Generate Acronym A (4-letter)
  const acrA = (mainWord.slice(0, 4) || 'PLAN').toUpperCase();
  const lettersA = acrA.split('');

  const optionA = {
    id: `custom-gen-a-${Date.now()}`,
    name: acrA,
    acronym: acrA,
    subtitle: `AI Generated Spec for ${userPrompt}`,
    material: 'quilted-green',
    collection: 'Custom AI Spec',
    reasoning: `Tailored architecture for "${userPrompt}". Formulated to guide AI reasoning from initial persona framing to execution and quality verification.`,
    flow: lettersA.map((l, i) => `Phase ${i + 1}: ${l} Core Module`),
    cards: [
      {
        title: `${lettersA[0]} — PERSONA & SCOPE`,
        icon: 'UserCog',
        isCore: true,
        description: `Define expert authority and domain parameters for ${userPrompt}.`,
        detail: `e.g. "Act as a leading specialist in ${userPrompt} with 15 years of industry experience."`,
      },
      {
        title: `${lettersA[1] || 'A'} — ACTION & STRATEGY`,
        icon: 'Zap',
        isCore: true,
        description: `Specify the core execution steps and methodology for ${userPrompt}.`,
        detail: `e.g. "Analyze the key requirements and draft a step-by-step strategy."`,
      },
      {
        title: `${lettersA[2] || 'C'} — CONSTRAINTS & QUALITY`,
        icon: 'ShieldCheck',
        isCore: true,
        description: `Establish quality benchmarks and boundary conditions.`,
        detail: `e.g. "Ensure all outputs meet professional standards and avoid generic fluff."`,
      },
      {
        title: `${lettersA[3] || 'E'} — EXECUTION DELIVERABLE`,
        icon: 'FileOutput',
        isCore: true,
        description: `Deliver final output formatted with precision.`,
        detail: `e.g. "Deliver a structured executive report with actionable next steps."`,
      },
    ],
    recommendedAdditions: [
      {
        title: 'FEW-SHOT EXAMPLES',
        icon: 'FileText',
        isCore: false,
        description: 'Reference gold-standard examples to align model tone.',
        detail: 'e.g. "Provide 2 sample templates demonstrating ideal formatting."',
      },
    ],
  };

  // Generate Acronym B (5-letter)
  const acrB = (mainWord.length >= 5 ? mainWord.slice(0, 5) : `${mainWord}S`).toUpperCase();
  const lettersB = acrB.split('');

  const optionB = {
    id: `custom-gen-b-${Date.now()}`,
    name: acrB,
    acronym: acrB,
    subtitle: `Extended Workflow Spec for ${userPrompt}`,
    material: 'dark-walnut',
    collection: 'Custom AI Spec',
    reasoning: `Multi-stage sequential pipeline designed for complex ${userPrompt} deliverables.`,
    flow: lettersB.map((l, i) => `Stage ${i + 1}: Module ${l}`),
    cards: lettersB.map((l, idx) => ({
      title: `${l} — MODULE ${idx + 1}`,
      icon: idx === 0 ? 'Target' : idx === 1 ? 'Search' : idx === 2 ? 'Settings' : idx === 3 ? 'CheckSquare' : 'Award',
      isCore: true,
      description: `Step ${idx + 1} of the ${userPrompt} execution pipeline.`,
      detail: `e.g. "Execute phase ${idx + 1} with high precision and empirical verification."`,
    })),
    recommendedAdditions: [],
  };

  return [optionA, optionB];
}
