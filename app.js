// Unique calculation coefficients derived from regional averages
const ECO_FACTORS = {
    dietBaselines: { "high-protein": 3.0, "balanced": 2.0, "plant-based": 1.4 },
    transitMultiplier: 0.00041 // Metric tons of CO2 per mile annualized
};

function runCarbonEngine() {
    // Capture user interface state values
    const selectedDiet = document.getElementById('userDiet').value;
    const weeklyMiles = parseFloat(document.getElementById('userTransit').value) || 0;

    // Execute distinct calculation parameters
    const dietImpact = ECO_FACTORS.dietBaselines[selectedDiet];
    const transitImpact = weeklyMiles * 52 * ECO_FACTORS.transitMultiplier;
    const aggregateOutput = (dietImpact + transitImpact).toFixed(2);

    // Render metrics seamlessly to interface views
    document.getElementById('finalMetric').innerText = aggregateOutput;
    document.getElementById('outputModule').style.display = 'block';

    // Clear previous list elements completely
    const summaryContainer = document.getElementById('strategyTarget');
    summaryContainer.innerHTML = '';

    // Context-sensitive dynamic decision logic arrays
    if (weeklyMiles > 120) {
        appendStrategyItem("Transit Vector: Trimming vehicle usage by just 20 miles a week shifts your overall profile down dramatically.");
    }
    if (selectedDiet === "high-protein") {
        appendStrategyItem("Dietary Vector: Integrating meat-free alternatives for lunches drops manufacturing resource dependencies.");
    }
    if (weeklyMiles <= 120 && selectedDiet !== "high-protein") {
        appendStrategyItem("Optimization Core: Baseline profile looks fantastic. Focus on secondary goals like adjusting home water heaters to 120°F.");
    }
}

function appendStrategyItem(messageText) {
    const contextList = document.getElementById('strategyTarget');
    const listItem = document.createElement('li');
    listItem.className = 'strategy-item';
    listItem.innerText = messageText;
    contextList.appendChild(listItem);
}