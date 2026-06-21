// Master Application Memory Registry State Machine
const APP_STATE = {
    sandbox: { diet: 4, transit: 120, flights: 10 },
    wizardData: { electricity: 80, waste: 30 },
    mitigatedWeightKg: 0.0,
    historicalLogs: [
        { quarter: "Q1", impact: 6.8 },
        { quarter: "Q2", impact: 6.2 },
        { quarter: "Q3", impact: 5.9 },
        { quarter: "Q4", impact: 5.4 }
    ],
    availableHabits: [
        { id: "h1", name: "Transition to Meatless Lunches", desc: "Saves roughly 4.1 Kg CO2e daily", weight: 4.1, done: false },
        { id: "h2", name: "Bike Commute to Workplace", desc: "Saves roughly 5.8 Kg CO2e daily", weight: 5.8, done: false },
        { id: "h3", name: "Lower Smart Thermostat 2°F", desc: "Saves roughly 2.3 Kg CO2e daily", weight: 2.3, done: false }
    ]
};

// Coefficient Parameters Engine Arrays
const PHYSICS_CONSTANTS = {
    dietFactor: 0.15,      // per meal per year
    transitFactor: 0.021,  // per mile per year
    flightFactor: 0.09,    // per hour per year
    electricFactor: 0.07,  // per dollar per year
    wasteFactor: 0.013     // per lb per year
};

// Navigation Flow Module Panel Core
function switchView(viewId, navElement) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

    document.getElementById(`view-${viewId}`).classList.add('active');
    navElement.classList.add('active');

    if (viewId === 'analytics') renderHistoricalMatrix();
}

// VIEW MODULE 1: Realtime Simulator Sandbox Logic Core
function runLiveSimulation() {
    const diet = parseFloat(document.getElementById('sim-diet').value);
    const transit = parseFloat(document.getElementById('sim-transit').value);
    const flights = parseFloat(document.getElementById('sim-flights').value);

    // Sync live numerical textual layout labels
    document.getElementById('val-diet').innerText = diet;
    document.getElementById('val-transit').innerText = transit + " mi";
    document.getElementById('val-flights').innerText = flights + " hrs";

    // Mathematical parsing chain conversions
    const computation = (
        (diet * PHYSICS_CONSTANTS.dietFactor) +
        (transit * PHYSICS_CONSTANTS.transitFactor) +
        (flights * PHYSICS_CONSTANTS.flightFactor)
    ).toFixed(2);

    document.getElementById('sim-score').innerText = computation;

    // Dynamic Context Decision Output Parsing Logic
    const verdictElement = document.getElementById('sim-verdict-text');
    if (computation > 10) {
        verdictElement.innerHTML = "⚠️ <strong>High Intensity Profile:</strong> Your simulation variables exceed baseline constraints. Prioritize reducing annual air travel hours or shifting vehicle transit to clean alternatives.";
    } else if (computation > 4) {
        verdictElement.innerHTML = "⚡ <strong>Moderate Profile:</strong> Your footprint scales within average parameters. Small adjustments to your weekly meal mix can drop your metric below the target threshold.";
    } else {
        verdictElement.innerHTML = "✨ <strong>Optimal Green Horizon:</strong> Your simulated footprint profile model falls securely inside international climate target boundaries. Excellent sustainability baseline.";
    }
}

// VIEW MODULE 2: Precision Multi-Step Entry Wizard Router
function navigateWizard(stepNum) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`wiz-step-${stepNum}`).classList.add('active');
}

function compileWizardProfile() {
    const powerInput = parseFloat(document.getElementById('wiz-power').value) || 0;
    const wasteInput = parseFloat(document.getElementById('wiz-waste').value) || 0;

    APP_STATE.wizardData.electricity = powerInput;
    APP_STATE.wizardData.waste = wasteInput;

    // Process calculations
    const finalAuditScore = (
        (powerInput * PHYSICS_CONSTANTS.electricFactor) +
        (wasteInput * PHYSICS_CONSTANTS.wasteFactor)
    ).toFixed(2);

    // Push new results dynamically into historical array storage profiles
    APP_STATE.historicalLogs.push({ quarter: "NEW", impact: parseFloat(finalAuditScore) });
    alert(`Audit Locked! Your static localized energy parameter profile output scores: ${finalAuditScore} Tons. Data pushed to Historical Analytics.`);

    // Auto reset views to the metrics monitor matrix window step
    navigateWizard(1);
}

// VIEW MODULE 3: Gamified Habit Tracker Array Template Generator
function renderActionLedgerPool() {
    const targetBox = document.getElementById('ledger-pool');
    targetBox.innerHTML = ''; // Sanitize view bounds

    APP_STATE.availableHabits.forEach((habit, idx) => {
        const row = document.createElement('div');
        row.className = 'action-row';

        row.innerHTML = `
            <div class="action-info">
                <h4 style="${habit.done ? 'text-decoration: line-through; color: var(--text-dim);' : ''}">${habit.name}</h4>
                <p>${habit.desc}</p>
            </div>
            <button class="btn" style="padding:8px 14px; font-size:12px; background:${habit.done ? '#223528' : '#22c55e'}; color:${habit.done ? '#7da087' : '#060907'}" 
                onclick="toggleHabitCommitment(${idx})">
                ${habit.done ? 'Logged ✓' : 'Commit'}
            </button>
        `;
        targetBox.appendChild(row);
    });
}

function toggleHabitCommitment(idx) {
    const habit = APP_STATE.availableHabits[idx];
    habit.done = !habit.done;

    if (habit.done) {
        APP_STATE.mitigatedWeightKg += habit.weight;
    } else {
        APP_STATE.mitigatedWeightKg -= habit.weight;
    }

    document.getElementById('mitigation-score').innerText = APP_STATE.mitigatedWeightKg.toFixed(1);
    renderActionLedgerPool();
}

// VIEW MODULE 4: Sparkline Analytical Data Graph Generator
function renderHistoricalMatrix() {
    const container = document.getElementById('sparkline-target');
    container.innerHTML = ''; // Sanitize frame paths

    const maxVal = Math.max(...APP_STATE.historicalLogs.map(l => l.impact), 1);

    APP_STATE.historicalLogs.forEach(log => {
        const bar = document.createElement('div');
        bar.className = `spark-bar ${log.quarter === 'NEW' ? 'active' : ''}`;

        // Convert scale mathematically into browser layout percentages
        const calculatedPercentageHeight = (log.impact / maxVal) * 100;
        bar.style.height = `${calculatedPercentageHeight}%`;
        bar.setAttribute('data-label', `${log.quarter} (${log.impact}T)`);

        container.appendChild(bar);
    });
}

// Platform Window Runtime Initializations
window.onload = function () {
    runLiveSimulation();
    renderActionLedgerPool();
};