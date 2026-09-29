/* ---------------- Constants ---------------- */

const STORE_KEY = 'fittrainer_v1';

const ACTIVITY_MULT = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
const GOAL_LABELS = { fat_loss: 'Fat loss', muscle_gain: 'Muscle gain', general: 'General fitness' };
const DIET_LABELS = { vegetarian: 'Vegetarian', eggetarian: 'Eggetarian', non_veg: 'Non-vegetarian', vegan: 'Vegan' };

const WEEKDAYS_BY_INDEX = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const WEEKDAYS_ORDERED = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const WEEKDAY_LABELS = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
  friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};
const WEEKDAY_SHORT = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };
const WEEKDAY_MUSCLE = {
  monday: 'chest', tuesday: 'back', wednesday: 'shoulders', thursday: 'arms',
  friday: 'cardio', saturday: 'legs', sunday: 'rest',
};
const MUSCLE_LABELS = { chest: 'Chest', back: 'Back', shoulders: 'Shoulders', arms: 'Biceps & Triceps', cardio: 'Cardio', legs: 'Leg Day', rest: 'Rest Day' };

/* Each strength exercise: { name, sets, reps, pattern, cue }. pattern drives the animated icon. */
const STRENGTH_TEMPLATES = {
  chest: {
    beginner: [
      { name: 'Flat Dumbbell Bench Press', sets: 3, reps: '10-12', pattern: 'bench', cue: 'Lower under control, press up without locking elbows hard.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', pattern: 'bench', cue: 'Slight bench incline, press up and slightly inward.' },
      { name: 'Push-up', sets: 3, reps: 'to near-failure', pattern: 'pushup', cue: 'Straight body line, chest brushes the floor.' },
      { name: 'Machine Chest Press', sets: 3, reps: '10-12', pattern: 'bench', cue: 'Adjust the seat so the handles line up with mid-chest.' },
    ],
    intermediate: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', pattern: 'bench', cue: 'Bar to mid-chest, drive feet into the floor.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', pattern: 'bench', cue: 'Control the negative, full stretch at the bottom.' },
      { name: 'Cable Fly', sets: 3, reps: '12-15', pattern: 'bench', cue: 'Slight elbow bend, squeeze hands together in front.' },
      { name: 'Bench Dips / Dips', sets: 3, reps: '10-12', pattern: 'dip', cue: 'Elbows track back, don’t flare wide.' },
    ],
    advanced: [
      { name: 'Barbell Bench Press', sets: 5, reps: '5', pattern: 'bench', cue: 'Heavy top set, tight upper back on the bench.' },
      { name: 'Incline Barbell/DB Press', sets: 4, reps: '8', pattern: 'bench', cue: 'Same bar path every rep, no bounce.' },
      { name: 'Weighted Dips', sets: 4, reps: '8', pattern: 'dip', cue: 'Add load once bodyweight dips feel easy.' },
      { name: 'Cable Fly', sets: 4, reps: '12-15', pattern: 'bench', cue: 'Finish with a squeeze, control the stretch back.' },
      { name: 'Push-up Finisher', sets: 3, reps: 'to near-failure', pattern: 'pushup', cue: 'Burnout set after the heavy work is done.' },
    ],
  },
  back: {
    beginner: [
      { name: 'Lat Pulldown', sets: 3, reps: '10-12', pattern: 'vpull', cue: 'Pull to upper chest, squeeze shoulder blades together.' },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12', pattern: 'pull', cue: 'Drive elbows back, keep chest up.' },
      { name: 'Assisted Pull-up / Band Pulldown', sets: 3, reps: '8-10', pattern: 'vpull', cue: 'Full stretch at the top, chin over the bar at the bottom.' },
      { name: 'Chest-Supported Row', sets: 3, reps: '10-12', pattern: 'pull', cue: 'Chest stays on the pad the whole set, squeeze at the top.' },
    ],
    intermediate: [
      { name: 'Barbell Row', sets: 4, reps: '8-10', pattern: 'pull', cue: 'Flat back, pull to the belly button.' },
      { name: 'Lat Pulldown', sets: 3, reps: '10-12', pattern: 'vpull', cue: 'Lead with the elbows, not the hands.' },
      { name: 'Single-arm Dumbbell Row', sets: 3, reps: '10-12 / side', pattern: 'pull', cue: 'Support on a bench, row straight up to the hip.' },
      { name: 'Face Pull', sets: 3, reps: '15', pattern: 'raise', cue: 'Pull to the face, thumbs point back at the top.' },
    ],
    advanced: [
      { name: 'Deadlift', sets: 5, reps: '5', pattern: 'hinge', cue: 'Hips and shoulders rise together, bar stays close to the shins.' },
      { name: 'Weighted Pull-up', sets: 4, reps: '6-8', pattern: 'vpull', cue: 'Dead hang start, chin clears the bar.' },
      { name: 'Pendlay Row', sets: 4, reps: '8', pattern: 'pull', cue: 'Bar rests on the floor between every rep.' },
      { name: 'Single-arm Dumbbell Row', sets: 3, reps: '10 / side', pattern: 'pull', cue: 'Add weight once form is locked in.' },
      { name: 'Face Pull', sets: 3, reps: '15', pattern: 'raise', cue: 'Light weight, high reps, pure rear-delt work.' },
    ],
  },
  shoulders: {
    beginner: [
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', pattern: 'vpress', cue: 'Press straight up, don’t flare elbows too wide.' },
      { name: 'Lateral Raise', sets: 3, reps: '12-15', pattern: 'raise', cue: 'Lead with the elbows, raise to shoulder height only.' },
      { name: 'Front Raise', sets: 3, reps: '12-15', pattern: 'raise', cue: 'Slight bend in the elbow, raise to eye level.' },
      { name: 'Machine Shoulder Press', sets: 3, reps: '10-12', pattern: 'vpress', cue: 'Controlled path up and down, don’t lock out hard at the top.' },
    ],
    intermediate: [
      { name: 'Barbell/Dumbbell Overhead Press', sets: 4, reps: '8-10', pattern: 'vpress', cue: 'Brace the core, press directly overhead.' },
      { name: 'Lateral Raise', sets: 3, reps: '12-15', pattern: 'raise', cue: 'Light weight, strict form, no swinging.' },
      { name: 'Rear Delt Fly', sets: 3, reps: '15', pattern: 'raise', cue: 'Hinge forward, squeeze the shoulder blades.' },
      { name: 'Front Raise', sets: 3, reps: '12', pattern: 'raise', cue: 'Alternate arms if it’s easier to control.' },
    ],
    advanced: [
      { name: 'Overhead Press', sets: 5, reps: '5', pattern: 'vpress', cue: 'Heavy top set, full lockout overhead.' },
      { name: 'Arnold Press', sets: 4, reps: '8', pattern: 'vpress', cue: 'Rotate palms in on the way down.' },
      { name: 'Lateral Raise Dropset', sets: 4, reps: '15', pattern: 'raise', cue: 'Drop the weight once form breaks, keep going.' },
      { name: 'Rear Delt Fly', sets: 4, reps: '15', pattern: 'raise', cue: 'Never skip rear delts — they balance the pressing volume.' },
      { name: 'Barbell Shrugs', sets: 3, reps: '12', pattern: 'raise', cue: 'Straight up and down, no rolling the shoulders.' },
    ],
  },
  arms: {
    beginner: [
      { name: 'Dumbbell Bicep Curl', sets: 3, reps: '10-12', pattern: 'curl', cue: 'Elbows pinned to your sides the whole rep.' },
      { name: 'Triceps Pushdown', sets: 3, reps: '10-12', pattern: 'extension', cue: 'Elbows stay tucked, only the forearm moves.' },
      { name: 'Hammer Curl', sets: 3, reps: '10-12', pattern: 'curl', cue: 'Neutral grip, palms facing each other.' },
      { name: 'Overhead Dumbbell Triceps Extension', sets: 3, reps: '10-12', pattern: 'extension', cue: 'Keep elbows pointed forward, don’t let them flare out.' },
    ],
    intermediate: [
      { name: 'Barbell Curl', sets: 4, reps: '8-10', pattern: 'curl', cue: 'No swinging — let the biceps do the work.' },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', pattern: 'extension', cue: 'Lower to the forehead, elbows stay fixed.' },
      { name: 'Hammer Curl', sets: 3, reps: '10-12', pattern: 'curl', cue: 'Great for forearm size alongside biceps.' },
      { name: 'Triceps Pushdown', sets: 3, reps: '12-15', pattern: 'extension', cue: 'Full lockout at the bottom of every rep.' },
    ],
    advanced: [
      { name: 'Barbell Curl', sets: 4, reps: '8', pattern: 'curl', cue: 'Heaviest curl variation — prioritize control.' },
      { name: 'Close-Grip Bench Press', sets: 4, reps: '8', pattern: 'bench', cue: 'Compound triceps builder, hands just inside shoulder width.' },
      { name: 'Skull Crushers', sets: 4, reps: '10', pattern: 'extension', cue: 'Add load slowly — this one is hard on the elbows.' },
      { name: 'Incline Dumbbell Curl', sets: 3, reps: '10', pattern: 'curl', cue: 'Incline bench stretches the biceps harder.' },
      { name: 'Triceps Pushdown Dropset', sets: 4, reps: '15', pattern: 'extension', cue: 'Finish the arm day completely spent.' },
    ],
  },
  legs: {
    beginner: [
      { name: 'Leg Press', sets: 3, reps: '12-15', pattern: 'squat', cue: 'Feet shoulder-width, don’t lock knees at the top.' },
      { name: 'Goblet Squat', sets: 3, reps: '10-12', pattern: 'squat', cue: 'Hold the dumbbell at your chest, sit between your heels.' },
      { name: 'Leg Curl (machine)', sets: 3, reps: '12-15', pattern: 'squat', cue: 'Slow and controlled, feel the hamstring squeeze.' },
      { name: 'Calf Raise', sets: 3, reps: '15-20', pattern: 'squat', cue: 'Full stretch at the bottom, pause at the top.' },
    ],
    intermediate: [
      { name: 'Barbell Squat', sets: 4, reps: '8-10', pattern: 'squat', cue: 'Chest up, break at the hips and knees together.' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10', pattern: 'hinge', cue: 'Push hips back, feel the hamstring stretch.' },
      { name: 'Leg Press', sets: 3, reps: '10-12', pattern: 'squat', cue: 'Add load once bodyweight squats feel too easy.' },
      { name: 'Walking Lunge', sets: 3, reps: '10 / leg', pattern: 'squat', cue: 'Long stride, back knee taps just above the floor.' },
      { name: 'Calf Raise', sets: 3, reps: '15', pattern: 'squat', cue: 'Slow tempo builds more than bouncing reps.' },
    ],
    advanced: [
      { name: 'Barbell Squat', sets: 5, reps: '5', pattern: 'squat', cue: 'Heavy top set, brace hard before unracking.' },
      { name: 'Romanian Deadlift', sets: 4, reps: '6', pattern: 'hinge', cue: 'Heavier pull, keep the bar close to the legs.' },
      { name: 'Bulgarian Split Squat', sets: 4, reps: '8 / leg', pattern: 'squat', cue: 'Brutal but effective — balance before adding load.' },
      { name: 'Leg Press', sets: 4, reps: '10', pattern: 'squat', cue: 'Push the volume once the barbell work is done.' },
      { name: 'Calf Raise Dropset', sets: 4, reps: '20', pattern: 'squat', cue: 'End leg day with calves completely fried.' },
    ],
  },
};

const CARDIO_TEMPLATES = {
  beginner: [
    { activity: 'Brisk walk or treadmill', duration: '15 min, moderate pace', cue: 'You should be able to talk but slightly breathless.' },
    { activity: 'Skipping rope', duration: '3 rounds x 1 min', cue: 'Rest ~1 min between rounds if needed.' },
    { activity: 'Stationary cycling', duration: '10 min, easy pace', cue: 'Cool-down pace, keep the legs moving.' },
  ],
  intermediate: [
    { activity: 'Jogging or treadmill', duration: '20 min, moderate pace', cue: 'Steady effort, hold a consistent pace.' },
    { activity: 'Skipping rope', duration: '5 rounds x 1 min', cue: '30 sec rest between rounds.' },
    { activity: 'Stair climber', duration: '10 min', cue: 'Keep torso upright, don’t lean on the rails.' },
    { activity: 'Bodyweight circuit (jumping jacks, mountain climbers)', duration: '3 rounds', cue: '45 sec work, 15 sec rest per move.' },
  ],
  advanced: [
    { activity: 'Interval running (HIIT)', duration: '20 min: 1 min sprint / 1 min walk x10', cue: 'Sprint should feel genuinely hard.' },
    { activity: 'Skipping rope', duration: '8 rounds x 1 min', cue: 'Minimal rest — keep the heart rate up.' },
    { activity: 'Battle rope or rowing machine', duration: '10 min', cue: 'Full-body effort, drive with the legs on the rower.' },
    { activity: 'Bodyweight circuit', duration: '4 rounds', cue: 'Jumping jacks, mountain climbers, burpees, high knees.' },
  ],
};

/* Every training day gets the same two bookends: a general warm-up (light
   cardio + a muscle-specific mobility move) before the lifts, and a short
   cardio finisher after — separate from Friday's dedicated cardio day, which
   stays the main cardio session of the week. */
const WARMUP_ROUTINES = {
  chest: ['5 min light cardio (treadmill or cycle)', 'Arm circles x15 each direction', 'Band pull-aparts x15', '1-2 light warm-up sets of the first exercise'],
  back: ['5 min light cardio', 'Cat-cow stretch x10', 'Band pull-aparts x15', '1-2 light warm-up sets of the first exercise'],
  shoulders: ['5 min light cardio', 'Arm circles x15 each direction', 'Shoulder rolls x15', '1-2 light warm-up sets of the first exercise'],
  arms: ['5 min light cardio', 'Arm circles x15', 'Wrist rotations x10 each direction', '1-2 light warm-up sets of the first exercise'],
  legs: ['5 min light cardio', 'Bodyweight squats x15', 'Leg swings x10 each leg', '1-2 light warm-up sets of the first exercise'],
};

const FINISHER_CARDIO = {
  chest: '5-10 min incline walk or easy cycling',
  back: '5-10 min rowing machine or incline walk, easy pace',
  shoulders: '5 min incline walk, easy pace',
  arms: '5 min skipping rope or incline walk, easy pace',
  legs: '5 min easy cycling (skip anything high-impact after heavy leg work)',
};

const FOOD_DB = [
  { name: 'Roti / chapati', unit: '1', cal: 85, protein: 3, carbs: 15, fat: 1.5 },
  { name: 'Rice, cooked (chawal)', unit: '1 cup', cal: 205, protein: 4.3, carbs: 45, fat: 0.4 },
  { name: 'Dal, cooked', unit: '1 cup', cal: 198, protein: 12, carbs: 30, fat: 4 },
  { name: 'Egg, boiled', unit: '1', cal: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
  { name: 'Egg bhurji / curry (2 eggs)', unit: '1 serving', cal: 180, protein: 13, carbs: 4, fat: 12 },
  { name: 'Curd / yogurt', unit: '100g', cal: 60, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: 'Milk', unit: '250ml', cal: 120, protein: 6.5, carbs: 9.5, fat: 5 },
  { name: 'Mixed veg sabzi', unit: '1 cup', cal: 120, protein: 3, carbs: 15, fat: 6 },
  { name: 'Paneer', unit: '100g', cal: 265, protein: 18, carbs: 1.2, fat: 20 },
  { name: 'Banana', unit: '1', cal: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Roasted chana (chickpeas)', unit: '30g', cal: 120, protein: 6, carbs: 18, fat: 2 },
  { name: 'Green tea', unit: '1 cup', cal: 2, protein: 0, carbs: 0.5, fat: 0 },
  { name: 'Buttermilk / chaas', unit: '1 glass (250ml)', cal: 40, protein: 2, carbs: 4, fat: 1.5 },
  { name: 'Peanuts', unit: '30g', cal: 170, protein: 7, carbs: 6, fat: 14 },
];

const EATING_OUT_PRESETS = [
  { name: 'Restaurant thali (veg)', unit: '1', cal: 750, protein: 20, carbs: 100, fat: 28 },
  { name: 'Dhaba-style meal (dal + roti + sabzi)', unit: '1', cal: 650, protein: 18, carbs: 90, fat: 20 },
  { name: 'Restaurant paneer curry + rice/naan', unit: '1', cal: 850, protein: 25, carbs: 95, fat: 38 },
  { name: 'Biryani (veg or egg)', unit: '1 plate', cal: 600, protein: 15, carbs: 85, fat: 20 },
  { name: 'Restaurant egg curry + rice/roti', unit: '1', cal: 700, protein: 28, carbs: 80, fat: 28 },
  { name: 'Airport/travel sandwich + coffee', unit: '1', cal: 450, protein: 12, carbs: 55, fat: 18 },
  { name: 'Restaurant omelette + toast', unit: '1', cal: 400, protein: 20, carbs: 30, fat: 20 },
];

const MEAL_SLOT_FRACTIONS = { Breakfast: 0.25, Lunch: 0.35, Snack: 0.1, Dinner: 0.3 };

const MEAL_TEMPLATES = {
  vegetarian: [
    ['Breakfast', 'Paneer bhurji with 2 roti, or milk with a fruit'],
    ['Lunch', 'Dal, chawal (rice), 2 roti, sabzi, curd'],
    ['Snack', 'Curd or a banana'],
    ['Dinner', 'Dal, 2 roti or chawal, sabzi, curd'],
  ],
  eggetarian: [
    ['Breakfast', '2-3 boiled eggs or egg bhurji with 2 roti'],
    ['Lunch', 'Dal, chawal (rice), 2 roti, sabzi, curd'],
    ['Snack', 'Boiled egg or a banana'],
    ['Dinner', 'Egg curry or dal, 2 roti or chawal, sabzi'],
  ],
  non_veg: [
    ['Breakfast', '3 boiled eggs with 2 roti'],
    ['Lunch', 'Chawal (rice) or roti, dal, chicken/fish curry, salad'],
    ['Snack', 'Boiled egg or a banana'],
    ['Dinner', 'Chicken/fish curry or dal, roti or chawal, sabzi'],
  ],
  vegan: [
    ['Breakfast', 'Besan chilla with 2 roti, or a banana'],
    ['Lunch', 'Dal, chawal (rice), 2 roti, sabzi'],
    ['Snack', 'Roasted chana or a banana'],
    ['Dinner', 'Dal or soya curry, 2 roti or chawal, sabzi'],
  ],
};

/* ---------------- Exercise icons (original animated stick figures) ----------------
   Animated with native SVG <animateTransform> (SMIL): each rotation/translate names
   an explicit pivot point in the icon's own coordinate space, so it renders the same
   on every mobile browser instead of depending on CSS transform-box support. */

function rotateAnim(from, to, cx, cy, dur) {
  return `<animateTransform attributeName="transform" type="rotate" values="${from} ${cx} ${cy};${to} ${cx} ${cy};${from} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`;
}

function translateAnim(dx, dy, dur) {
  return `<animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};0 0" dur="${dur}s" repeatCount="indefinite"/>`;
}

function exIconSVG(pattern) {
  const HEAD = '<circle class="ex-head" cx="50" cy="17" r="7"/>';
  const TORSO = '<line class="ex-body" x1="50" y1="24" x2="50" y2="60"/>';
  const LEGS = '<line class="ex-body" x1="50" y1="60" x2="41" y2="92"/><line class="ex-body" x1="50" y1="60" x2="59" y2="92"/>';
  const ARMS = '<line class="ex-body" x1="50" y1="28" x2="37" y2="50"/><line class="ex-body" x1="50" y1="28" x2="63" y2="50"/>';

  switch (pattern) {
    case 'bench':
      /* Lying on a bench, one arm pressing a dumbbell straight up from the chest. */
      return `<svg class="ex-icon" viewBox="0 0 100 100">
        <line class="ex-body" x1="8" y1="70" x2="88" y2="70"/>
        <circle class="ex-head" cx="18" cy="52" r="7"/>
        <line class="ex-body" x1="25" y1="54" x2="66" y2="57"/>
        <line class="ex-body" x1="66" y1="57" x2="76" y2="46"/>
        <line class="ex-body" x1="76" y1="46" x2="84" y2="68"/>
        <line class="ex-body" x1="42" y1="55" x2="38" y2="40"/>
        <g><line class="ex-body" x1="38" y1="40" x2="32" y2="20"/>${rotateAnim(0, 60, 38, 40, 1.2)}</g>
      </svg>`;
    case 'pushup':
      /* Horizontal plank, whole body bobbing up and down like a push-up rep. */
      return `<svg class="ex-icon" viewBox="0 0 100 100"><g>
          <circle class="ex-head" cx="18" cy="55" r="7"/>
          <line class="ex-body" x1="25" y1="55" x2="76" y2="58"/>
          <line class="ex-body" x1="24" y1="62" x2="22" y2="80"/>
          <line class="ex-body" x1="76" y1="58" x2="90" y2="76"/>
          ${translateAnim(0, 7, 1.1)}
        </g></svg>`;
    case 'dip':
      /* Parallel bars with the body dipping down between them. */
      return `<svg class="ex-icon" viewBox="0 0 100 100">
        <line class="ex-body" x1="26" y1="22" x2="26" y2="78"/>
        <line class="ex-body" x1="74" y1="22" x2="74" y2="78"/>
        <g>
          <circle class="ex-head" cx="50" cy="32" r="7"/>
          <line class="ex-body" x1="50" y1="39" x2="50" y2="60"/>
          <line class="ex-body" x1="50" y1="44" x2="30" y2="50"/>
          <line class="ex-body" x1="50" y1="44" x2="70" y2="50"/>
          <line class="ex-body" x1="50" y1="60" x2="44" y2="80"/>
          <line class="ex-body" x1="50" y1="60" x2="56" y2="80"/>
          ${translateAnim(0, 10, 1.3)}
        </g>
      </svg>`;
    case 'pull':
      /* Bent-over row: torso hinged forward, arm driving an elbow back. */
      return `<svg class="ex-icon" viewBox="0 0 100 100">
        <line class="ex-body" x1="50" y1="60" x2="41" y2="92"/>
        <line class="ex-body" x1="50" y1="60" x2="59" y2="92"/>
        <circle class="ex-head" cx="24" cy="24" r="7"/>
        <line class="ex-body" x1="30" y1="29" x2="50" y2="60"/>
        <g><line class="ex-body" x1="34" y1="34" x2="55" y2="45"/>${rotateAnim(0, -55, 34, 34, 1.2)}</g>
      </svg>`;
    case 'vpress':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}<g>${ARMS}${rotateAnim(0, -155, 50, 28, 1.4)}</g></svg>`;
    case 'vpull':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}<g>${ARMS}${rotateAnim(-170, -105, 50, 28, 1.3)}</g></svg>`;
    case 'raise':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}<g>${ARMS}${rotateAnim(0, -85, 50, 28, 1.2)}</g></svg>`;
    case 'curl':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}<line class="ex-body" x1="50" y1="28" x2="36" y2="46"/><g><line class="ex-body" x1="36" y1="46" x2="32" y2="62"/>${rotateAnim(0, -110, 36, 46, 1.1)}</g></svg>`;
    case 'extension':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}<line class="ex-body" x1="50" y1="28" x2="36" y2="46"/><g><line class="ex-body" x1="36" y1="46" x2="32" y2="62"/>${rotateAnim(-100, 0, 36, 46, 1.1)}</g></svg>`;
    case 'squat':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${LEGS}<g>${HEAD}${TORSO}${ARMS}${translateAnim(0, 9, 1.4)}</g></svg>`;
    case 'hinge':
      return `<svg class="ex-icon" viewBox="0 0 100 100">${LEGS}<g>${HEAD}${TORSO}${ARMS}${rotateAnim(0, 42, 50, 60, 1.3)}</g></svg>`;
    case 'core':
      return `<svg class="ex-icon" viewBox="0 0 100 100"><g>
          <circle class="ex-head" cx="20" cy="55" r="7"/>
          <line class="ex-body" x1="27" y1="55" x2="75" y2="58"/>
          <line class="ex-body" x1="25" y1="62" x2="25" y2="78"/>
          <line class="ex-body" x1="75" y1="58" x2="90" y2="75"/>
          ${translateAnim(0, -1.6, 1.6)}
        </g></svg>`;
    case 'cardio':
      return `<svg class="ex-icon" viewBox="0 0 100 100">
        <circle class="ex-head" cx="54" cy="20" r="7"/>
        <line class="ex-body" x1="50" y1="24" x2="54" y2="58"/>
        <g><line class="ex-body" x1="52" y1="58" x2="40" y2="90"/>${rotateAnim(28, -28, 52, 58, 0.7)}</g>
        <g><line class="ex-body" x1="52" y1="58" x2="64" y2="90"/>${rotateAnim(-28, 28, 52, 58, 0.7)}</g>
        <g><line class="ex-body" x1="54" y1="30" x2="40" y2="48"/>${rotateAnim(-24, 24, 54, 30, 0.7)}</g>
        <g><line class="ex-body" x1="54" y1="30" x2="68" y2="48"/>${rotateAnim(24, -24, 54, 30, 0.7)}</g>
      </svg>`;
    default:
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}${ARMS}</svg>`;
  }
}

/* ---------------- State ---------------- */

function defaultState() {
  return {
    profile: null,
    weightLog: [],
    workoutLog: [],
    dietLog: {},
    activeWeekday: null,
    exerciseOverrides: {},
    prLog: [],
    measurementLog: [],
    lastBackupAt: null,
    readinessLog: [],
    waterLog: [],
    aiMode: 'gemini',
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : defaultState();
    return { ...defaultState(), ...parsed };
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

let state = loadState();
let currentTab = 'dashboard';

/* ---------------- Helpers ---------------- */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayStr() {
  return fmtDate(new Date());
}

function todayWeekday() {
  return WEEKDAYS_BY_INDEX[new Date().getDay()];
}

function activeWeekday() {
  return state.activeWeekday || todayWeekday();
}

function isThisWeek(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);
  return d >= start;
}

function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.cssText =
      'position:fixed;bottom:76px;left:50%;transform:translateX(-50%);background:var(--text-primary);color:var(--surface-1);padding:8px 16px;border-radius:20px;font-size:13px;z-index:200;opacity:0;transition:opacity .2s;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.opacity = '0';
  }, 1800);
}

/* ---------------- Calculations ---------------- */

function calcBMR(p) {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
  if (p.sex === 'male') return base + 5;
  if (p.sex === 'female') return base - 161;
  return base - 78;
}

function calcTDEE(p) {
  return calcBMR(p) * (ACTIVITY_MULT[p.activityLevel] || 1.375);
}

function calcTargets(p) {
  const tdee = calcTDEE(p);
  let calories;
  if (p.goal === 'fat_loss') calories = Math.max(tdee - 500, calcBMR(p) * 1.05);
  else if (p.goal === 'muscle_gain') calories = tdee + 300;
  else calories = tdee;
  const proteinPerKg = p.goal === 'general' ? 1.6 : 2.0;
  const protein = p.weightKg * proteinPerKg;
  const fat = (calories * 0.25) / 9;
  const carbs = Math.max((calories - protein * 4 - fat * 9) / 4, 0);
  return {
    tdee: Math.round(tdee),
    calories: Math.round(calories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
  };
}

function dietTotalsForDate(date) {
  const entries = state.dietLog[date] || [];
  return entries.reduce(
    (acc, e) => {
      acc.cal += e.cal * e.qty;
      acc.protein += e.protein * e.qty;
      acc.carbs += e.carbs * e.qty;
      acc.fat += e.fat * e.qty;
      return acc;
    },
    { cal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function latestWeight() {
  if (!state.weightLog.length) return state.profile ? state.profile.weightKg : null;
  return state.weightLog[state.weightLog.length - 1].weightKg;
}

function getStrengthTemplate(muscle, experience) {
  const base = STRENGTH_TEMPLATES[muscle][experience];
  const overrides = (state.exerciseOverrides[muscle] && state.exerciseOverrides[muscle][experience]) || {};
  return base.map((ex) => overrides[ex.name] || ex);
}

/* In-workout exercise swap: session-only, not persisted — for "the bench is
   taken right now," not a permanent plan change (that's what exerciseOverrides,
   editable via the AI assistant, is for). Resets on reload by design. */
let sessionSwaps = {};

function alternateExercisesFor(muscle, excludeName) {
  const seen = new Map();
  ['beginner', 'intermediate', 'advanced'].forEach((tier) => {
    STRENGTH_TEMPLATES[muscle][tier].forEach((ex) => {
      if (ex.name !== excludeName && !seen.has(ex.name)) seen.set(ex.name, ex);
    });
  });
  return [...seen.values()];
}

function getDisplayTemplate(muscle, experience) {
  return getStrengthTemplate(muscle, experience).map((ex, i) => sessionSwaps[`${muscle}:${i}`] || ex);
}

/* Rest timer: lives outside #app on purpose, so it survives tab re-renders
   without wiping in-progress set inputs — pure DOM + setInterval, no
   saveState/render involved. */
let restTimerInterval = null;
let restTimerSeconds = 0;

function updateRestTimerUI() {
  const label = document.getElementById('restTimerLabel');
  if (label) label.textContent = Math.max(restTimerSeconds, 0);
}

function startRestTimer(seconds) {
  clearInterval(restTimerInterval);
  restTimerSeconds = seconds;
  updateRestTimerUI();
  document.getElementById('restTimer').classList.remove('hidden');
  restTimerInterval = setInterval(() => {
    restTimerSeconds--;
    updateRestTimerUI();
    if (restTimerSeconds <= 0) {
      clearInterval(restTimerInterval);
      toast('Rest done — next set 💪');
      if (navigator.vibrate) navigator.vibrate(200);
      setTimeout(() => document.getElementById('restTimer').classList.add('hidden'), 2000);
    }
  }, 1000);
}

function adjustRestTimer(delta) {
  restTimerSeconds = Math.max(0, restTimerSeconds + delta);
  updateRestTimerUI();
}

function stopRestTimer() {
  clearInterval(restTimerInterval);
  document.getElementById('restTimer').classList.add('hidden');
}

function warmupSuggestion(targetWeight) {
  if (!targetWeight || targetWeight < 15) return null;
  const round = (n) => Math.round(n / 2.5) * 2.5;
  return [
    { weight: round(targetWeight * 0.5), reps: 8 },
    { weight: round(targetWeight * 0.75), reps: 5 },
  ];
}

let workoutStartTimes = {};

function waterTargetMl(p) {
  return Math.round((p.weightKg * 35) / 250) * 250;
}

function todayWaterMl() {
  const entry = state.waterLog.find((w) => w.date === todayStr());
  return entry ? entry.ml : 0;
}

function addWater(ml) {
  const date = todayStr();
  const entry = state.waterLog.find((w) => w.date === date);
  if (entry) entry.ml = Math.max(0, entry.ml + ml);
  else state.waterLog.push({ date, ml: Math.max(0, ml) });
  saveState();
  render();
}

function inferPattern(name) {
  const n = name.toLowerCase();
  if (/curl/.test(n)) return 'curl';
  if (/(pushdown|skull|kickback|triceps ext)/.test(n)) return 'extension';
  if (/push-?up/.test(n)) return 'pushup';
  if (/dip/.test(n)) return 'dip';
  if (/(bench|fly|chest press)/.test(n)) return 'bench';
  if (/(row|pull-?over)/.test(n)) return 'pull';
  if (/(pulldown|pull-?up|chin-?up)/.test(n)) return 'vpull';
  if (/(overhead|shoulder press|arnold)/.test(n)) return 'vpress';
  if (/(lateral|front raise|rear delt|face pull|shrug)/.test(n)) return 'raise';
  if (/(deadlift|rdl|romanian|good morning)/.test(n)) return 'hinge';
  if (/(squat|lunge|leg press|calf|leg curl|leg extension)/.test(n)) return 'squat';
  if (/(plank|crunch|sit-?up|leg raise)/.test(n)) return 'core';
  return undefined;
}

function lastExercisePerformance(name) {
  for (let i = state.workoutLog.length - 1; i >= 0; i--) {
    const s = state.workoutLog[i];
    if (!s.exercises) continue;
    const ex = s.exercises.find((e) => e.name === name);
    if (ex) return ex.sets;
  }
  return null;
}

function parseRepTarget(repsStr) {
  const match = String(repsStr).match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!match) return null;
  const lo = Number(match[1]);
  const hi = match[2] ? Number(match[2]) : lo;
  return { lo, hi };
}

function roundToHalf(n) {
  return Math.round(n * 2) / 2;
}

/* Progressive overload: once every logged set at last session met the top of the
   rep target, nudge the weight up; if sets fell short of the bottom, repeat the
   weight and re-chase the rep target; otherwise nudge reps by one at the same
   weight. Skipped for time-based or AMRAP targets, which have no rep number to
   compare against. */
function suggestProgression(ex, lastSets) {
  if (!lastSets || !lastSets.length) return null;
  if (/sec|min|failure/i.test(ex.reps)) return null;
  const target = parseRepTarget(ex.reps);
  if (!target) return null;
  const validSets = lastSets.filter((s) => s.weight != null && s.reps != null);
  if (!validSets.length) return null;
  const maxWeight = Math.max(...validSets.map((s) => s.weight));
  const allHitTop = validSets.every((s) => s.reps >= target.hi);
  const allBelowMin = validSets.every((s) => s.reps < target.lo);
  if (allHitTop) {
    const bump = maxWeight >= 20 ? 2.5 : 1;
    return { weight: roundToHalf(maxWeight + bump), reps: target.lo, note: `hit ${target.hi}+ reps last time — try a bit heavier` };
  }
  if (allBelowMin) {
    return { weight: maxWeight, reps: target.lo, note: `aim for ${target.lo}+ reps at the same weight` };
  }
  return { weight: maxWeight, reps: Math.min(validSets[0].reps + 1, target.hi), note: 'try for one more rep' };
}

function collectActiveDates() {
  const set = new Set();
  state.workoutLog.forEach((s) => set.add(s.date));
  Object.keys(state.dietLog).forEach((d) => {
    if ((state.dietLog[d] || []).length) set.add(d);
  });
  return set;
}

function calcStreak() {
  const active = collectActiveDates();
  let streak = 0;
  const cursor = new Date();
  if (!active.has(fmtDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (active.has(fmtDate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/* ---------------- Rendering: shared bits ---------------- */

function meterRow(label, value, target, unit, warnOnOver = true) {
  const pct = target > 0 ? Math.min((value / target) * 100, 100) : 0;
  const over = warnOnOver && target > 0 && value > target * 1.1;
  return `
    <div style="margin-bottom:10px;">
      <div class="row"><span>${label}</span><span class="tiny">${Math.round(value)} / ${Math.round(target)} ${unit}</span></div>
      <div class="meter ${over ? 'over' : ''}"><span style="width:${pct}%"></span></div>
    </div>`;
}

function sessionVolume(session) {
  if (!session.exercises) return 0;
  return session.exercises.reduce((sum, ex) => sum + ex.sets.reduce((s, set) => s + (set.weight || 0) * (set.reps || 0), 0), 0);
}

/* Deload signal: if a muscle's most recent logged session dropped >15% in total
   volume vs the one before it, that's fatigue/regression worth backing off for,
   not just pushing through. */
function deloadSignal() {
  const flags = [];
  ['chest', 'back', 'shoulders', 'arms', 'legs'].forEach((muscle) => {
    const sessions = state.workoutLog.filter((s) => s.muscle === muscle);
    if (sessions.length < 2) return;
    const last = sessions[sessions.length - 1];
    const prev = sessions[sessions.length - 2];
    const lastVol = sessionVolume(last);
    const prevVol = sessionVolume(prev);
    if (prevVol > 0 && lastVol < prevVol * 0.85) {
      flags.push({ muscle, date: last.date, drop: Math.round((1 - lastVol / prevVol) * 100) });
    }
  });
  if (!flags.length) return null;
  flags.sort((a, b) => b.date.localeCompare(a.date));
  return flags[0];
}

function deloadBannerHtml() {
  const signal = deloadSignal();
  if (!signal) return '';
  return `<div class="card nudge"><p style="margin:0;">⚠️ Your last <b>${MUSCLE_LABELS[signal.muscle]}</b> session dropped ${signal.drop}% in total volume vs the one before. Might be worth a lighter week or an extra rest day before pushing again.</p></div>`;
}

function weeklyCheckinText() {
  const weekCount = state.workoutLog.filter((s) => isThisWeek(s.date)).length;
  const entries = [...state.weightLog].sort((a, b) => a.date.localeCompare(b.date));
  let weightPart = '';
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = fmtDate(weekAgo);
  const recentEntries = entries.filter((e) => e.date >= weekAgoStr);
  if (recentEntries.length >= 2) {
    const change = (recentEntries[recentEntries.length - 1].weightKg - recentEntries[0].weightKg).toFixed(1);
    weightPart = ` · weight ${change > 0 ? '+' : ''}${change} kg this week`;
  }
  return `${weekCount}/6 sessions this week${weightPart}`;
}

/* Schedule-aware nudge, purely on-open (no push notifications — that needs a
   backend to trigger while the app is closed, which would break the free/no-server
   model). If today's a scheduled lifting day, it's evening, and nothing's logged
   yet, say so once when the app is opened. */
function shouldNudgeToday() {
  const wd = todayWeekday();
  const muscle = WEEKDAY_MUSCLE[wd];
  if (muscle === 'rest') return false;
  if (state.workoutLog.some((s) => s.date === todayStr())) return false;
  return new Date().getHours() >= 18;
}

function scheduleNudgeHtml() {
  if (!shouldNudgeToday()) return '';
  const muscle = WEEKDAY_MUSCLE[todayWeekday()];
  return `<div class="card nudge"><p style="margin:0;">⏰ Haven't logged today's <b>${MUSCLE_LABELS[muscle]}</b> session yet — still time to get it in.</p></div>`;
}

function todaysReadiness() {
  return state.readinessLog.find((r) => r.date === todayStr());
}

function logReadiness(score) {
  const date = todayStr();
  const existing = state.readinessLog.find((r) => r.date === date);
  if (existing) existing.score = score;
  else state.readinessLog.push({ date, score });
  saveState();
  render();
}

const READINESS_LABELS = { 1: '😴 Low energy', 3: '🙂 Normal', 5: '💪 Feeling strong' };

function readinessCheckinHtml() {
  const today = todaysReadiness();
  if (today) {
    return `<div class="card"><p class="tiny" style="margin:0;">Today's readiness: ${READINESS_LABELS[today.score] || today.score}</p></div>`;
  }
  return `
    <div class="card">
      <h3>How are you feeling today?</h3>
      <div class="chip-row">
        <button class="chip" data-action="log-readiness" data-score="1">😴 Low energy</button>
        <button class="chip" data-action="log-readiness" data-score="3">🙂 Normal</button>
        <button class="chip" data-action="log-readiness" data-score="5">💪 Feeling strong</button>
      </div>
    </div>`;
}

function readinessTipHtml() {
  const today = todaysReadiness();
  if (!today || today.score > 1) return '';
  return `<div class="card nudge"><p style="margin:0;">😴 You logged low energy today — consider trimming a set or two, or just matching last time's weight instead of chasing progression.</p></div>`;
}

function backupNudgeHtml() {
  const totalEntries = state.workoutLog.length + Object.values(state.dietLog).reduce((n, l) => n + l.length, 0);
  if (totalEntries < 10) return '';
  if (!state.lastBackupAt) {
    return `<div class="card nudge"><p style="margin:0;">💾 You've logged a fair bit — everything lives only on this device. <button class="link-btn" data-action="export-data">Back it up now</button> in case you switch phones or clear your browser.</p></div>`;
  }
  const daysSince = Math.floor((new Date() - new Date(state.lastBackupAt)) / 86400000);
  if (daysSince >= 30) {
    return `<div class="card nudge"><p style="margin:0;">💾 Last backup was ${daysSince} days ago. <button class="link-btn" data-action="export-data">Back up again</button>?</p></div>`;
  }
  return '';
}

function levelUpNudgeHtml() {
  const p = state.profile;
  if (p.experience === 'advanced') return '';
  const count = state.workoutLog.length;
  const threshold = p.experience === 'beginner' ? 12 : 24;
  if (count < threshold) return '';
  const next = p.experience === 'beginner' ? 'Intermediate' : 'Advanced';
  return `<div class="card nudge"><p style="margin:0;">\u{1F4A1} You’ve logged ${count} sessions on ${p.experience}. Feeling strong? Try bumping to <b>${next}</b> in Settings.</p></div>`;
}

/* ---------------- Rendering: Dashboard ---------------- */

const MOTIVATIONAL_QUOTES = [
  'Discipline beats motivation. Show up anyway.',
  "The weight doesn't care about your excuses — lift it anyway.",
  'Small daily wins build the body you want.',
  "Har din thoda better — that's the whole game.",
  "You don't need to feel like it. You just need to start.",
  'Consistency is the only supplement that actually works.',
  'One more rep than yesterday is still progress.',
  'Your only competition is who you were last week.',
  "Rest when you're tired, not when you're bored.",
  'Progress, not perfection.',
  'The best workout is the one you actually did.',
  'Bhai, showing up today is 90% of the battle.',
];

function todaysQuote() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}

/* Synthesizes every signal already tracked — workout consistency, diet
   logging, protein hit-rate, weight trend vs the user's actual goal, recent
   PRs/deloads — into one plain-language verdict instead of leaving the user
   to piece together what a dozen separate numbers mean. Only speaks to a
   dimension when there's real logged data behind it. */
function weeklyAssessment() {
  const p = state.profile;
  const good = [];
  const bad = [];
  const neutral = [];

  const weekCount = state.workoutLog.filter((s) => isThisWeek(s.date)).length;
  if (weekCount === 0) bad.push('No workouts logged yet this week');
  else if (weekCount >= 5) good.push(`${weekCount}/6 sessions logged this week`);
  else if (weekCount >= 3) neutral.push(`${weekCount}/6 sessions logged this week`);
  else bad.push(`Only ${weekCount}/6 sessions logged this week`);

  const targets = calcTargets(p);
  let daysLogged = 0;
  let proteinHitDays = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = fmtDate(d);
    if (state.dietLog[ds] && state.dietLog[ds].length) {
      daysLogged++;
      if (dietTotalsForDate(ds).protein >= targets.protein * 0.85) proteinHitDays++;
    }
  }
  if (daysLogged === 0) {
    bad.push("Haven't logged any meals this week");
  } else {
    if (daysLogged >= 5) good.push(`Food logged on ${daysLogged}/7 days`);
    else neutral.push(`Food logged on ${daysLogged}/7 days`);
    if (proteinHitDays >= Math.ceil(daysLogged * 0.7)) good.push(`Protein target hit on ${proteinHitDays}/${daysLogged} logged days`);
    else bad.push(`Protein target only hit on ${proteinHitDays}/${daysLogged} logged days`);
  }

  const entries = [...state.weightLog].sort((a, b) => a.date.localeCompare(b.date));
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const recent = entries.filter((e) => new Date(e.date) >= twoWeeksAgo);
  if (recent.length >= 2) {
    const change = recent[recent.length - 1].weightKg - recent[0].weightKg;
    if (p.goal === 'muscle_gain') {
      if (change > 0.2) good.push(`Weight trending up (+${change.toFixed(1)}kg over ~2 weeks) — matches your muscle gain goal`);
      else if (change < -0.2) bad.push(`Weight trending down (${change.toFixed(1)}kg) while your goal is muscle gain — might need more food`);
      else neutral.push('Weight has been flat the last couple weeks');
    } else if (p.goal === 'fat_loss') {
      if (change < -0.2) good.push(`Weight trending down (${change.toFixed(1)}kg over ~2 weeks) — matches your fat loss goal`);
      else if (change > 0.2) bad.push(`Weight trending up (+${change.toFixed(1)}kg) while your goal is fat loss`);
      else neutral.push('Weight has been flat the last couple weeks');
    } else {
      neutral.push(`Weight change over ~2 weeks: ${change > 0 ? '+' : ''}${change.toFixed(1)}kg`);
    }
  }

  const lastPr = state.prLog.length ? state.prLog[state.prLog.length - 1] : null;
  if (lastPr && isThisWeek(lastPr.date)) good.push(`New PR this week: ${lastPr.exercise} at ${lastPr.weight}kg`);
  const deload = deloadSignal();
  if (deload) bad.push(`${MUSCLE_LABELS[deload.muscle]} volume dropped ${deload.drop}% last session`);

  if (!good.length && !bad.length && !neutral.length) {
    return { verdict: 'Not enough data yet', emoji: '📊', good, bad, neutral };
  }
  let verdict, emoji;
  if (bad.length === 0 && good.length > 0) {
    verdict = "You're on track";
    emoji = '💪';
  } else if (bad.length === 0) {
    verdict = 'Doing okay, nothing alarming';
    emoji = '🙂';
  } else if (bad.length <= good.length) {
    verdict = 'Doing okay, a few things to tighten up';
    emoji = '🙂';
  } else {
    verdict = 'Needs attention this week';
    emoji = '⚠️';
  }
  return { verdict, emoji, good, bad, neutral };
}

function assessmentHtml() {
  const a = weeklyAssessment();
  const items = [
    ...a.good.map((t) => ['good', t]),
    ...a.neutral.map((t) => ['neutral', t]),
    ...a.bad.map((t) => ['bad', t]),
  ];
  const colors = { good: 'var(--good)', bad: 'var(--critical)', neutral: 'var(--text-secondary)' };
  const marks = { good: '✓', bad: '✕', neutral: '•' };
  return `
    <div class="card">
      <h3 style="margin-bottom:8px;">${a.emoji} ${a.verdict}</h3>
      ${
        items.length
          ? items.map(([kind, text]) => `<p class="tiny" style="margin:4px 0;color:${colors[kind]};">${marks[kind]} ${escapeHtml(text)}</p>`).join('')
          : '<p class="tiny">Log a few workouts and meals to get your first assessment.</p>'
      }
    </div>`;
}

function renderDashboard() {
  const p = state.profile;
  const targets = calcTargets(p);
  const totals = dietTotalsForDate(todayStr());
  const wd = todayWeekday();
  const muscle = WEEKDAY_MUSCLE[wd];
  const currentWeight = latestWeight();

  let workoutCard;
  if (muscle === 'rest') {
    workoutCard = `
      <div class="card">
        <h3>Today — Rest Day</h3>
        <p class="muted">Recovery day. A light walk or stretching is fine, but no lifting scheduled.</p>
      </div>`;
  } else if (muscle === 'cardio') {
    const list = CARDIO_TEMPLATES[p.experience];
    workoutCard = `
      <div class="card">
        <div class="row"><h3 style="margin:0;">Today — Cardio</h3><button class="btn-secondary" data-action="go-workout">Start</button></div>
        <ul style="padding-left:18px; margin:10px 0 0;">
          ${list.map((a) => `<li>${escapeHtml(a.activity)} — ${a.duration}</li>`).join('')}
        </ul>
      </div>`;
  } else {
    const list = getStrengthTemplate(muscle, p.experience);
    workoutCard = `
      <div class="card">
        <div class="row"><h3 style="margin:0;">Today — ${MUSCLE_LABELS[muscle]}</h3><button class="btn-secondary" data-action="go-workout">Start</button></div>
        <ul style="padding-left:18px; margin:10px 0 0;">
          ${list.map((ex) => `<li>${escapeHtml(ex.name)} — ${ex.sets}×${ex.reps}</li>`).join('')}
        </ul>
      </div>`;
  }

  const streak = calcStreak();
  return `
    <div class="card hero-card">
      <p class="hero-date">${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      <h2 class="hero-greeting">Hi ${escapeHtml(p.name)} 👋</h2>
      <div class="hero-streak">🔥 ${streak} day streak</div>
      <p class="hero-quote">"${escapeHtml(todaysQuote())}"</p>
      <p class="hero-meta">Goal: ${GOAL_LABELS[p.goal]}${currentWeight ? ' · ' + currentWeight + ' kg' : ''} · ${weeklyCheckinText()}</p>
    </div>
    ${assessmentHtml()}
    ${readinessCheckinHtml()}
    ${readinessTipHtml()}
    ${scheduleNudgeHtml()}
    ${deloadBannerHtml()}
    ${backupNudgeHtml()}
    ${levelUpNudgeHtml()}
    <div class="card">
      <h3>Today's targets</h3>
      ${meterRow('Calories', totals.cal, targets.calories, 'kcal')}
      ${meterRow('Protein', totals.protein, targets.protein, 'g')}
      ${meterRow('Carbs', totals.carbs, targets.carbs, 'g')}
      ${meterRow('Fat', totals.fat, targets.fat, 'g')}
      <p class="tiny" style="margin-top:10px;margin-bottom:0;">TDEE ≈ ${targets.tdee} kcal/day</p>
    </div>
    ${workoutCard}
  `;
}

/* ---------------- Rendering: Workout ---------------- */

function renderWorkout() {
  const wd = activeWeekday();
  const muscle = WEEKDAY_MUSCLE[wd];
  const chips = WEEKDAYS_ORDERED.map(
    (k) => `<button class="chip ${k === wd ? 'active' : ''}" data-action="pick-weekday" data-weekday="${k}">${WEEKDAY_SHORT[k]}</button>`
  ).join('');

  let body;
  if (muscle === 'rest') {
    body = `<div class="card"><h3>${WEEKDAY_LABELS[wd]} — Rest Day</h3><p class="muted">No lifting scheduled. Recovery: light walk, stretching, foam rolling, or just rest.</p></div>`;
  } else if (muscle === 'cardio') {
    body = renderCardioDay(wd);
  } else {
    body = renderStrengthDay(wd, muscle);
  }

  return `
    <div class="card">
      <h3 style="margin:0;">${WEEKDAY_LABELS[wd]} — ${MUSCLE_LABELS[muscle]}</h3>
      <div class="chip-row">${chips}</div>
    </div>
    ${body}
    <div class="card">
      <h3>History</h3>
      ${workoutHistoryHtml()}
    </div>
  `;
}

function renderStrengthDay(wd, muscle) {
  const p = state.profile;
  if (!workoutStartTimes[muscle]) workoutStartTimes[muscle] = Date.now();
  const template = getDisplayTemplate(muscle, p.experience);
  const exercisesHtml = template
    .map((ex, exIdx) => {
      const last = lastExercisePerformance(ex.name);
      const suggestion = suggestProgression(ex, last);
      const setsHtml = Array.from({ length: ex.sets })
        .map((_, setIdx) => {
          const lastSet = last && last[setIdx];
          const phW = suggestion ? String(suggestion.weight) : lastSet && lastSet.weight ? String(lastSet.weight) : 'kg';
          const phR = suggestion ? String(suggestion.reps) : lastSet && lastSet.reps ? String(lastSet.reps) : 'reps';
          return `
          <div class="set-row">
            <span class="tiny">${setIdx + 1}</span>
            <input type="number" inputmode="decimal" placeholder="${phW}" data-ex="${exIdx}" data-set="${setIdx}" data-field="weight" />
            <input type="number" inputmode="numeric" placeholder="${phR}" data-ex="${exIdx}" data-set="${setIdx}" data-field="reps" />
            <span></span>
          </div>`;
        })
        .join('');
      const lastSummary = last ? ' · last: ' + last.map((s) => `${s.weight || 0}×${s.reps || 0}`).join(', ') : '';
      const suggestionHtml = suggestion
        ? `<div class="tiny" style="margin-top:2px;color:var(--series-1);">💡 ${suggestion.note} — try ${suggestion.weight}kg × ${suggestion.reps}</div>`
        : '';
      const warmup = suggestion ? warmupSuggestion(suggestion.weight) : null;
      const warmupHtml = warmup
        ? `<div class="tiny" style="margin-top:2px;">🔥 Warm-up: ${warmup.map((w) => `${w.weight}kg×${w.reps}`).join(', ')}</div>`
        : '';
      return `
      <div class="exercise">
        <div class="row" style="align-items:flex-start;gap:10px;">
          <div class="ex-icon-wrap">${exIconSVG(ex.pattern)}</div>
          <div style="flex:1;">
            <div class="row" style="align-items:flex-start;gap:6px;flex-wrap:wrap;">
              <div class="exercise-name" style="min-width:0;">${escapeHtml(ex.name)}</div>
              <span style="flex-shrink:0;white-space:nowrap;">
                <button type="button" class="link-btn" data-action="voice-log" data-ex="${exIdx}">🎤</button>
                <button type="button" class="link-btn" data-action="swap-exercise" data-muscle="${muscle}" data-idx="${exIdx}" data-name="${escapeHtml(ex.name)}">🔄 Swap</button>
                <button type="button" class="link-btn" data-action="start-rest">⏱ Rest</button>
              </span>
            </div>
            <div class="tiny">Target: ${ex.sets} × ${ex.reps}${lastSummary}</div>
            ${warmupHtml}
            <div class="tiny" style="margin-top:2px;">${escapeHtml(ex.cue)} · <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' exercise form')}" target="_blank" rel="noopener" style="color:var(--series-1);">▶ How to</a></div>
            ${suggestionHtml}
          </div>
        </div>
        ${setsHtml}
      </div>`;
    })
    .join('');
  const warmup = WARMUP_ROUTINES[muscle] || [];
  return `
    <div class="card">
      <h3>Warm-up</h3>
      <ul style="padding-left:18px; margin:8px 0 0;">
        ${warmup.map((step) => `<li class="tiny">${escapeHtml(step)}</li>`).join('')}
      </ul>
    </div>
    <div class="card">
      ${exercisesHtml}
      <div id="extraExercises"></div>
      <button type="button" class="btn-secondary btn-block" style="margin-top:12px;" data-action="add-extra-exercise">+ Log something extra</button>
      <button class="btn-primary" style="margin-top:8px;" data-action="save-workout" data-weekday="${wd}" data-muscle="${muscle}">Save workout</button>
    </div>
    <div class="card">
      <h3>Cardio finisher</h3>
      <p class="tiny" style="margin:0;">${escapeHtml(FINISHER_CARDIO[muscle] || '')}</p>
    </div>`;
}

/* Voice logging: Android Chrome supports SpeechRecognition well; iOS Safari
   historically doesn't ship it at all, so this degrades to a toast rather than
   a crash on unsupported browsers. */
function startVoiceLog(exIdx) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    toast('Voice input not supported on this browser');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  toast('Listening… say "60 for 10"');
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const match = transcript.match(/(\d+(?:\.\d+)?)\D+(\d+)/);
    if (!match) {
      toast(`Didn't catch that: "${transcript}"`);
      return;
    }
    const weight = match[1];
    const reps = match[2];
    const weightInputs = document.querySelectorAll(`[data-ex="${exIdx}"][data-field="weight"]`);
    const repInputs = document.querySelectorAll(`[data-ex="${exIdx}"][data-field="reps"]`);
    let filled = false;
    for (let i = 0; i < weightInputs.length; i++) {
      if (!weightInputs[i].value && !repInputs[i].value) {
        weightInputs[i].value = weight;
        repInputs[i].value = reps;
        filled = true;
        break;
      }
    }
    toast(filled ? `Logged ${weight} × ${reps}` : 'All sets already filled for this exercise');
  };
  recognition.onerror = (event) => toast(`Voice input error: ${event.error}`);
  recognition.start();
}

function addExtraExerciseBlock() {
  const container = document.getElementById('extraExercises');
  if (!container) return;
  const idx = container.querySelectorAll('[data-extra-block]').length;
  const block = document.createElement('div');
  block.className = 'exercise';
  block.setAttribute('data-extra-block', String(idx));
  block.innerHTML = `
    <div class="row" style="align-items:center;gap:8px;">
      <input type="text" placeholder="What did you do extra?" data-extra="${idx}" data-field="name" style="flex:1;" />
      <button type="button" class="link-btn" data-action="remove-extra">✕</button>
    </div>
    ${[0, 1, 2]
      .map(
        (setIdx) => `
      <div class="set-row">
        <span class="tiny">${setIdx + 1}</span>
        <input type="number" inputmode="decimal" placeholder="kg" data-extra="${idx}" data-set="${setIdx}" data-field="weight" />
        <input type="number" inputmode="numeric" placeholder="reps" data-extra="${idx}" data-set="${setIdx}" data-field="reps" />
        <span></span>
      </div>`
      )
      .join('')}
  `;
  container.appendChild(block);
}

function collectExtraExercises() {
  const blocks = document.querySelectorAll('#extraExercises [data-extra-block]');
  const extras = [];
  blocks.forEach((block) => {
    const nameEl = block.querySelector('[data-field="name"]');
    const name = nameEl && nameEl.value.trim();
    if (!name) return;
    const sets = [];
    for (let setIdx = 0; setIdx < 3; setIdx++) {
      const wEl = block.querySelector(`[data-set="${setIdx}"][data-field="weight"]`);
      const rEl = block.querySelector(`[data-set="${setIdx}"][data-field="reps"]`);
      const w = wEl ? wEl.value : '';
      const r = rEl ? rEl.value : '';
      if (w || r) sets.push({ weight: w ? Number(w) : null, reps: r ? Number(r) : null });
    }
    if (sets.length) extras.push({ name, sets });
  });
  return extras;
}

function renderCardioDay(wd) {
  const p = state.profile;
  const list = CARDIO_TEMPLATES[p.experience];
  const itemsHtml = list
    .map(
      (a, i) => `
    <div class="exercise">
      <div class="row" style="align-items:flex-start;gap:10px;">
        <div class="ex-icon-wrap">${exIconSVG('cardio')}</div>
        <div style="flex:1;">
          <div class="exercise-name">${escapeHtml(a.activity)}</div>
          <div class="tiny">Target: ${a.duration}</div>
          <div class="tiny" style="margin-top:2px;">${escapeHtml(a.cue)}</div>
        </div>
      </div>
      <div class="set-row" style="grid-template-columns:1fr auto;">
        <input type="number" inputmode="numeric" placeholder="minutes done" data-cardio="${i}" />
        <span></span>
      </div>
    </div>`
    )
    .join('');
  return `
    <div class="card">
      <h3>Warm-up</h3>
      <p class="tiny" style="margin:8px 0 0;">2-3 min easy pace to raise your heart rate gradually, then ramp into the first activity below — don't jump straight to top effort.</p>
    </div>
    <div class="card">
      ${itemsHtml}
      <button class="btn-primary" style="margin-top:12px;" data-action="save-cardio" data-weekday="${wd}">Save session</button>
    </div>`;
}

function workoutHistoryHtml() {
  if (!state.workoutLog.length) return '<p class="empty-state">No sessions logged yet.</p>';
  return state.workoutLog
    .map((s, i) => ({ session: s, idx: i }))
    .reverse()
    .slice(0, 10)
    .map(({ session: s, idx }) => {
      const label = MUSCLE_LABELS[s.muscle] || s.muscle || '';
      let detail = '';
      if (s.exercises) {
        const totalSets = s.exercises.reduce((n, e) => n + e.sets.length, 0);
        detail = `${s.exercises.length} exercises, ${totalSets} sets${s.durationMin ? ` · ${s.durationMin} min` : ''}`;
      } else if (s.activities) {
        const totalMin = s.activities.reduce((n, a) => n + a.minutes, 0);
        detail = `${totalMin} min`;
      }
      return `<div class="log-entry"><span>${s.date} · ${label}</span><span class="tiny">${detail} <button class="link-btn" data-action="delete-workout" data-i="${idx}">✕</button></span></div>`;
    })
    .join('');
}

function saveWorkout(weekday, muscle) {
  const template = getDisplayTemplate(muscle, state.profile.experience);
  const exercises = template
    .map((ex, exIdx) => {
      const sets = [];
      for (let setIdx = 0; setIdx < ex.sets; setIdx++) {
        const wEl = document.querySelector(`[data-ex="${exIdx}"][data-set="${setIdx}"][data-field="weight"]`);
        const rEl = document.querySelector(`[data-ex="${exIdx}"][data-set="${setIdx}"][data-field="reps"]`);
        const w = wEl ? wEl.value : '';
        const r = rEl ? rEl.value : '';
        if (w || r) sets.push({ weight: w ? Number(w) : null, reps: r ? Number(r) : null });
      }
      return { name: ex.name, sets };
    })
    .filter((ex) => ex.sets.length);
  const allExercises = [...exercises, ...collectExtraExercises()];
  if (!allExercises.length) {
    toast('Log at least one set first');
    return;
  }
  const prs = [];
  allExercises.forEach((ex) => {
    const prevMax = maxWeightEver(ex.name);
    const todayMax = Math.max(0, ...ex.sets.map((s) => s.weight || 0));
    if (prevMax > 0 && todayMax > prevMax) {
      prs.push({ date: todayStr(), exercise: ex.name, weight: todayMax });
    }
  });
  const durationMin = workoutStartTimes[muscle] ? Math.max(1, Math.round((Date.now() - workoutStartTimes[muscle]) / 60000)) : null;
  delete workoutStartTimes[muscle];
  state.workoutLog.push({ date: todayStr(), weekday, muscle, exercises: allExercises, durationMin });
  state.prLog.push(...prs);
  state.activeWeekday = null;
  Object.keys(sessionSwaps).forEach((key) => {
    if (key.startsWith(`${muscle}:`)) delete sessionSwaps[key];
  });
  saveState();
  toast(prs.length ? `🏆 New PR! ${prs.map((p) => `${p.exercise} ${p.weight}kg`).join(', ')}` : 'Workout saved 💪');
  render();
}

function saveCardio(weekday) {
  const list = CARDIO_TEMPLATES[state.profile.experience];
  const activities = list
    .map((a, i) => {
      const el = document.querySelector(`[data-cardio="${i}"]`);
      const minutes = el && el.value ? Number(el.value) : 0;
      return { activity: a.activity, minutes };
    })
    .filter((a) => a.minutes > 0);
  if (!activities.length) {
    toast('Log at least one activity');
    return;
  }
  state.workoutLog.push({ date: todayStr(), weekday, muscle: 'cardio', activities });
  state.activeWeekday = null;
  saveState();
  toast('Cardio logged 🏃');
  render();
}

/* ---------------- Rendering: Diet ---------------- */

function foodResultsHtml(query) {
  const q = (query || '').trim().toLowerCase();
  const list = q ? FOOD_DB.filter((f) => f.name.toLowerCase().includes(q)) : FOOD_DB;
  if (!list.length) return '<p class="tiny">No matches.</p>';
  return list
    .map(
      (f) => `
    <div class="food-item">
      <span>${escapeHtml(f.name)} <span class="tiny">(${f.unit}, ${f.cal} kcal)</span></span>
      <button class="btn-secondary" data-action="add-food" data-name="${escapeHtml(f.name)}">+</button>
    </div>`
    )
    .join('');
}

function proteinTrendSeries(days) {
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = fmtDate(d);
    if (state.dietLog[ds] && state.dietLog[ds].length) {
      series.push({ date: ds, protein: Math.round(dietTotalsForDate(ds).protein) });
    }
  }
  return series;
}

function renderDiet() {
  const p = state.profile;
  const targets = calcTargets(p);
  const totals = dietTotalsForDate(todayStr());
  const todayEntries = state.dietLog[todayStr()] || [];
  const mealPlan = MEAL_TEMPLATES[p.diet] || MEAL_TEMPLATES.eggetarian;
  const proteinSeries = proteinTrendSeries(14);
  return `
    <div class="card">
      <h3>Today's totals</h3>
      ${meterRow('Calories', totals.cal, targets.calories, 'kcal')}
      ${meterRow('Protein', totals.protein, targets.protein, 'g')}
      ${meterRow('Carbs', totals.carbs, targets.carbs, 'g')}
      ${meterRow('Fat', totals.fat, targets.fat, 'g')}
    </div>
    <div class="card">
      <h3>Water</h3>
      ${meterRow('Water', todayWaterMl(), waterTargetMl(p), 'ml', false)}
      <div class="row" style="gap:8px;margin-top:8px;">
        <button class="btn-secondary" style="width:auto;" data-action="add-water" data-ml="250">+ Glass (250ml)</button>
        <button class="btn-secondary" style="width:auto;" data-action="add-water" data-ml="-250">− Undo</button>
      </div>
    </div>
    <div class="card">
      <h3>Protein trend (14 days)</h3>
      ${
        proteinSeries.length >= 2
          ? `<div class="chart-wrap" style="position:relative;">${buildLineChartSVG(proteinSeries, 'proteinChart', 'protein')}</div>`
          : '<p class="empty-state">Log a few more days to see your protein trend.</p>'
      }
      <p class="tiny">Consistency matters more than any single day for muscle gain.</p>
    </div>
    <div class="card">
      <h3>Logged today</h3>
      ${
        todayEntries.length
          ? todayEntries
              .map(
                (e, i) => `
        <div class="log-entry">
          <span>${escapeHtml(e.name)}${e.qty > 1 ? ' × ' + e.qty : ''}</span>
          <span class="tiny">${Math.round(e.cal * e.qty)} kcal <button class="link-btn" data-action="remove-food" data-i="${i}">✕</button></span>
        </div>`
              )
              .join('')
          : '<p class="empty-state">Nothing logged yet today.</p>'
      }
    </div>
    <div class="card">
      <h3>Add food</h3>
      <input type="text" id="foodSearch" placeholder="Search foods (e.g. egg, paneer, rice)" />
      <div id="foodResults" style="margin-top:8px;">${foodResultsHtml('')}</div>
      <button type="button" class="link-btn" data-action="toggle-custom" style="margin-top:10px;">+ Add custom food</button>
      <form id="customFoodForm" class="hidden" style="margin-top:10px;">
        <input type="text" name="name" placeholder="Food name" required />
        <div class="grid4">
          <input type="number" step="any" name="cal" placeholder="kcal" required />
          <input type="number" step="any" name="protein" placeholder="protein g" required />
          <input type="number" step="any" name="carbs" placeholder="carbs g" required />
          <input type="number" step="any" name="fat" placeholder="fat g" required />
        </div>
        <button type="submit" class="btn-secondary btn-block">Add custom food</button>
      </form>
    </div>
    <div class="card">
      <h3>Eating out / travelling?</h3>
      <p class="tiny">Rough estimates for when you can't control the kitchen — log the closest match.</p>
      ${EATING_OUT_PRESETS.map(
        (f) => `
      <div class="food-item">
        <span>${escapeHtml(f.name)} <span class="tiny">(~${f.cal} kcal)</span></span>
        <button class="btn-secondary" data-action="add-food" data-name="${escapeHtml(f.name)}">+</button>
      </div>`
      ).join('')}
    </div>
    <div class="card">
      <h3>Suggested meal plan — ${DIET_LABELS[p.diet]}</h3>
      <p class="tiny">Scale portions to hit the totals above. Tap "+ Log" for a rough estimate against today's totals, or log the exact food above once you've eaten.</p>
      ${mealPlan
        .map(([slot, desc]) => {
          const frac = MEAL_SLOT_FRACTIONS[slot] || 0.25;
          const est = {
            cal: Math.round(targets.calories * frac),
            protein: Math.round(targets.protein * frac),
            carbs: Math.round(targets.carbs * frac),
            fat: Math.round(targets.fat * frac),
          };
          return `
      <div class="log-entry">
        <span>${slot}</span>
        <span class="tiny" style="text-align:right;max-width:55%;">${desc}</span>
      </div>
      <div class="row" style="margin:-2px 0 8px;">
        <span class="tiny">~${est.cal} kcal</span>
        <button class="btn-secondary" data-action="log-meal-slot" data-slot="${slot}" data-cal="${est.cal}" data-protein="${est.protein}" data-carbs="${est.carbs}" data-fat="${est.fat}">+ Log</button>
      </div>`;
        })
        .join('')}
    </div>
  `;
}

function addFoodByName(name) {
  const item = FOOD_DB.find((f) => f.name === name) || EATING_OUT_PRESETS.find((f) => f.name === name);
  if (!item) return;
  addFoodEntry(item);
}

function addFoodEntry(item) {
  const date = todayStr();
  if (!state.dietLog[date]) state.dietLog[date] = [];
  const existing = state.dietLog[date].find((e) => e.name === item.name);
  if (existing) existing.qty += 1;
  else state.dietLog[date].push({ name: item.name, cal: item.cal, protein: item.protein, carbs: item.carbs, fat: item.fat, qty: 1 });
  saveState();
  render();
}

function removeFoodEntry(i) {
  const date = todayStr();
  const list = state.dietLog[date];
  if (!list || !list[i]) return;
  if (list[i].qty > 1) list[i].qty -= 1;
  else list.splice(i, 1);
  saveState();
  render();
}

/* ---------------- Rendering: Progress ---------------- */

function buildLineChartSVG(entries, idPrefix, valueKey = 'weightKg') {
  const W = 320,
    H = 170,
    padL = 34,
    padR = 12,
    padT = 14,
    padB = 24;
  const innerW = W - padL - padR,
    innerH = H - padT - padB;
  const weights = entries.map((e) => e[valueKey]);
  let min = Math.min(...weights),
    max = Math.max(...weights);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const x = (i) => padL + (entries.length === 1 ? innerW / 2 : (i / (entries.length - 1)) * innerW);
  const y = (w) => padT + innerH - ((w - min) / (max - min)) * innerH;
  const points = entries.map((e, i) => [x(i), y(e[valueKey])]);
  const pathD = points.map((pt, i) => (i === 0 ? 'M' : 'L') + pt[0].toFixed(1) + ',' + pt[1].toFixed(1)).join(' ');
  const gridLines = [0, 0.5, 1]
    .map((f) => {
      const gy = padT + innerH * f;
      return `<line class="grid" x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - padR}" y2="${gy.toFixed(1)}" />`;
    })
    .join('');
  const dots = points.map((pt, i) => `<circle class="dot" data-i="${i}" cx="${pt[0].toFixed(1)}" cy="${pt[1].toFixed(1)}" r="4" />`).join('');
  return `
    <svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" height="170" id="${idPrefix}Svg">
      ${gridLines}
      <line class="baseline" x1="${padL}" y1="${(padT + innerH).toFixed(1)}" x2="${W - padR}" y2="${(padT + innerH).toFixed(1)}" />
      <text x="2" y="${padT + 4}">${max.toFixed(1)}</text>
      <text x="2" y="${padT + innerH}">${min.toFixed(1)}</text>
      <path class="line" d="${pathD}" />
      ${dots}
      <line class="crosshair" id="${idPrefix}Crosshair" x1="0" y1="${padT}" x2="0" y2="${(padT + innerH).toFixed(1)}" style="opacity:0" />
    </svg>`;
}

function wireLineChart(entries, idPrefix, valueKey = 'weightKg', unitSuffix = ' kg') {
  const svg = document.getElementById(`${idPrefix}Svg`);
  if (!svg || entries.length < 2) return;
  const crosshair = document.getElementById(`${idPrefix}Crosshair`);
  const container = svg.closest('.chart-wrap');
  let tooltip = container.querySelector('.tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.display = 'none';
    container.appendChild(tooltip);
  }
  const dots = [...svg.querySelectorAll('.dot')];

  function nearestIndex(clientX) {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const relX = ((clientX - rect.left) / rect.width) * vb.width;
    let nearest = 0,
      best = Infinity;
    dots.forEach((d, i) => {
      const cx = parseFloat(d.getAttribute('cx'));
      const dist = Math.abs(cx - relX);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    return nearest;
  }

  function handleMove(evt) {
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const idx = nearestIndex(clientX);
    const dot = dots[idx];
    const cx = dot.getAttribute('cx'),
      cy = dot.getAttribute('cy');
    crosshair.setAttribute('x1', cx);
    crosshair.setAttribute('x2', cx);
    crosshair.style.opacity = 1;
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const containerRect = container.getBoundingClientRect();
    const px = rect.left + (cx / vb.width) * rect.width - containerRect.left;
    const py = rect.top + (cy / vb.height) * rect.height - containerRect.top;
    tooltip.style.display = 'block';
    tooltip.style.left = px + 'px';
    tooltip.style.top = py + 'px';
    const e = entries[idx];
    tooltip.textContent = `${e.date}: ${e[valueKey]}${unitSuffix}`;
  }

  svg.addEventListener('pointermove', handleMove);
  svg.addEventListener('pointerleave', () => {
    tooltip.style.display = 'none';
    crosshair.style.opacity = 0;
  });
}

function maxWeightEver(name) {
  let max = 0;
  state.workoutLog.forEach((s) => {
    if (!s.exercises) return;
    s.exercises.forEach((ex) => {
      if (ex.name !== name) return;
      ex.sets.forEach((set) => {
        if (set.weight && set.weight > max) max = set.weight;
      });
    });
  });
  return max;
}

function loggedExerciseNames() {
  const names = new Set();
  state.workoutLog.forEach((s) => {
    if (s.exercises) s.exercises.forEach((e) => names.add(e.name));
  });
  return [...names].sort();
}

function exerciseHistorySeries(name) {
  const points = [];
  state.workoutLog.forEach((s) => {
    if (!s.exercises) return;
    const ex = s.exercises.find((e) => e.name === name);
    if (!ex) return;
    const maxW = Math.max(0, ...ex.sets.map((set) => set.weight || 0));
    if (maxW > 0) points.push({ date: s.date, weightKg: maxW });
  });
  return points;
}

let activeExerciseChart = null;

function prHistoryHtml() {
  if (!state.prLog.length) return '<p class="empty-state">No PRs yet — keep logging, your first one is coming.</p>';
  return [...state.prLog]
    .reverse()
    .slice(0, 8)
    .map((pr) => `<div class="log-entry"><span>🏆 ${escapeHtml(pr.exercise)}</span><span class="tiny">${pr.weight} kg · ${pr.date}</span></div>`)
    .join('');
}

function measurementSummaryHtml() {
  if (!state.measurementLog.length) return '<p class="empty-state" style="margin-top:8px;">No measurements logged yet.</p>';
  const first = state.measurementLog[0];
  const last = state.measurementLog[state.measurementLog.length - 1];
  const fields = ['chest', 'arm', 'waist', 'thigh'];
  const rows = fields
    .filter((f) => last[f] != null)
    .map((f) => {
      const change = first[f] != null ? (last[f] - first[f]).toFixed(1) : null;
      const label = f.charAt(0).toUpperCase() + f.slice(1);
      return `<div class="log-entry"><span>${label}</span><span class="tiny">${last[f]} cm${change !== null && Number(change) !== 0 ? ` (${change > 0 ? '+' : ''}${change} since ${first.date})` : ''}</span></div>`;
    })
    .join('');
  return `<div style="margin-top:6px;">${rows}</div>`;
}

function renderProgress() {
  const entries = [...state.weightLog].sort((a, b) => a.date.localeCompare(b.date));
  const chartHtml =
    entries.length >= 2
      ? `<div class="chart-wrap" style="position:relative;">${buildLineChartSVG(entries, 'weightChart')}</div>`
      : '<p class="empty-state">Log your weight a few times to see a trend line.</p>';
  const first = entries[0],
    last = entries[entries.length - 1];
  const change = first && last && first !== last ? (last.weightKg - first.weightKg).toFixed(1) : null;
  const weekCount = state.workoutLog.filter((s) => isThisWeek(s.date)).length;

  const exNames = loggedExerciseNames();
  const selectedExercise = activeExerciseChart && exNames.includes(activeExerciseChart) ? activeExerciseChart : exNames[0];
  let liftChartHtml = '<p class="empty-state">Log a lift a couple of times to see its strength curve.</p>';
  if (selectedExercise) {
    const liftEntries = exerciseHistorySeries(selectedExercise);
    liftChartHtml =
      liftEntries.length >= 2
        ? `<div class="chart-wrap" style="position:relative;">${buildLineChartSVG(liftEntries, 'exerciseChart')}</div>`
        : '<p class="empty-state">Log this lift again to see a trend line.</p>';
  }

  return `
    <div class="card">
      <h3>Log today's weight</h3>
      <form id="weightLogForm" class="row" style="gap:8px;">
        <input type="number" step="0.1" name="weightKg" placeholder="kg" value="${latestWeight() || ''}" style="flex:1;" required />
        <button type="submit" class="btn-primary" style="width:auto;">Log</button>
      </form>
    </div>
    <div class="card">
      <h3>Weight trend</h3>
      ${chartHtml}
      ${change !== null ? `<p class="tiny">${change > 0 ? '+' : ''}${change} kg since ${first.date}</p>` : ''}
    </div>
    <div class="card">
      <h3>Strength progress</h3>
      ${
        exNames.length
          ? `<select id="exerciseChartPicker">${exNames.map((n) => `<option value="${escapeHtml(n)}" ${n === selectedExercise ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('')}</select>`
          : ''
      }
      <div style="margin-top:8px;">${liftChartHtml}</div>
      <p class="tiny">Heaviest weight logged per session, for the picked exercise.</p>
    </div>
    <div class="card">
      <h3>Personal records</h3>
      ${prHistoryHtml()}
    </div>
    <div class="card">
      <h3>Body measurements (cm)</h3>
      <form id="measurementForm">
        <div class="grid2">
          <label>Chest<input type="number" step="0.1" name="chest" placeholder="cm" /></label>
          <label>Arm<input type="number" step="0.1" name="arm" placeholder="cm" /></label>
        </div>
        <div class="grid2">
          <label>Waist<input type="number" step="0.1" name="waist" placeholder="cm" /></label>
          <label>Thigh<input type="number" step="0.1" name="thigh" placeholder="cm" /></label>
        </div>
        <button type="submit" class="btn-secondary btn-block">Log measurements</button>
      </form>
      ${measurementSummaryHtml()}
    </div>
    <div class="card">
      <h3>Consistency</h3>
      <p style="margin:0 0 4px;">${weekCount} / 6 scheduled sessions logged this week</p>
      <p class="tiny" style="margin:0;">${state.workoutLog.length} total sessions logged all-time</p>
    </div>
  `;
}

function logMeasurements(fields) {
  const date = todayStr();
  const existingIdx = state.measurementLog.findIndex((m) => m.date === date);
  if (existingIdx >= 0) state.measurementLog[existingIdx] = { ...state.measurementLog[existingIdx], date, ...fields };
  else state.measurementLog.push({ date, ...fields });
  state.measurementLog.sort((a, b) => a.date.localeCompare(b.date));
  saveState();
  toast('Measurements logged');
  render();
}

function logWeight(weightKg) {
  if (!weightKg || weightKg <= 0) return;
  const date = todayStr();
  const existing = state.weightLog.find((w) => w.date === date);
  if (existing) existing.weightKg = weightKg;
  else state.weightLog.push({ date, weightKg });
  state.weightLog.sort((a, b) => a.date.localeCompare(b.date));
  state.profile.weightKg = weightKg;
  saveState();
  toast('Weight logged');
  render();
}

/* ---------------- Rendering: Settings ---------------- */

function renderSettings() {
  const p = state.profile;
  return `
    <div class="card">
      <h3>Your profile</h3>
      <form id="settingsForm">
        <label>Name<input type="text" name="name" value="${escapeHtml(p.name)}" required /></label>
        <div class="grid2">
          <label>Sex<select name="sex">
            <option value="male" ${p.sex === 'male' ? 'selected' : ''}>Male</option>
            <option value="female" ${p.sex === 'female' ? 'selected' : ''}>Female</option>
            <option value="other" ${p.sex === 'other' ? 'selected' : ''}>Other</option>
          </select></label>
          <label>Age<input type="number" name="age" value="${p.age}" required /></label>
        </div>
        <div class="grid2">
          <label>Height (cm)<input type="number" name="heightCm" value="${p.heightCm}" required /></label>
          <label>Weight (kg)<input type="number" step="0.1" name="weightKg" value="${p.weightKg}" required /></label>
        </div>
        <label>Activity level<select name="activityLevel">
          ${['sedentary', 'light', 'moderate', 'active'].map((v) => `<option value="${v}" ${p.activityLevel === v ? 'selected' : ''}>${v}</option>`).join('')}
        </select></label>
        <label>Goal<select name="goal">
          ${Object.entries(GOAL_LABELS).map(([v, l]) => `<option value="${v}" ${p.goal === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select></label>
        <label>Diet<select name="diet">
          ${Object.entries(DIET_LABELS).map(([v, l]) => `<option value="${v}" ${p.diet === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select></label>
        <label>Experience<select name="experience">
          ${['beginner', 'intermediate', 'advanced'].map((v) => `<option value="${v}" ${p.experience === v ? 'selected' : ''}>${v}</option>`).join('')}
        </select></label>
        <p class="tiny">Weekly split (fixed): Mon Chest · Tue Back · Wed Shoulders · Thu Arms · Fri Cardio · Sat Legs · Sun Rest.</p>
        <button type="submit" class="btn-primary">Save changes</button>
      </form>
    </div>
    <div class="card">
      <h3>AI Assistant</h3>
      <div class="chip-row">
        <button type="button" class="chip ${state.aiMode !== 'local' ? 'active' : ''}" data-action="set-ai-mode" data-mode="gemini">☁️ Gemini (needs free key)</button>
        <button type="button" class="chip ${state.aiMode === 'local' ? 'active' : ''}" data-action="set-ai-mode" data-mode="local">📱 On-device (no sign-up)</button>
      </div>
      ${
        state.aiMode === 'local'
          ? `<p class="tiny" style="margin-top:8px;">Runs a small AI model directly in your phone's browser — completely free, no account ever. Downloads once (~600-900MB) then works offline. It's weaker than Gemini and needs a browser with WebGPU (recent Chrome on Android; often unavailable on older phones or iOS Safari). It reliably handles simple commands — log weight, change goal/experience/diet, log cardio minutes, switch screens — plus general chat, but for logging specific foods with accurate macros, Gemini does much better.</p>`
          : `<p class="tiny" style="margin-top:8px;">Free via Google's Gemini API. Get a free key at <b>aistudio.google.com/apikey</b> (sign in, then copy the key shown or tap "Create API key" — no credit card needed), paste it below, then tap the chat bubble on any screen. It's stored only on this device and sent only to Google when you actually send a message — never anywhere else.</p>
      <form id="aiKeyForm">
        <input type="password" name="geminiKey" placeholder="Paste your Gemini API key" value="${escapeHtml(getGeminiKey())}" />
        <button type="submit" class="btn-secondary btn-block" style="margin-top:8px;">Save key</button>
      </form>
      ${getGeminiKey() ? '<p class="tiny" style="margin-top:8px;">Key saved — the assistant is ready.</p>' : ''}`
      }
      ${Object.keys(state.exerciseOverrides).length ? '<button class="btn-secondary btn-block" style="margin-top:8px;" data-action="clear-overrides">Clear AI exercise swaps</button>' : ''}
    </div>
    <div class="card">
      <h3>Your data</h3>
      <p class="tiny">Everything is stored only on this device (browser local storage). Nothing is sent anywhere.</p>
      <button class="btn-secondary btn-block" data-action="export-data" style="margin-bottom:8px;">Export backup (JSON)</button>
      <label>Import backup
        <input type="file" id="importFile" accept="application/json" />
      </label>
      <button class="btn-danger btn-block" data-action="reset-data">Reset all data</button>
    </div>
    <div class="card">
      <h3>Install on your phone</h3>
      <p class="tiny">Open this page in your phone's browser, then: Safari — Share → Add to Home Screen. Chrome — menu (⋮) → Add to Home Screen / Install app. You'll get an app icon that opens full-screen and keeps working offline.</p>
    </div>
  `;
}

function saveSettingsForm(form) {
  const fd = new FormData(form);
  state.profile = {
    ...state.profile,
    name: fd.get('name').trim(),
    sex: fd.get('sex'),
    age: Number(fd.get('age')),
    heightCm: Number(fd.get('heightCm')),
    weightKg: Number(fd.get('weightKg')),
    activityLevel: fd.get('activityLevel'),
    goal: fd.get('goal'),
    diet: fd.get('diet'),
    experience: fd.get('experience'),
  };
  saveState();
  toast('Saved');
  render();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fittrainer-backup-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  state.lastBackupAt = todayStr();
  saveState();
}

function resetData() {
  if (!confirm('This deletes all your logged data on this device. Continue?')) return;
  localStorage.removeItem(STORE_KEY);
  state = defaultState();
  currentTab = 'dashboard';
  document.getElementById('onboardingOverlay').classList.remove('hidden');
}

/* ---------------- AI Assistant ----------------
   Bring-your-own-key: the free Gemini API is the only way to get a real model
   into a static, no-backend, no-cost page. The key lives only in this device's
   localStorage and is sent only to Google, directly from the browser, when the
   user sends a chat message. The model can act on the app via function calling
   instead of just talking about it — each tool below maps to a real state
   mutation the app already exposes through its own UI. */

const GEMINI_KEY_STORAGE = 'fittrainer_gemini_key';
const GEMINI_MODEL = 'gemini-3.8-flash';

function getGeminiKey() {
  return localStorage.getItem(GEMINI_KEY_STORAGE) || '';
}

function setGeminiKey(key) {
  if (key) localStorage.setItem(GEMINI_KEY_STORAGE, key);
  else localStorage.removeItem(GEMINI_KEY_STORAGE);
}

/* Gemini's REST API moved to the "Interactions" shape (POST /v1beta/interactions)
   sometime after early 2026: tool declarations are flat {type:'function', name,
   description, parameters} objects using standard lowercase JSON-Schema types,
   not the old {functionDeclarations:[...]} wrapper with uppercase STRING/NUMBER/
   OBJECT enums. Confirmed against ai.google.dev's current docs 2026-09-28. */
const AI_TOOLS = [
  {
    type: 'function',
    name: 'update_profile',
    description: "Update the user's profile: body weight, height, age, sex, activity level, fitness goal, diet preference, or gym experience level. Only include fields the user actually wants changed.",
    parameters: {
      type: 'object',
      properties: {
        weightKg: { type: 'number', description: 'Body weight in kg' },
        heightCm: { type: 'number' },
        age: { type: 'number' },
        sex: { type: 'string', enum: ['male', 'female', 'other'] },
        activityLevel: { type: 'string', enum: ['sedentary', 'light', 'moderate', 'active'] },
        goal: { type: 'string', enum: ['fat_loss', 'muscle_gain', 'general'] },
        diet: { type: 'string', enum: ['vegetarian', 'eggetarian', 'non_veg', 'vegan'] },
        experience: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
      },
    },
  },
  {
    type: 'function',
    name: 'log_weight',
    description: "Log the user's body weight for today.",
    parameters: { type: 'object', properties: { weightKg: { type: 'number' } }, required: ['weightKg'] },
  },
  {
    type: 'function',
    name: 'add_food',
    description: "Add a food entry to today's diet log. Estimate reasonable nutrition values yourself (Indian home cooking, e.g. dal/chawal/roti/egg style) if the user doesn't give exact numbers.",
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        cal: { type: 'number', description: 'Calories for one serving' },
        protein: { type: 'number', description: 'Grams of protein for one serving' },
        carbs: { type: 'number', description: 'Grams of carbs for one serving' },
        fat: { type: 'number', description: 'Grams of fat for one serving' },
        qty: { type: 'number', description: 'How many servings, defaults to 1' },
      },
      required: ['name', 'cal', 'protein', 'carbs', 'fat'],
    },
  },
  {
    type: 'function',
    name: 'remove_last_food',
    description: "Remove a food entry from today's diet log — the most recent one, or a named one if the user specifies it.",
    parameters: { type: 'object', properties: { name: { type: 'string' } } },
  },
  {
    type: 'function',
    name: 'log_cardio_minutes',
    description: 'Log minutes of cardio the user did today.',
    parameters: { type: 'object', properties: { minutes: { type: 'number' } }, required: ['minutes'] },
  },
  {
    type: 'function',
    name: 'replace_exercise',
    description: "Swap one exercise in the user's weekly workout plan for a different one, for a given muscle-group day. Applies to their current experience level.",
    parameters: {
      type: 'object',
      properties: {
        muscle: { type: 'string', enum: ['chest', 'back', 'shoulders', 'arms', 'legs'] },
        originalName: { type: 'string', description: 'The exact existing exercise name to replace' },
        newName: { type: 'string' },
        sets: { type: 'number' },
        reps: { type: 'string', description: 'e.g. "10-12" or "8"' },
      },
      required: ['muscle', 'originalName', 'newName'],
    },
  },
  {
    type: 'function',
    name: 'navigate',
    description: 'Switch the app to a different screen.',
    parameters: {
      type: 'object',
      properties: { tab: { type: 'string', enum: ['dashboard', 'workout', 'diet', 'progress', 'settings'] } },
      required: ['tab'],
    },
  },
];

function toolUpdateProfile(fields) {
  const numeric = ['weightKg', 'heightCm', 'age'];
  const allowed = ['weightKg', 'heightCm', 'age', 'sex', 'activityLevel', 'goal', 'diet', 'experience'];
  const changed = [];
  allowed.forEach((k) => {
    if (fields[k] === undefined || fields[k] === null || fields[k] === '') return;
    state.profile[k] = numeric.includes(k) ? Number(fields[k]) : fields[k];
    changed.push(k);
  });
  if (!changed.length) return "I didn't see a profile field to change there.";
  saveState();
  render();
  return `Updated your ${changed.join(', ')}.`;
}

function toolLogWeight({ weightKg }) {
  if (!weightKg) return 'I need a weight in kg to log.';
  logWeight(Number(weightKg));
  return `Logged today's weight as ${weightKg} kg.`;
}

function toolAddFood({ name, cal, protein, carbs, fat, qty }) {
  if (!name) return "I need a food name to log.";
  const item = { name, cal: Number(cal) || 0, protein: Number(protein) || 0, carbs: Number(carbs) || 0, fat: Number(fat) || 0 };
  const count = qty && qty > 0 ? Math.round(qty) : 1;
  for (let i = 0; i < count; i++) addFoodEntry(item);
  return `Added ${name}${count > 1 ? ' × ' + count : ''} to today's diet log.`;
}

function toolRemoveLastFood({ name }) {
  const list = state.dietLog[todayStr()] || [];
  if (!list.length) return "There's nothing logged today to remove.";
  let idx = list.length - 1;
  if (name) {
    const found = list.findIndex((e) => e.name.toLowerCase().includes(String(name).toLowerCase()));
    if (found === -1) return `I couldn't find "${name}" in today's log.`;
    idx = found;
  }
  const entryName = list[idx].name;
  removeFoodEntry(idx);
  return `Removed one ${entryName} from today's log.`;
}

function toolLogCardio({ minutes }) {
  if (!minutes) return 'I need a number of minutes to log.';
  state.workoutLog.push({
    date: todayStr(),
    weekday: todayWeekday(),
    muscle: 'cardio',
    activities: [{ activity: 'Cardio (via assistant)', minutes: Number(minutes) }],
  });
  saveState();
  render();
  return `Logged ${minutes} minutes of cardio for today.`;
}

function toolReplaceExercise({ muscle, originalName, newName, sets, reps }) {
  const experience = state.profile.experience;
  const base = STRENGTH_TEMPLATES[muscle] && STRENGTH_TEMPLATES[muscle][experience];
  if (!base) return `I couldn't find a ${muscle} plan to edit.`;
  const current = getStrengthTemplate(muscle, experience);
  const matchIdx = current.findIndex((ex) => ex.name.toLowerCase() === String(originalName).toLowerCase());
  if (matchIdx === -1) return `I couldn't find "${originalName}" on your ${MUSCLE_LABELS[muscle]} day.`;
  const original = current[matchIdx];
  const baseName = base[matchIdx].name; // getStrengthTemplate preserves index order, so this is the un-overridden slot name
  if (!state.exerciseOverrides[muscle]) state.exerciseOverrides[muscle] = {};
  if (!state.exerciseOverrides[muscle][experience]) state.exerciseOverrides[muscle][experience] = {};
  state.exerciseOverrides[muscle][experience][baseName] = {
    name: newName,
    sets: sets ? Number(sets) : original.sets,
    reps: reps || original.reps,
    pattern: inferPattern(newName),
    cue: original.cue,
  };
  saveState();
  render();
  return `Swapped ${original.name} for ${newName} on your ${MUSCLE_LABELS[muscle]} day.`;
}

function toolNavigate({ tab }) {
  const valid = ['dashboard', 'workout', 'diet', 'progress', 'settings'];
  if (!valid.includes(tab)) return "I don't know that screen.";
  currentTab = tab;
  render();
  return `Switched to ${tab}.`;
}

const AI_TOOL_HANDLERS = {
  update_profile: toolUpdateProfile,
  log_weight: toolLogWeight,
  add_food: toolAddFood,
  remove_last_food: toolRemoveLastFood,
  log_cardio_minutes: toolLogCardio,
  replace_exercise: toolReplaceExercise,
  navigate: toolNavigate,
};

function aiSystemInstruction() {
  const p = state.profile;
  const wd = todayWeekday();
  const muscle = WEEKDAY_MUSCLE[wd];
  return `You are the in-app assistant for FitTrainer, a personal workout and diet tracker.
Current profile: ${JSON.stringify(p)}.
Today is ${WEEKDAY_LABELS[wd]}, so today's scheduled focus is ${MUSCLE_LABELS[muscle]}.
Call one of the provided functions whenever the user clearly asks to change a setting, log food/weight/cardio, or swap an exercise.
If the user is just asking a question (form tips, how many sets, general advice), answer briefly in plain text and do not call a function.
Keep replies short, friendly, and conversational — a sentence or two.`;
}

async function callAssistant(userText, history) {
  const apiKey = getGeminiKey();
  if (!apiKey) {
    return { text: 'Add a free Gemini API key in Settings → AI Assistant to turn this on.' };
  }
  const body = {
    model: GEMINI_MODEL,
    system_instruction: aiSystemInstruction(),
    input: [...history, { type: 'user_input', content: userText }],
    tools: AI_TOOLS,
    store: false,
  };
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 180)}`);
  }
  const data = await res.json();
  const steps = data.steps || [];
  const results = [];
  for (const step of steps) {
    if (step.type !== 'function_call') continue;
    const handler = AI_TOOL_HANDLERS[step.name];
    if (!handler) continue;
    try {
      results.push(handler(step.arguments || {}));
    } catch (err) {
      results.push('Something went wrong making that change.');
    }
  }
  return { text: results.length ? results.join(' ') : data.output_text || 'Done.' };
}

/* ---------------- On-device AI (zero sign-up, runs in the browser) ----------------
   No account, no key, genuinely free forever — the trade-off is a much weaker
   model and a large one-time download, and it needs WebGPU (recent Chrome on
   Android; often unavailable on older phones or iOS Safari).

   WebLLM's native function-calling is explicitly work-in-progress upstream, so
   rather than depend on a small local model reliably emitting structured tool
   calls, the handful of clearly-phrased commands below are matched with plain
   regex and run the exact same tool handlers Gemini mode uses — deterministic,
   so they work every time regardless of model quality. Anything else (especially
   free-form food logging, which needs real language understanding to estimate
   macros) falls through to the small model as plain conversation, with an honest
   nudge toward the Gemini option for that case. */

const LOCAL_MODEL_ID = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';
const LOCAL_AI_SYSTEM_PROMPT =
  'You are a friendly fitness assistant inside the FitTrainer app. Give short, practical answers about workouts, diet, and fitness in 2-3 sentences.';

let localEngine = null;

function tryLocalCommand(text) {
  const t = text.toLowerCase().trim();
  let m;
  if ((m = t.match(/(?:log|set) (?:my )?weight (?:as|to|=)?\s*(\d+(?:\.\d+)?)/))) {
    return toolLogWeight({ weightKg: Number(m[1]) });
  }
  if ((m = t.match(/(?:change|set) my goal to (fat loss|muscle gain|general fitness|general)/))) {
    const map = { 'fat loss': 'fat_loss', 'muscle gain': 'muscle_gain', general: 'general', 'general fitness': 'general' };
    return toolUpdateProfile({ goal: map[m[1]] });
  }
  if ((m = t.match(/(?:change|set) my (?:experience|level) to (beginner|intermediate|advanced)/))) {
    return toolUpdateProfile({ experience: m[1] });
  }
  if ((m = t.match(/(?:change|set) my diet to (vegetarian|eggetarian|non-?\s?veg(?:etarian)?|vegan)/))) {
    const map = { vegetarian: 'vegetarian', eggetarian: 'eggetarian', vegan: 'vegan' };
    return toolUpdateProfile({ diet: map[m[1]] || 'non_veg' });
  }
  if ((m = t.match(/log (\d+) min(?:ute)?s? (?:of )?cardio/))) {
    return toolLogCardio({ minutes: Number(m[1]) });
  }
  if ((m = t.match(/(?:go to|open|switch to|take me to) (dashboard|home|workout|diet|progress|settings)/))) {
    return toolNavigate({ tab: m[1] === 'home' ? 'dashboard' : m[1] });
  }
  return null;
}

async function ensureLocalEngine() {
  if (localEngine) return localEngine;
  const webllm = await import('https://esm.run/@mlc-ai/web-llm');
  localEngine = await webllm.CreateMLCEngine(LOCAL_MODEL_ID, {
    initProgressCallback: (report) => {
      const pending = document.querySelector('.ai-msg.pending');
      if (pending) pending.textContent = report.text || 'Loading on-device AI…';
    },
  });
  return localEngine;
}

async function callLocalAssistant(userText, history) {
  const localResult = tryLocalCommand(userText);
  if (localResult) return { text: localResult };
  if (!navigator.gpu) {
    return {
      text: "This phone/browser doesn't support on-device AI (it needs WebGPU). Try Chrome on a recent Android phone, or switch to the Gemini option in Settings.",
    };
  }
  if (!localEngine) {
    const proceed = confirm('This downloads a small AI model (~600-900MB) to your phone once, then works fully offline with no sign-up. Continue?');
    if (!proceed) {
      return { text: 'No problem — try again anytime, or switch to the free Gemini option in Settings.' };
    }
  }
  const engine = await ensureLocalEngine();
  const historyMsgs = history.slice(-6).map((h) => ({ role: h.type === 'user_input' ? 'user' : 'assistant', content: h.content }));
  const messages = [{ role: 'system', content: LOCAL_AI_SYSTEM_PROMPT }, ...historyMsgs, { role: 'user', content: userText }];
  const response = await engine.chat.completions.create({ messages, temperature: 0.7, max_tokens: 200 });
  const reply = (response.choices[0] && response.choices[0].message.content) || "Sorry, I didn't catch that — try rephrasing?";
  return { text: reply };
}

let aiHistory = [];

function localProactiveInsight() {
  const deload = deloadSignal();
  if (deload) {
    return `Hey! I noticed your last ${MUSCLE_LABELS[deload.muscle]} session dropped ${deload.drop}% in volume vs the one before — want to talk through easing off this week?`;
  }
  const readiness = todaysReadiness();
  if (readiness && readiness.score === 1) {
    return "Saw you're feeling low energy today — want me to lighten today's targets a bit?";
  }
  if (state.prLog.length) {
    const lastPr = state.prLog[state.prLog.length - 1];
    if (isThisWeek(lastPr.date)) {
      return `Nice PR this week on ${lastPr.exercise} (${lastPr.weight}kg)! What's next?`;
    }
  }
  return `Hey ${state.profile.name}! Ask me to change a setting, log something, swap an exercise, or just ask a fitness question.`;
}

function openAiSheet() {
  if (!state.profile) return;
  document.getElementById('aiOverlay').classList.remove('hidden');
  const container = document.getElementById('aiMessages');
  if (!container.children.length) {
    const greeting = localProactiveInsight();
    appendAiMessage('assistant', greeting);
    aiHistory.push({ type: 'model_output', content: greeting });
  }
  document.getElementById('aiInput').focus();
}

function appendAiMessage(role, text) {
  const el = document.createElement('div');
  el.className = `ai-msg ${role === 'user' ? 'user' : 'assistant'}`;
  el.textContent = text;
  const container = document.getElementById('aiMessages');
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return el;
}

async function handleAiSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  appendAiMessage('user', text);
  const pending = appendAiMessage('assistant', 'Thinking…');
  pending.classList.add('pending');
  try {
    const caller = state.aiMode === 'local' ? callLocalAssistant : callAssistant;
    const { text: reply } = await caller(text, aiHistory);
    pending.textContent = reply;
    pending.classList.remove('pending');
    aiHistory.push({ type: 'user_input', content: text });
    aiHistory.push({ type: 'model_output', content: reply });
    if (aiHistory.length > 20) aiHistory = aiHistory.slice(-20);
  } catch (err) {
    pending.textContent = `Couldn't reach the AI: ${err.message}`;
    pending.classList.remove('pending');
  }
}

/* ---------------- Main render dispatcher ---------------- */

function render() {
  const app = document.getElementById('app');
  if (currentTab === 'dashboard') {
    app.innerHTML = renderDashboard();
  } else if (currentTab === 'workout') {
    app.innerHTML = renderWorkout();
  } else if (currentTab === 'diet') {
    app.innerHTML = renderDiet();
    wireLineChart(proteinTrendSeries(14), 'proteinChart', 'protein', 'g');
  } else if (currentTab === 'progress') {
    app.innerHTML = renderProgress();
    const entries = [...state.weightLog].sort((a, b) => a.date.localeCompare(b.date));
    wireLineChart(entries, 'weightChart');
    const exNames = loggedExerciseNames();
    const selectedExercise = activeExerciseChart && exNames.includes(activeExerciseChart) ? activeExerciseChart : exNames[0];
    if (selectedExercise) wireLineChart(exerciseHistorySeries(selectedExercise), 'exerciseChart');
  } else if (currentTab === 'settings') {
    app.innerHTML = renderSettings();
  }
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === currentTab));
  document.getElementById('streakPill').textContent = `🔥 ${calcStreak()} day streak`;
}

/* ---------------- Event delegation ---------------- */

function handleAppClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  if (action === 'go-workout') {
    currentTab = 'workout';
    render();
  } else if (action === 'pick-weekday') {
    state.activeWeekday = btn.dataset.weekday;
    render();
  } else if (action === 'save-workout') {
    saveWorkout(btn.dataset.weekday, btn.dataset.muscle);
  } else if (action === 'save-cardio') {
    saveCardio(btn.dataset.weekday);
  } else if (action === 'add-food') {
    addFoodByName(btn.dataset.name);
  } else if (action === 'remove-food') {
    removeFoodEntry(Number(btn.dataset.i));
  } else if (action === 'toggle-custom') {
    document.getElementById('customFoodForm').classList.toggle('hidden');
  } else if (action === 'export-data') {
    exportData();
  } else if (action === 'reset-data') {
    resetData();
  } else if (action === 'add-extra-exercise') {
    addExtraExerciseBlock();
  } else if (action === 'remove-extra') {
    const block = btn.closest('[data-extra-block]');
    if (block) block.remove();
  } else if (action === 'swap-exercise') {
    const muscle = btn.dataset.muscle;
    const idx = Number(btn.dataset.idx);
    const alternates = alternateExercisesFor(muscle, btn.dataset.name);
    if (!alternates.length) {
      toast('No alternate exercise available for this slot');
    } else {
      const next = alternates[Math.floor(Math.random() * alternates.length)];
      sessionSwaps[`${muscle}:${idx}`] = next;
      toast(`Swapped in ${next.name} for today`);
      render();
    }
  } else if (action === 'set-ai-mode') {
    state.aiMode = btn.dataset.mode;
    saveState();
    render();
  } else if (action === 'clear-overrides') {
    state.exerciseOverrides = {};
    saveState();
    toast('Exercise swaps cleared');
    render();
  } else if (action === 'delete-workout') {
    if (!confirm('Delete this logged session?')) return;
    state.workoutLog.splice(Number(btn.dataset.i), 1);
    saveState();
    toast('Session deleted');
    render();
  } else if (action === 'start-rest') {
    startRestTimer(90);
  } else if (action === 'add-water') {
    addWater(Number(btn.dataset.ml));
  } else if (action === 'voice-log') {
    startVoiceLog(Number(btn.dataset.ex));
  } else if (action === 'log-readiness') {
    logReadiness(Number(btn.dataset.score));
  } else if (action === 'log-meal-slot') {
    addFoodEntry({
      name: `${btn.dataset.slot} (plan)`,
      cal: Number(btn.dataset.cal) || 0,
      protein: Number(btn.dataset.protein) || 0,
      carbs: Number(btn.dataset.carbs) || 0,
      fat: Number(btn.dataset.fat) || 0,
    });
    toast(`Logged ${btn.dataset.slot}`);
  }
}

function handleAppInput(e) {
  if (e.target.id === 'foodSearch') {
    document.getElementById('foodResults').innerHTML = foodResultsHtml(e.target.value);
  }
}

function handleAppSubmit(e) {
  if (e.target.id === 'customFoodForm') {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name').trim();
    if (!name) return;
    addFoodEntry({
      name,
      cal: Number(fd.get('cal')) || 0,
      protein: Number(fd.get('protein')) || 0,
      carbs: Number(fd.get('carbs')) || 0,
      fat: Number(fd.get('fat')) || 0,
    });
  } else if (e.target.id === 'weightLogForm') {
    e.preventDefault();
    const fd = new FormData(e.target);
    logWeight(Number(fd.get('weightKg')));
  } else if (e.target.id === 'settingsForm') {
    e.preventDefault();
    saveSettingsForm(e.target);
  } else if (e.target.id === 'aiKeyForm') {
    e.preventDefault();
    const fd = new FormData(e.target);
    setGeminiKey(fd.get('geminiKey').trim());
    toast('Saved');
    render();
  } else if (e.target.id === 'measurementForm') {
    e.preventDefault();
    const fd = new FormData(e.target);
    const fields = {};
    ['chest', 'arm', 'waist', 'thigh'].forEach((k) => {
      const v = fd.get(k);
      if (v) fields[k] = Number(v);
    });
    if (Object.keys(fields).length) logMeasurements(fields);
  }
}

function handleAppChange(e) {
  if (e.target.id === 'exerciseChartPicker') {
    activeExerciseChart = e.target.value;
    render();
  } else if (e.target.id === 'importFile') {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!imported.profile) throw new Error('missing profile');
        state = { ...defaultState(), ...imported };
        saveState();
        toast('Data imported');
        render();
      } catch (err) {
        toast('Invalid backup file');
      }
    };
    reader.readAsText(file);
  }
}

function handleOnboardingSubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  state.profile = {
    name: fd.get('name').trim() || 'there',
    sex: fd.get('sex'),
    age: Number(fd.get('age')),
    heightCm: Number(fd.get('heightCm')),
    weightKg: Number(fd.get('weightKg')),
    activityLevel: fd.get('activityLevel'),
    goal: fd.get('goal'),
    diet: fd.get('diet'),
    experience: fd.get('experience'),
  };
  state.weightLog.push({ date: todayStr(), weightKg: state.profile.weightKg });
  saveState();
  document.getElementById('onboardingOverlay').classList.add('hidden');
  currentTab = 'dashboard';
  render();
}

/* ---------------- Init ---------------- */

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  let refreshed = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshed) return;
    refreshed = true;
    window.location.reload();
  });
  navigator.serviceWorker.register('sw.js').then((reg) => reg.update()).catch(() => {});
}

function init() {
  const app = document.getElementById('app');
  app.addEventListener('click', handleAppClick);
  app.addEventListener('submit', handleAppSubmit);
  app.addEventListener('input', handleAppInput);
  app.addEventListener('change', handleAppChange);

  document.getElementById('tabbar').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    currentTab = btn.dataset.tab;
    render();
  });

  document.getElementById('onboardingForm').addEventListener('submit', handleOnboardingSubmit);

  document.getElementById('restTimer').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'rest-adjust') adjustRestTimer(Number(btn.dataset.delta));
    else if (btn.dataset.action === 'rest-stop') stopRestTimer();
  });

  document.getElementById('aiFab').addEventListener('click', openAiSheet);
  document.getElementById('aiCloseBtn').addEventListener('click', () => {
    document.getElementById('aiOverlay').classList.add('hidden');
  });
  document.getElementById('aiForm').addEventListener('submit', handleAiSubmit);

  if (!state.profile) {
    document.getElementById('onboardingOverlay').classList.remove('hidden');
  } else {
    render();
  }

  registerServiceWorker();
}

init();
