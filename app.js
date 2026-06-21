// State management variables for the user flow
let currentStep = 1;
let selectedDietContext = "heavy-meat";

const STRATEGY_DATA = {
    dietFactors: { "heavy-meat": 3.2, "low-meat": 2.1, "plant-based": 1.3 },
    mileCoefficient: 0.00041,
    utilityCoefficient: 0.0058
};

function navigateStep(targetStep) {
    // Hide current panel step active state
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`dot${currentStep}`).classList.remove('active');

    // Transition state
    currentStep = targetStep;

    // Show target step view parameters
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.getElementById(`dot${currentStep}`).classList.add('active');

    // Light up previous steps too
    for (let i = 1; i <= 3; i++) {
        if (i <= currentStep) {
            document.getElementById(`dot${i}`).classList.add('active');
        } else {
            document.getElementById(`dot${i}`).classList.remove('active');
        }
    }
}

function selectDiet(element, contextValue) {
    // Remove selected state UI styles across alternatives
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(card => card.classList.remove('selected'));

    // Assign active element states
    element.classList.add('selected');
    selectedDietContext = contextValue;
}

function processAnalysisOutput() {
    const totalMiles = parseFloat(document.getElementById('milesInput').value) || 0;
    const totalUtilities = parseFloat(document.getElementById('utilityInput').value) || 0;

    // Multi-variable scoring formulas
    const baselineDiet = STRATEGY_DATA.dietFactors[selectedDietContext];
    const annualTransit = totalMiles * 52 * STRATEGY_DATA.mileCoefficient;
    const annualUtilities = totalUtilities * 12 * STRATEGY_DATA.utilityCoefficient;

    const compositeScore = (baselineDiet + annualTransit + annualUtilities).toFixed(2);

    // Update Metrics Data Fields
    document.getElementById('metricOutput').innerText = compositeScore;

    // Compute Context Dynamic Decisions
    const container = document.getElementById('insightsTarget');
    container.innerHTML = ''; // Sanitize container bounds

    let actionList = [];
    if (totalMiles > 140) {
        actionList.push("🚗 Transit Vector: High weekly routing context detected. Offloading 20% of drive volume yields dramatic footprint scaling decreases.");
    }
    if (totalUtilities > 100) {
        actionList.push("⚡ Grid Power Vector: Shifting high-draw utility loads outside peak grid usage windows optimizes dynamic source loads.");
    }
    if (selectedDietContext === "heavy-meat") {
        actionList.push("🥗 Agricultural Vector: Swapping out primary livestock proteins for alternative choices twice weekly removes immediate industrial resource footprints.");
    }
    if (actionList.length === 0) {
        actionList.push("✨ System Optimization Clean: Baseline numbers check out securely. Focus environmental targets on secondary consumer waste workflows.");
    }

    actionList.forEach(text => {
        const item = document.createElement('div');
        item.className = 'insight-pill';
        item.innerText = text;
        container.appendChild(item);
    });

    // Push UI window execution layer forward
    navigateStep(3);
}

function resetWorkflow() {
    document.getElementById('milesInput').value = 0;
    document.getElementById('utilityInput').value = 0;
    navigateStep(1);
}