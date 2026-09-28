/* ---------------- Constants ---------------- */

const STORE_KEY = 'fittrainer_v1';
const DAY_CYCLE = ['A', 'B', 'C'];

const ACTIVITY_MULT = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
const GOAL_LABELS = { fat_loss: 'Fat loss', muscle_gain: 'Muscle gain', general: 'General fitness' };
const DIET_LABELS = { vegetarian: 'Vegetarian', eggetarian: 'Eggetarian', non_veg: 'Non-vegetarian', vegan: 'Vegan' };

const WORKOUT_TEMPLATES = {
  beginner: {
    A: [
      { name: 'Goblet Squat', sets: 3, reps: '10-12' },
      { name: 'Flat Dumbbell Bench Press', sets: 3, reps: '10-12' },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12' },
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12' },
      { name: 'Plank', sets: 3, reps: '30-45 sec' },
    ],
    B: [
      { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10-12' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12' },
      { name: 'Lat Pulldown', sets: 3, reps: '10-12' },
      { name: 'Leg Press', sets: 3, reps: '12 / leg' },
      { name: 'Hanging Knee Raise', sets: 3, reps: '12-15' },
    ],
    C: [
      { name: 'Leg Press', sets: 3, reps: '12-15' },
      { name: 'Machine Chest Press', sets: 3, reps: '10-12' },
      { name: 'Chest-Supported Row', sets: 3, reps: '10-12' },
      { name: 'Lateral Raise', sets: 3, reps: '12-15' },
      { name: 'Cable Crunch', sets: 3, reps: '15' },
    ],
  },
  intermediate: {
    A: [
      { name: 'Barbell Squat', sets: 4, reps: '8-10' },
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10' },
      { name: 'Barbell Row', sets: 4, reps: '8-10' },
      { name: 'Overhead Press', sets: 3, reps: '8-10' },
      { name: 'Plank', sets: 3, reps: '45-60 sec' },
    ],
    B: [
      { name: 'Deadlift', sets: 4, reps: '6-8' },
      { name: 'Incline Bench Press', sets: 3, reps: '8-10' },
      { name: 'Weighted Pull-up / Lat Pulldown', sets: 4, reps: '8-10' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '10 / leg' },
      { name: 'Hanging Leg Raise', sets: 3, reps: '12-15' },
    ],
    C: [
      { name: 'Front Squat / Leg Press', sets: 4, reps: '8-10' },
      { name: 'Close-Grip Bench Press', sets: 3, reps: '8-10' },
      { name: 'Pendlay Row', sets: 4, reps: '8-10' },
      { name: 'Dumbbell Lateral Raise', sets: 3, reps: '12-15' },
      { name: 'Cable Crunch', sets: 3, reps: '15' },
    ],
  },
  advanced: {
    A: [
      { name: 'Barbell Squat', sets: 5, reps: '5' },
      { name: 'Bench Press', sets: 5, reps: '5' },
      { name: 'Weighted Pull-up', sets: 4, reps: '6-8' },
      { name: 'Barbell Row', sets: 4, reps: '8' },
      { name: 'Overhead Press', sets: 3, reps: '8' },
    ],
    B: [
      { name: 'Deadlift', sets: 5, reps: '5' },
      { name: 'Incline Bench Press', sets: 4, reps: '8' },
      { name: 'Bulgarian Split Squat', sets: 4, reps: '8 / leg' },
      { name: 'Face Pull', sets: 3, reps: '15' },
      { name: 'Hanging Leg Raise', sets: 4, reps: '12' },
    ],
    C: [
      { name: 'Front Squat', sets: 4, reps: '6' },
      { name: 'Weighted Dip', sets: 4, reps: '8' },
      { name: 'Pendlay Row', sets: 4, reps: '6' },
      { name: 'Barbell Curl', sets: 3, reps: '10' },
      { name: 'Lateral Raise', sets: 4, reps: '15' },
    ],
  },
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

/* ---------------- State ---------------- */

function defaultState() {
  return { profile: null, weightLog: [], workoutLog: [], dietLog: {}, activeDayKey: null };
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

function nextDayKey() {
  if (!state.workoutLog.length) return 'A';
  const last = state.workoutLog[state.workoutLog.length - 1].dayKey;
  const idx = DAY_CYCLE.indexOf(last);
  return DAY_CYCLE[(idx + 1) % DAY_CYCLE.length];
}

function lastExercisePerformance(name) {
  for (let i = state.workoutLog.length - 1; i >= 0; i--) {
    const ex = state.workoutLog[i].exercises.find((e) => e.name === name);
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

/* ---------------- Rendering: Dashboard ---------------- */

function renderDashboard() {
  const p = state.profile;
  const targets = calcTargets(p);
  const totals = dietTotalsForDate(todayStr());
  const dayKey = nextDayKey();
  const template = WORKOUT_TEMPLATES[p.experience][dayKey];
  const currentWeight = latestWeight();
  return `
    <div class="card">
      <h2 style="margin-bottom:4px;">Hi ${escapeHtml(p.name)} 👋</h2>
      <p class="muted" style="margin:0 0 4px;">${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      <p class="tiny" style="margin:0;">Goal: ${GOAL_LABELS[p.goal]}${currentWeight ? ' · ' + currentWeight + ' kg' : ''}</p>
    </div>
    <div class="card">
      <h3>Today's targets</h3>
      ${meterRow('Calories', totals.cal, targets.calories, 'kcal')}
      ${meterRow('Protein', totals.protein, targets.protein, 'g')}
      ${meterRow('Carbs', totals.carbs, targets.carbs, 'g')}
      ${meterRow('Fat', totals.fat, targets.fat, 'g')}
      <p class="tiny" style="margin-top:10px;margin-bottom:0;">TDEE ≈ ${targets.tdee} kcal/day</p>
    </div>
    <div class="card">
      <div class="row"><h3 style="margin:0;">Next workout — Day ${dayKey}</h3><button class="btn-secondary" data-action="go-workout">Start</button></div>
      <ul style="padding-left:18px; margin:10px 0 0;">
        ${template.map((ex) => `<li>${escapeHtml(ex.name)} — ${ex.sets}×${ex.reps}</li>`).join('')}
      </ul>
    </div>
  `;
}

/* ---------------- Rendering: Workout ---------------- */

function renderWorkout() {
  const p = state.profile;
  const dayKey = state.activeDayKey || nextDayKey();
  const template = WORKOUT_TEMPLATES[p.experience][dayKey];
  const chips = DAY_CYCLE.map(
    (k) => `<button class="chip ${k === dayKey ? 'active' : ''}" data-action="pick-day" data-day="${k}">Day ${k}</button>`
  ).join(' ');
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
        <div class="exercise-name">${escapeHtml(ex.name)}</div>
        <div class="tiny">Target: ${ex.sets} × ${ex.reps}${lastSummary}</div>
        ${setsHtml}
      </div>`;
    })
    .join('');
  return `
    <div class="card">
      <div class="row"><h3 style="margin:0;">Workout — Day ${dayKey}</h3></div>
      <div style="margin:10px 0;">${chips}</div>
      ${exercisesHtml}
      <button class="btn-primary" style="margin-top:12px;" data-action="save-workout" data-daykey="${dayKey}">Save workout</button>
    </div>
    <div class="card">
      <h3>History</h3>
      ${workoutHistoryHtml()}
    </div>
  `;
}

function workoutHistoryHtml() {
  if (!state.workoutLog.length) return '<p class="empty-state">No sessions logged yet.</p>';
  return [...state.workoutLog]
    .reverse()
    .slice(0, 10)
    .map((s) => {
      const totalSets = s.exercises.reduce((n, e) => n + e.sets.length, 0);
      return `<div class="log-entry"><span>${s.date} · Day ${s.dayKey}</span><span class="tiny">${s.exercises.length} exercises, ${totalSets} sets</span></div>`;
    })
    .join('');
}

function saveWorkout(dayKey) {
  const template = WORKOUT_TEMPLATES[state.profile.experience][dayKey];
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
  state.workoutLog.push({ date: todayStr(), dayKey, exercises });
  state.activeDayKey = null;
  saveState();
  toast('Workout saved 💪');
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
      <p style="margin:0 0 4px;">${weekCount} / ${state.profile.daysPerWeek} workouts logged this week</p>
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
        <label>Days per week<select name="daysPerWeek">
          ${[3, 4, 5, 6].map((v) => `<option value="${v}" ${p.daysPerWeek === v ? 'selected' : ''}>${v} days</option>`).join('')}
        </select></label>
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
    daysPerWeek: Number(fd.get('daysPerWeek')),
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
  } else if (action === 'pick-day') {
    state.activeDayKey = btn.dataset.day;
    render();
  } else if (action === 'save-workout') {
    saveWorkout(btn.dataset.daykey);
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
    daysPerWeek: Number(fd.get('daysPerWeek')),
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
