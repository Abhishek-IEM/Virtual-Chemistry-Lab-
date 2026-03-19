// =====================================================
// Experiment Definitions
// Each experiment defines steps and AI tutor responses
// =====================================================

export const experiments = {
  'acid-base-titration': {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration',
    icon: '🧪',
    points: 60,
    description: 'Determine the unknown concentration of HCl using NaOH.',
    equipment: ['pipette', 'hcl', 'indicator', 'burette', 'naoh', 'flask'],
    steps: [
      { id: 1, action: 'add-hcl', instruction: 'Pick the Pipette, then click HCl Solution to add it to the flask.', hint: 'Click the Pipette first, then click "HCl Solution"' },
      { id: 2, action: 'add-indicator', instruction: 'Add a few drops of Phenolphthalein Indicator to the flask.', hint: 'Click "Indicator" in the equipment panel' },
      { id: 3, action: 'add-naoh', instruction: 'Open the Burette and slowly add NaOH solution to the flask.', hint: 'Click "Burette" then "NaOH Solution"' },
      { id: 4, action: 'endpoint', instruction: 'Watch for the pink color change — this is the equivalence point!', hint: 'Click "Add Drop" button to reach endpoint' },
    ],
    aiTutor: {
      what: 'Acid-base titration is a quantitative technique to find the concentration of an unknown acid or base. We add a known base (NaOH) to neutralize an unknown acid (HCl) in the presence of an indicator.',
      next: 'First, add the HCl solution using the pipette, then add indicator. Slowly add NaOH from the burette until the color changes.',
      explain: 'At the equivalence point, moles of HCl = moles of NaOH. NaOH + HCl → NaCl + H₂O. The phenolphthalein indicator turns pink when the solution becomes slightly basic (pH > 8.2).',
    },
  },

  'ph-testing-indicators': {
    id: 'ph-testing-indicators',
    title: 'pH Testing with Indicators',
    icon: '🌈',
    points: 50,
    description: 'Test solutions with different pH indicators.',
    equipment: ['test-tube', 'sample', 'indicator', 'color-chart'],
    steps: [
      { id: 1, action: 'fill-tube', instruction: 'Fill the test tube with the sample solution.', hint: 'Click "Sample Solution" to fill the test tube.' },
      { id: 2, action: 'add-indicator', instruction: 'Add universal indicator to the sample.', hint: 'Click "Indicator" in the equipment panel.' },
      { id: 3, action: 'observe', instruction: 'Observe the color change in the solution.', hint: 'Click "Observe" to record the color change.' },
      { id: 4, action: 'record', instruction: 'Match the color to the pH chart and record the pH value.', hint: 'Click "Record pH" to complete.' },
    ],
    aiTutor: {
      what: 'pH testing uses indicators that change color at specific pH values. Universal indicators contain a mix of indicators that show a color spectrum from pH 1 (red) to pH 14 (violet).',
      next: 'Fill the test tube with your sample solution, then add the universal indicator. The color change will reveal the pH.',
      explain: 'pH is the negative log of hydrogen ion concentration. Acidic solutions (pH < 7) turn red-orange, neutral (pH 7) turns green, and basic solutions (pH > 7) turn blue-violet.',
    },
  },

  'precipitation-reaction': {
    id: 'precipitation-reaction',
    title: 'Precipitation Reaction',
    icon: '⚗️',
    points: 55,
    description: 'Form a white AgCl precipitate by mixing AgNO₃ and NaCl.',
    equipment: ['flask', 'agno3', 'nacl', 'stirrer'],
    steps: [
      { id: 1, action: 'add-agno3', instruction: 'Add AgNO₃ (silver nitrate) solution to the flask.', hint: 'Click "AgNO₃ Solution" to pour it in.' },
      { id: 2, action: 'add-nacl', instruction: 'Slowly pour NaCl solution into the flask.', hint: 'Click "NaCl Solution" to add it.' },
      { id: 3, action: 'observe-precipitate', instruction: 'Watch the white AgCl precipitate form!', hint: 'Click "Observe" to see precipitate formation.' },
      { id: 4, action: 'record', instruction: 'Record your observations and complete the experiment.', hint: 'Click "Complete Experiment" to finish.' },
    ],
    aiTutor: {
      what: 'A precipitation reaction occurs when two soluble ions combine to form an insoluble product (precipitate). AgNO₃ + NaCl → AgCl↓ (white) + NaNO₃.',
      next: 'First add AgNO₃ to the flask, then slowly add NaCl. Watch the white precipitate form immediately!',
      explain: 'AgCl is virtually insoluble in water (Ksp = 1.8 × 10⁻¹⁰). When Ag⁺ and Cl⁻ ions meet, they immediately form a white solid (precipitate) that sinks to the bottom of the flask.',
    },
  },

  'neutralization-reaction': {
    id: 'neutralization-reaction',
    title: 'Neutralization Reaction',
    icon: '🔬',
    points: 50,
    description: 'Combine acid and base to achieve pH 7 neutrality.',
    equipment: ['beaker', 'acid', 'base', 'ph-meter'],
    steps: [
      { id: 1, action: 'add-acid', instruction: 'Pour the acid solution into the beaker.', hint: 'Click "Acid Solution" to pour it in.' },
      { id: 2, action: 'measure-ph', instruction: 'Measure the initial pH of the acid solution.', hint: 'Click "pH Meter" to measure the initial pH.' },
      { id: 3, action: 'add-base', instruction: 'Gradually add the base solution to the acid.', hint: 'Click "Add Base" to neutralize the acid.' },
      { id: 4, action: 'achieve-neutral', instruction: 'Achieve pH 7! The neutralization is complete.', hint: 'Keep adding base until pH reaches 7.' },
    ],
    aiTutor: {
      what: 'Neutralization is a reaction between an acid and a base that produces a salt and water. Strong acids + Strong bases → neutral salt solution at pH 7.',
      next: 'Add the acid to the beaker, measure pH, then gradually add base until pH = 7. The reaction releases heat (exothermic).',
      explain: 'H⁺(aq) + OH⁻(aq) → H₂O(l). The proton from the acid combines with the hydroxide from the base to form water. When moles of H⁺ = moles of OH⁻, pH = 7.',
    },
  },

  'filtration-precipitate': {
    id: 'filtration-precipitate',
    title: 'Filtration of Precipitate',
    icon: '🫙',
    points: 55,
    description: 'Separate precipitate from solution using filter paper and funnel.',
    equipment: ['funnel', 'filter-paper', 'beaker', 'mixture'],
    steps: [
      { id: 1, action: 'setup-funnel', instruction: 'Set up the funnel with filter paper inside it.', hint: 'Click "Funnel" then "Filter Paper" to set up.' },
      { id: 2, action: 'pour-mixture', instruction: 'Pour the precipitate mixture through the funnel.', hint: 'Click "Pour Mixture" to start filtration.' },
      { id: 3, action: 'collect-filtrate', instruction: 'Collect the clear filtrate in the beaker below.', hint: 'Click "Collect" to gather the filtrate.' },
      { id: 4, action: 'observe-result', instruction: 'See the separated precipitate on the filter paper!', hint: 'Click "Examine" to complete the experiment.' },
    ],
    aiTutor: {
      what: 'Filtration is a physical separation technique that separates a solid (precipitate) from a liquid by passing the mixture through filter paper. The solid stays on the paper; the liquid (filtrate) passes through.',
      next: 'First set up the funnel with filter paper, then slowly pour your precipitate mixture through it. The clear liquid will drip into the beaker below.',
      explain: 'Filter paper has tiny pores that allow liquid molecules to pass but retain solid particles. The material that passes through is called "filtrate" and the solid left behind is called the "residue".',
    },
  },

  'chemical-mixing-reactions': {
    id: 'chemical-mixing-reactions',
    title: 'Chemical Mixing Reactions',
    icon: '💥',
    points: 50,
    description: 'Mix chemicals to observe dramatic color changes and gas bubbles.',
    equipment: ['flask', 'chemical-a', 'chemical-b', 'heater'],
    steps: [
      { id: 1, action: 'add-chemical-a', instruction: 'Add Chemical A (copper sulfate) to the flask.', hint: 'Click "Chemical A" to pour the blue solution.' },
      { id: 2, action: 'add-chemical-b', instruction: 'Add Chemical B (zinc powder) and observe the color change.', hint: 'Click "Chemical B" — watch the color change!' },
      { id: 3, action: 'heat', instruction: 'Gently heat the mixture and observe bubbles forming.', hint: 'Click "Heater" to apply gentle heat.' },
      { id: 4, action: 'collect-gas', instruction: 'Collect and identify the hydrogen gas produced.', hint: 'Click "Gas Collector" to complete.' },
    ],
    aiTutor: {
      what: 'When zinc (Zn) reacts with copper sulfate (CuSO₄) solution, zinc displaces copper in a single displacement reaction: Zn + CuSO₄ → ZnSO₄ + Cu. The blue color fades as copper deposits form.',
      next: 'Add blue copper sulfate first, then add zinc powder. The solution will lose its blue color and copper metal will deposit. Heat accelerates the reaction.',
      explain: 'Zinc is more reactive than copper (higher in the electrochemical series). Zn loses electrons (oxidized) while Cu²⁺ gains them (reduced). Zn → Zn²⁺ + 2e⁻ and Cu²⁺ + 2e⁻ → Cu.',
    },
  },
}

export const getExperiment = (id) => experiments[id] || null
