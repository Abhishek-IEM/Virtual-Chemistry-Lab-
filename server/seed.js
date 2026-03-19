const mongoose = require('mongoose');
const Experiment = require('./models/Experiment');
require('dotenv').config();

const experiments = [
  {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration (HCl vs NaOH)',
    description: 'Perform a volumetric titration by neutralizing hydrochloric acid with sodium hydroxide using phenolphthalein as indicator.',
    difficulty: 'Intermediate',
    duration: '20 min',
    points: 60,
    icon: '⚗️',
    steps: [
      { stepNumber: 1, title: 'Pipette HCl into Flask', instruction: 'Use pipette to add 10 mL HCl into the conical flask' },
      { stepNumber: 2, title: 'Add Phenolphthalein', instruction: 'Add 3 drops of phenolphthalein indicator to the flask' },
      { stepNumber: 3, title: 'Titrate with NaOH', instruction: 'Slowly add NaOH from burette while swirling the flask' },
      { stepNumber: 4, title: 'Observe Endpoint', instruction: 'Stop when solution turns permanent pale pink' }
    ]
  },
  {
    id: 'ph-testing-indicators',
    title: 'pH Testing with Indicators',
    description: 'Test solution acidity/basicity using phenolphthalein and methyl orange indicators.',
    difficulty: 'Beginner',
    duration: '15 min',
    points: 50,
    icon: '🧪',
    steps: [
      { stepNumber: 1, title: 'Pour Solutions', instruction: 'Pour unknown solutions into 3 separate test tubes' },
      { stepNumber: 2, title: 'Add Phenolphthalein', instruction: 'Add phenolphthalein to each test tube and observe color' },
      { stepNumber: 3, title: 'Add Methyl Orange', instruction: 'Add methyl orange to each test tube and observe color' },
      { stepNumber: 4, title: 'Classify Solutions', instruction: 'Identify each solution as acid, base, or neutral' }
    ]
  },
  {
    id: 'precipitation-reaction',
    title: 'Precipitation Reaction (AgNO3 + NaCl)',
    description: 'Mix silver nitrate and sodium chloride to observe formation of insoluble silver chloride precipitate.',
    difficulty: 'Intermediate',
    duration: '15 min',
    points: 55,
    icon: '🔬',
    steps: [
      { stepNumber: 1, title: 'Pour AgNO3', instruction: 'Pour silver nitrate solution into the beaker' },
      { stepNumber: 2, title: 'Add NaCl', instruction: 'Slowly pour sodium chloride solution into the beaker' },
      { stepNumber: 3, title: 'Stir Mixture', instruction: 'Stir the mixture and observe white precipitate forming' },
      { stepNumber: 4, title: 'Observe Precipitate', instruction: 'Watch precipitate settle at bottom of beaker' }
    ]
  },
  {
    id: 'neutralization-reaction',
    title: 'Neutralization Reaction',
    description: 'Neutralize acid and base and verify near-neutral pH outcome.',
    difficulty: 'Beginner',
    duration: '12 min',
    points: 50,
    icon: '⚖️',
    steps: [
      { stepNumber: 1, title: 'Add HCl to Beaker', instruction: 'Measure and pour HCl into the beaker' },
      { stepNumber: 2, title: 'Add NaOH Slowly', instruction: 'Add NaOH drop by drop while monitoring pH meter' },
      { stepNumber: 3, title: 'Reach Neutral pH', instruction: 'Continue until pH meter reads ~7.0' },
      { stepNumber: 4, title: 'Confirm Outcome', instruction: 'Record temperature rise and final pH reading' }
    ]
  },
  {
    id: 'filtration-precipitate',
    title: 'Filtration of Precipitate',
    description: 'Separate insoluble precipitate from liquid phase using funnel and filter paper.',
    difficulty: 'Intermediate',
    duration: '18 min',
    points: 55,
    icon: '🔭',
    steps: [
      { stepNumber: 1, title: 'Prepare Filter Paper', instruction: 'Fold filter paper and place it inside the funnel' },
      { stepNumber: 2, title: 'Pour Mixture', instruction: 'Carefully pour the precipitate mixture into the funnel' },
      { stepNumber: 3, title: 'Collect Filtrate', instruction: 'Collect the clear liquid (filtrate) in the beaker below' },
      { stepNumber: 4, title: 'Examine Residue', instruction: 'Observe the solid residue remaining on filter paper' }
    ]
  },
  {
    id: 'chemical-mixing-reactions',
    title: 'Chemical Mixing Reactions',
    description: 'Perform mixing reactions showing color transitions and gas evolution bubbles.',
    difficulty: 'Beginner',
    duration: '14 min',
    points: 50,
    icon: '🧬',
    steps: [
      { stepNumber: 1, title: 'Mix in Test Tube 1', instruction: 'Add vinegar to baking soda — observe CO2 bubbles' },
      { stepNumber: 2, title: 'Mix in Test Tube 2', instruction: 'Combine chemicals and observe color change reaction' },
      { stepNumber: 3, title: 'Mix in Test Tube 3', instruction: 'Add H2O2 to yeast — observe foam/gas evolution' },
      { stepNumber: 4, title: 'Record Results', instruction: 'Note all color changes and gas produced in each tube' }
    ]
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Experiment.deleteMany({});
    await Experiment.insertMany(experiments);
    console.log('✅ 6 experiments seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();
