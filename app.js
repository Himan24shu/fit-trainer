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
      { name: 'Flat Dumbbell Bench Press', sets: 3, reps: '10-12', pattern: 'push', cue: 'Lower under control, press up without locking elbows hard.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', pattern: 'push', cue: 'Slight bench incline, press up and slightly inward.' },
      { name: 'Push-up', sets: 3, reps: 'to near-failure', pattern: 'push', cue: 'Straight body line, chest brushes the floor.' },
    ],
    intermediate: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', pattern: 'push', cue: 'Bar to mid-chest, drive feet into the floor.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', pattern: 'push', cue: 'Control the negative, full stretch at the bottom.' },
      { name: 'Cable Fly', sets: 3, reps: '12-15', pattern: 'push', cue: 'Slight elbow bend, squeeze hands together in front.' },
      { name: 'Bench Dips / Dips', sets: 3, reps: '10-12', pattern: 'push', cue: 'Elbows track back, don’t flare wide.' },
    ],
    advanced: [
      { name: 'Barbell Bench Press', sets: 5, reps: '5', pattern: 'push', cue: 'Heavy top set, tight upper back on the bench.' },
      { name: 'Incline Barbell/DB Press', sets: 4, reps: '8', pattern: 'push', cue: 'Same bar path every rep, no bounce.' },
      { name: 'Weighted Dips', sets: 4, reps: '8', pattern: 'push', cue: 'Add load once bodyweight dips feel easy.' },
      { name: 'Cable Fly', sets: 4, reps: '12-15', pattern: 'push', cue: 'Finish with a squeeze, control the stretch back.' },
      { name: 'Push-up Finisher', sets: 3, reps: 'to near-failure', pattern: 'push', cue: 'Burnout set after the heavy work is done.' },
    ],
  },
  back: {
    beginner: [
      { name: 'Lat Pulldown', sets: 3, reps: '10-12', pattern: 'vpull', cue: 'Pull to upper chest, squeeze shoulder blades together.' },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12', pattern: 'pull', cue: 'Drive elbows back, keep chest up.' },
      { name: 'Assisted Pull-up / Band Pulldown', sets: 3, reps: '8-10', pattern: 'vpull', cue: 'Full stretch at the top, chin over the bar at the bottom.' },
    ],
    intermediate: [
      { name: 'Barbell Row', sets: 4, reps: '8-10', pattern: 'pull', cue: 'Flat back, pull to the belly button.' },
      { name: 'Lat Pulldown', sets: 3, reps: '10-12', pattern: 'vpull', cue: 'Lead with the elbows, not the hands.' },
      { name: 'Single-arm Dumbbell Row', sets: 3, reps: '10-12 / side', pattern: 'pull', cue: 'Support on a bench, row straight up to the hip.' },
      { name: 'Face Pull', sets: 3, reps: '15', pattern: 'pull', cue: 'Pull to the face, thumbs point back at the top.' },
    ],
    advanced: [
      { name: 'Deadlift', sets: 5, reps: '5', pattern: 'hinge', cue: 'Hips and shoulders rise together, bar stays close to the shins.' },
      { name: 'Weighted Pull-up', sets: 4, reps: '6-8', pattern: 'vpull', cue: 'Dead hang start, chin clears the bar.' },
      { name: 'Pendlay Row', sets: 4, reps: '8', pattern: 'pull', cue: 'Bar rests on the floor between every rep.' },
      { name: 'Single-arm Dumbbell Row', sets: 3, reps: '10 / side', pattern: 'pull', cue: 'Add weight once form is locked in.' },
      { name: 'Face Pull', sets: 3, reps: '15', pattern: 'pull', cue: 'Light weight, high reps, pure rear-delt work.' },
    ],
  },
  shoulders: {
    beginner: [
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', pattern: 'vpress', cue: 'Press straight up, don’t flare elbows too wide.' },
      { name: 'Lateral Raise', sets: 3, reps: '12-15', pattern: 'raise', cue: 'Lead with the elbows, raise to shoulder height only.' },
      { name: 'Front Raise', sets: 3, reps: '12-15', pattern: 'raise', cue: 'Slight bend in the elbow, raise to eye level.' },
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
    ],
    intermediate: [
      { name: 'Barbell Curl', sets: 4, reps: '8-10', pattern: 'curl', cue: 'No swinging — let the biceps do the work.' },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', pattern: 'extension', cue: 'Lower to the forehead, elbows stay fixed.' },
      { name: 'Hammer Curl', sets: 3, reps: '10-12', pattern: 'curl', cue: 'Great for forearm size alongside biceps.' },
      { name: 'Triceps Pushdown', sets: 3, reps: '12-15', pattern: 'extension', cue: 'Full lockout at the bottom of every rep.' },
    ],
    advanced: [
      { name: 'Barbell Curl', sets: 4, reps: '8', pattern: 'curl', cue: 'Heaviest curl variation — prioritize control.' },
      { name: 'Close-Grip Bench Press', sets: 4, reps: '8', pattern: 'push', cue: 'Compound triceps builder, hands just inside shoulder width.' },
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

const FOOD_DB = [
  { name: 'Egg, whole (boiled)', unit: '1 egg', cal: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
  { name: 'Egg white', unit: '1', cal: 17, protein: 3.6, carbs: 0.2, fat: 0.1 },
  { name: 'Paneer', unit: '100g', cal: 265, protein: 18, carbs: 1.2, fat: 20 },
  { name: 'Tofu, firm', unit: '100g', cal: 76, protein: 8, carbs: 1.9, fat: 4.3 },
  { name: 'Milk, toned', unit: '250ml', cal: 120, protein: 6.5, carbs: 9.5, fat: 5 },
  { name: 'Curd / yogurt', unit: '100g', cal: 60, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: 'Greek yogurt', unit: '100g', cal: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Whey protein', unit: '1 scoop', cal: 120, protein: 24, carbs: 3, fat: 1.5 },
  { name: 'Roti / chapati', unit: '1', cal: 85, protein: 3, carbs: 15, fat: 1.5 },
  { name: 'Rice, cooked', unit: '1 cup', cal: 205, protein: 4.3, carbs: 45, fat: 0.4 },
  { name: 'Dal, cooked', unit: '1 cup', cal: 198, protein: 12, carbs: 30, fat: 4 },
  { name: 'Rajma / chole, cooked', unit: '1 cup', cal: 220, protein: 12, carbs: 35, fat: 3 },
  { name: 'Soya chunks (dry)', unit: '50g', cal: 173, protein: 26, carbs: 15, fat: 0.7 },
  { name: 'Peanut butter', unit: '1 tbsp', cal: 95, protein: 4, carbs: 3, fat: 8 },
  { name: 'Almonds', unit: '10 nuts', cal: 70, protein: 2.5, carbs: 2.5, fat: 6 },
  { name: 'Peanuts', unit: '30g', cal: 170, protein: 7, carbs: 6, fat: 14 },
  { name: 'Banana', unit: '1 medium', cal: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Apple', unit: '1 medium', cal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Oats (dry)', unit: '50g', cal: 190, protein: 6.7, carbs: 33, fat: 3.5 },
  { name: 'Poha, cooked', unit: '1 plate', cal: 270, protein: 5, carbs: 55, fat: 4 },
  { name: 'Idli', unit: '2 pieces', cal: 78, protein: 2.4, carbs: 16, fat: 0.4 },
  { name: 'Sambhar', unit: '1 cup', cal: 140, protein: 6, carbs: 20, fat: 4 },
  { name: 'Mixed veg sabzi', unit: '1 cup', cal: 120, protein: 3, carbs: 15, fat: 6 },
  { name: 'Sweet potato, boiled', unit: '100g', cal: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { name: 'Ghee', unit: '1 tsp', cal: 45, protein: 0, carbs: 0, fat: 5 },
];

const MEAL_TEMPLATES = {
  vegetarian: [
    ['Early morning', 'Soaked almonds + walnuts, water'],
    ['Breakfast', 'Paneer bhurji or besan chilla, 2 multigrain toast, milk'],
    ['Mid-morning', 'Greek yogurt or curd with fruit'],
    ['Lunch', '2 roti + rice, dal, paneer/soya curry, salad, curd'],
    ['Pre-workout', 'Banana + black coffee'],
    ['Post-workout', 'Whey protein shake or paneer + fruit'],
    ['Dinner', 'Tofu/paneer curry, roti or rice, sabzi, salad'],
    ['Before bed', 'Warm milk'],
  ],
  eggetarian: [
    ['Early morning', 'Soaked almonds + walnuts, water'],
    ['Breakfast', '3 whole eggs + 1 egg white omelette with veggies, 2 multigrain toast, milk'],
    ['Mid-morning', 'Greek yogurt or paneer bhurji, fruit'],
    ['Lunch', '2 roti + rice, dal, paneer/egg curry, salad, curd'],
    ['Pre-workout', 'Banana + black coffee'],
    ['Post-workout', 'Whey protein shake + fruit'],
    ['Dinner', 'Egg curry or paneer, roti or rice, sabzi, salad'],
    ['Before bed', 'Warm milk with a pinch of turmeric'],
  ],
  non_veg: [
    ['Early morning', 'Soaked almonds, water'],
    ['Breakfast', '3-4 whole eggs, 2 multigrain toast, milk'],
    ['Mid-morning', 'Greek yogurt, fruit'],
    ['Lunch', 'Rice/roti, dal, grilled chicken or fish curry, salad'],
    ['Pre-workout', 'Banana + black coffee'],
    ['Post-workout', 'Whey protein shake + fruit'],
    ['Dinner', 'Grilled chicken/fish/paneer, roti or rice, sabzi, salad'],
    ['Before bed', 'Warm milk or casein'],
  ],
  vegan: [
    ['Early morning', 'Soaked almonds + walnuts, water'],
    ['Breakfast', 'Tofu bhurji or oats with soy milk and peanut butter'],
    ['Mid-morning', 'Soy yogurt or roasted chickpeas, fruit'],
    ['Lunch', '2 roti + rice, dal, soya chunk/tofu curry, salad'],
    ['Pre-workout', 'Banana + black coffee'],
    ['Post-workout', 'Plant protein shake + fruit'],
    ['Dinner', 'Tofu/soya curry, roti or rice, sabzi, salad'],
    ['Before bed', 'Soy milk'],
  ],
};

/* ---------------- Exercise icons (original animated stick figures) ---------------- */

function exIconSVG(pattern) {
  const HEAD = '<circle class="ex-head" cx="50" cy="17" r="7"/>';
  const TORSO = '<line class="ex-body" x1="50" y1="24" x2="50" y2="60"/>';
  const LEGS = '<g class="ex-legs"><line class="ex-body" x1="50" y1="60" x2="41" y2="92"/><line class="ex-body" x1="50" y1="60" x2="59" y2="92"/></g>';
  const ARMS = '<g class="ex-arms"><line class="ex-body" x1="50" y1="28" x2="37" y2="50"/><line class="ex-body" x1="50" y1="28" x2="63" y2="50"/></g>';

  switch (pattern) {
    case 'push':
    case 'pull':
    case 'vpress':
    case 'vpull':
    case 'raise':
      return `<svg class="ex-icon anim-${pattern}" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}${ARMS}</svg>`;
    case 'squat':
      return `<svg class="ex-icon anim-squat" viewBox="0 0 100 100"><g class="ex-upper">${HEAD}${TORSO}${ARMS}</g>${LEGS}</svg>`;
    case 'hinge':
      return `<svg class="ex-icon anim-hinge" viewBox="0 0 100 100"><g class="ex-upper">${HEAD}${TORSO}${ARMS}</g>${LEGS}</svg>`;
    case 'curl':
    case 'extension':
      return `<svg class="ex-icon anim-${pattern}" viewBox="0 0 100 100">
        ${HEAD}${TORSO}${LEGS}
        <line class="ex-body" x1="50" y1="28" x2="36" y2="46"/>
        <line class="ex-body ex-forearm" x1="36" y1="46" x2="32" y2="62"/>
      </svg>`;
    case 'core':
      return `<svg class="ex-icon anim-core" viewBox="0 0 100 100">
        <g class="ex-figure">
          <circle class="ex-head" cx="20" cy="55" r="7"/>
          <line class="ex-body" x1="27" y1="55" x2="75" y2="58"/>
          <line class="ex-body" x1="25" y1="62" x2="25" y2="78"/>
          <line class="ex-body" x1="75" y1="58" x2="90" y2="75"/>
        </g>
      </svg>`;
    case 'cardio':
      return `<svg class="ex-icon anim-cardio" viewBox="0 0 100 100">
        <circle class="ex-head" cx="54" cy="20" r="7"/>
        <line class="ex-body" x1="50" y1="24" x2="54" y2="58"/>
        <line class="ex-body ex-leg-l" x1="52" y1="58" x2="40" y2="90"/>
        <line class="ex-body ex-leg-r" x1="52" y1="58" x2="64" y2="90"/>
        <line class="ex-body ex-arm-l" x1="54" y1="30" x2="40" y2="48"/>
        <line class="ex-body ex-arm-r" x1="54" y1="30" x2="68" y2="48"/>
      </svg>`;
    default:
      return `<svg class="ex-icon" viewBox="0 0 100 100">${HEAD}${TORSO}${LEGS}${ARMS}</svg>`;
  }
}

/* ---------------- State ---------------- */

function defaultState() {
  return { profile: null, weightLog: [], workoutLog: [], dietLog: {}, activeWeekday: null };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
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

function lastExercisePerformance(name) {
  for (let i = state.workoutLog.length - 1; i >= 0; i--) {
    const s = state.workoutLog[i];
    if (!s.exercises) continue;
    const ex = s.exercises.find((e) => e.name === name);
    if (ex) return ex.sets;
  }
  return null;
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

function meterRow(label, value, target, unit) {
  const pct = target > 0 ? Math.min((value / target) * 100, 100) : 0;
  const over = target > 0 && value > target * 1.1;
  return `
    <div style="margin-bottom:10px;">
      <div class="row"><span>${label}</span><span class="tiny">${Math.round(value)} / ${Math.round(target)} ${unit}</span></div>
      <div class="meter ${over ? 'over' : ''}"><span style="width:${pct}%"></span></div>
    </div>`;
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
    const list = STRENGTH_TEMPLATES[muscle][p.experience];
    workoutCard = `
      <div class="card">
        <div class="row"><h3 style="margin:0;">Today — ${MUSCLE_LABELS[muscle]}</h3><button class="btn-secondary" data-action="go-workout">Start</button></div>
        <ul style="padding-left:18px; margin:10px 0 0;">
          ${list.map((ex) => `<li>${escapeHtml(ex.name)} — ${ex.sets}×${ex.reps}</li>`).join('')}
        </ul>
      </div>`;
  }

  return `
    <div class="card">
      <h2 style="margin-bottom:4px;">Hi ${escapeHtml(p.name)} 👋</h2>
      <p class="muted" style="margin:0 0 4px;">${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      <p class="tiny" style="margin:0;">Goal: ${GOAL_LABELS[p.goal]}${currentWeight ? ' · ' + currentWeight + ' kg' : ''}</p>
    </div>
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
  const template = STRENGTH_TEMPLATES[muscle][p.experience];
  const exercisesHtml = template
    .map((ex, exIdx) => {
      const last = lastExercisePerformance(ex.name);
      const setsHtml = Array.from({ length: ex.sets })
        .map((_, setIdx) => {
          const lastSet = last && last[setIdx];
          const phW = lastSet && lastSet.weight ? String(lastSet.weight) : 'kg';
          const phR = lastSet && lastSet.reps ? String(lastSet.reps) : 'reps';
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
      return `
      <div class="exercise">
        <div class="row" style="align-items:flex-start;gap:10px;">
          ${exIconSVG(ex.pattern)}
          <div style="flex:1;">
            <div class="exercise-name">${escapeHtml(ex.name)}</div>
            <div class="tiny">Target: ${ex.sets} × ${ex.reps}${lastSummary}</div>
            <div class="tiny" style="margin-top:2px;">${escapeHtml(ex.cue)}</div>
          </div>
        </div>
        ${setsHtml}
      </div>`;
    })
    .join('');
  return `
    <div class="card">
      ${exercisesHtml}
      <button class="btn-primary" style="margin-top:12px;" data-action="save-workout" data-weekday="${wd}" data-muscle="${muscle}">Save workout</button>
    </div>`;
}

function renderCardioDay(wd) {
  const p = state.profile;
  const list = CARDIO_TEMPLATES[p.experience];
  const itemsHtml = list
    .map(
      (a, i) => `
    <div class="exercise">
      <div class="row" style="align-items:flex-start;gap:10px;">
        ${exIconSVG('cardio')}
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
      ${itemsHtml}
      <button class="btn-primary" style="margin-top:12px;" data-action="save-cardio" data-weekday="${wd}">Save session</button>
    </div>`;
}

function workoutHistoryHtml() {
  if (!state.workoutLog.length) return '<p class="empty-state">No sessions logged yet.</p>';
  return [...state.workoutLog]
    .reverse()
    .slice(0, 10)
    .map((s) => {
      const label = MUSCLE_LABELS[s.muscle] || s.muscle || '';
      let detail = '';
      if (s.exercises) {
        const totalSets = s.exercises.reduce((n, e) => n + e.sets.length, 0);
        detail = `${s.exercises.length} exercises, ${totalSets} sets`;
      } else if (s.activities) {
        const totalMin = s.activities.reduce((n, a) => n + a.minutes, 0);
        detail = `${totalMin} min`;
      }
      return `<div class="log-entry"><span>${s.date} · ${label}</span><span class="tiny">${detail}</span></div>`;
    })
    .join('');
}

function saveWorkout(weekday, muscle) {
  const template = STRENGTH_TEMPLATES[muscle][state.profile.experience];
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
  if (!exercises.length) {
    toast('Log at least one set first');
    return;
  }
  state.workoutLog.push({ date: todayStr(), weekday, muscle, exercises });
  state.activeWeekday = null;
  saveState();
  toast('Workout saved 💪');
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
  const list = q ? FOOD_DB.filter((f) => f.name.toLowerCase().includes(q)) : FOOD_DB.slice(0, 8);
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

function renderDiet() {
  const p = state.profile;
  const targets = calcTargets(p);
  const totals = dietTotalsForDate(todayStr());
  const todayEntries = state.dietLog[todayStr()] || [];
  const mealPlan = MEAL_TEMPLATES[p.diet] || MEAL_TEMPLATES.eggetarian;
  return `
    <div class="card">
      <h3>Today's totals</h3>
      ${meterRow('Calories', totals.cal, targets.calories, 'kcal')}
      ${meterRow('Protein', totals.protein, targets.protein, 'g')}
      ${meterRow('Carbs', totals.carbs, targets.carbs, 'g')}
      ${meterRow('Fat', totals.fat, targets.fat, 'g')}
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
      <h3>Suggested meal plan — ${DIET_LABELS[p.diet]}</h3>
      <p class="tiny">Scale portions to hit the totals above. This is a starting template, not a prescription.</p>
      ${mealPlan.map(([slot, desc]) => `<div class="log-entry"><span>${slot}</span><span class="tiny" style="text-align:right;max-width:65%;">${desc}</span></div>`).join('')}
    </div>
  `;
}

function addFoodByName(name) {
  const item = FOOD_DB.find((f) => f.name === name);
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

function buildWeightChartSVG(entries) {
  const W = 320,
    H = 170,
    padL = 34,
    padR = 12,
    padT = 14,
    padB = 24;
  const innerW = W - padL - padR,
    innerH = H - padT - padB;
  const weights = entries.map((e) => e.weightKg);
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
  const points = entries.map((e, i) => [x(i), y(e.weightKg)]);
  const pathD = points.map((pt, i) => (i === 0 ? 'M' : 'L') + pt[0].toFixed(1) + ',' + pt[1].toFixed(1)).join(' ');
  const gridLines = [0, 0.5, 1]
    .map((f) => {
      const gy = padT + innerH * f;
      return `<line class="grid" x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - padR}" y2="${gy.toFixed(1)}" />`;
    })
    .join('');
  const dots = points.map((pt, i) => `<circle class="dot" data-i="${i}" cx="${pt[0].toFixed(1)}" cy="${pt[1].toFixed(1)}" r="4" />`).join('');
  return `
    <svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" height="170" id="weightChartSvg">
      ${gridLines}
      <line class="baseline" x1="${padL}" y1="${(padT + innerH).toFixed(1)}" x2="${W - padR}" y2="${(padT + innerH).toFixed(1)}" />
      <text x="2" y="${padT + 4}">${max.toFixed(1)}</text>
      <text x="2" y="${padT + innerH}">${min.toFixed(1)}</text>
      <path class="line" d="${pathD}" />
      ${dots}
      <line class="crosshair" id="crosshairLine" x1="0" y1="${padT}" x2="0" y2="${(padT + innerH).toFixed(1)}" style="opacity:0" />
    </svg>`;
}

function wireWeightChart(entries) {
  const svg = document.getElementById('weightChartSvg');
  if (!svg || entries.length < 2) return;
  const crosshair = document.getElementById('crosshairLine');
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
    tooltip.textContent = `${e.date}: ${e.weightKg} kg`;
  }

  svg.addEventListener('pointermove', handleMove);
  svg.addEventListener('pointerleave', () => {
    tooltip.style.display = 'none';
    crosshair.style.opacity = 0;
  });
}

function renderProgress() {
  const entries = [...state.weightLog].sort((a, b) => a.date.localeCompare(b.date));
  const chartHtml =
    entries.length >= 2
      ? `<div class="chart-wrap" style="position:relative;">${buildWeightChartSVG(entries)}</div>`
      : '<p class="empty-state">Log your weight a few times to see a trend line.</p>';
  const first = entries[0],
    last = entries[entries.length - 1];
  const change = first && last && first !== last ? (last.weightKg - first.weightKg).toFixed(1) : null;
  const weekCount = state.workoutLog.filter((s) => isThisWeek(s.date)).length;
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
      <h3>Consistency</h3>
      <p style="margin:0 0 4px;">${weekCount} / 6 scheduled sessions logged this week</p>
      <p class="tiny" style="margin:0;">${state.workoutLog.length} total sessions logged all-time</p>
    </div>
  `;
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
}

function resetData() {
  if (!confirm('This deletes all your logged data on this device. Continue?')) return;
  localStorage.removeItem(STORE_KEY);
  state = defaultState();
  currentTab = 'dashboard';
  document.getElementById('onboardingOverlay').classList.remove('hidden');
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
  } else if (currentTab === 'progress') {
    app.innerHTML = renderProgress();
    const entries = [...state.weightLog].sort((a, b) => a.date.localeCompare(b.date));
    wireWeightChart(entries);
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
  }
}

function handleAppChange(e) {
  if (e.target.id === 'importFile') {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!imported.profile) throw new Error('missing profile');
        state = imported;
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
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
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

  if (!state.profile) {
    document.getElementById('onboardingOverlay').classList.remove('hidden');
  } else {
    render();
  }

  registerServiceWorker();
}

init();
