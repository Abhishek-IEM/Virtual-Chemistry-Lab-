require('dotenv').config();
const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');

const experiments = [
  {
    id: 'titration',
    title: 'Acid-Base Titration',
    description: 'Determine the unknown concentration of HCl using NaOH. Watch color change at the equivalence point!',
    difficulty: 'Beginner',
    duration: '15 min',
    points: 50,
    icon: '🧪',
    steps: [
      'Add HCl solution to the flask using the pipette',
      'Add a few drops of phenolphthalein indicator',
      'Slowly add NaOH from the burette',
      'Observe the color change at the equivalence point',
    ],
  },
  {
    id: 'ph-testing',
    title: 'pH Testing with Indicators',
    description: 'Test various solutions with different pH indicators and observe the color spectrum.',
    difficulty: 'Beginner',
    duration: '10 min',
    points: 50,
    icon: '🌈',
    steps: [
      'Fill the test tube with the sample solution',
      'Add universal indicator',
      'Observe the color change',
      'Record the pH value from the color chart',
    ],
  },
  {
    id: 'precipitation',
    title: 'Precipitation Reaction',
    description: 'Mix AgNO₃ and NaCl to form a white silver chloride precipitate — a classic double displacement reaction.',
    difficulty: 'Beginner',
    duration: '12 min',
    points: 50,
    icon: '⚗️',
    steps: [
      'Add AgNO₃ solution to the flask',
      'Slowly add NaCl solution',
      'Observe the white precipitate forming',
      'Record observations and complete the experiment',
    ],
  },
  {
    id: 'neutralization',
    title: 'Neutralization Reaction',
    description: 'Combine acid and base to achieve perfect pH 7 neutrality. Observe the temperature change.',
    difficulty: 'Intermediate',
    duration: '15 min',
    points: 55,
    icon: '🔬',
    steps: [
      'Pour the acid solution into the beaker',
      'Measure the initial pH',
      'Add the base solution gradually',
      'Achieve neutral pH 7 — experiment complete',
    ],
  },
  {
    id: 'filtration',
    title: 'Filtration of Precipitate',
    description: 'Separate the precipitate from the solution using filter paper and a funnel.',
    difficulty: 'Intermediate',
    duration: '18 min',
    points: 55,
    icon: '🫙',
    steps: [
      'Prepare the funnel with filter paper',
      'Pour the precipitate mixture through the funnel',
      'Collect the filtrate in the beaker below',
      'Observe the separated precipitate on the filter',
    ],
  },
  {
    id: 'chemical-mixing',
    title: 'Chemical Mixing Reactions',
    description: 'Mix chemicals and observe dramatic color transitions and gas bubble formation.',
    difficulty: 'Intermediate',
    duration: '20 min',
    points: 60,
    icon: '💥',
    steps: [
      'Add Chemical A to the flask',
      'Add Chemical B and observe color change',
      'Heat the mixture gently',
      'Collect and identify the produced gas',
    ],
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Experiment.deleteMany({});
  await Experiment.insertMany(experiments);
  console.log('✅ Experiments seeded successfully!');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
