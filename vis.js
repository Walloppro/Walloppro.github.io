document.addEventListener('DOMContentLoaded', () => {
    drawBarChart();
    drawSimpleScene();
});

function createSVGElement(tag, attributes) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

function drawBarChart() {
    const container = document.getElementById('data-viz-container');
    if (!container) return;
    container.innerHTML = '';
    const data = [
        { label: "Value 1", value: 80, color: "rgb(228, 77, 38)" },
        { label: "Value 2", value: 65, color: "rgb(241, 224, 90)" },
        { label: "Value 3", value: 90, color: "var(--brand-green)" },
        { label: "Value 4", value: 95, color: "rgb(50, 50, 200)" }
    ];
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 30, right: 50, bottom: 50, left: 120 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;
    const svg = createSVGElement('svg', {
        viewBox: `0 0 ${svgWidth} ${svgHeight}`,
        width: "100%",
        height: "100%"
    });
    const chartGroup = createSVGElement('g', {
        transform: `translate(${margin.left}, ${margin.top})`
    });
    svg.appendChild(chartGroup);

    const yAxis = createSVGElement('line', {
        x1: 0, y1: 0,
        x2: 0, y2: chartHeight,
        stroke: "rgb(51, 51, 51)", "stroke-width": 2
    });
    chartGroup.appendChild(yAxis);

    const xAxis = createSVGElement('line', {
        x1: 0, y1: chartHeight,
        x2: chartWidth, y2: chartHeight,
        stroke: "rgb(51, 51, 51)", "stroke-width": 2
    });
    chartGroup.appendChild(xAxis);

    const xLabelCount = 6;
    for (let i = 0; i < xLabelCount; i++) {
        const percentage = i * 20;
        const xPos = (percentage / 100) * chartWidth;
        const text = createSVGElement('text', {
            x: xPos,
            y: chartHeight + 25,
            "font-family": "Arial", "font-size": "14",
            "text-anchor": "middle"
        });
        text.textContent = `${percentage}%`;
        chartGroup.appendChild(text);
        const tick = createSVGElement('line', {
            x1: xPos, y1: chartHeight,
            x2: xPos, y2: chartHeight + 5,
            stroke: "rgb(51, 51, 51)", "stroke-width": 1
        });
        chartGroup.appendChild(tick);
    }
    const barHeight = 40;
    const barSpacing = (chartHeight - (data.length * barHeight)) / (data.length + 1);
    data.forEach((item, index) => {
        const yPos = barSpacing + index * (barHeight + barSpacing);
        const labelText = createSVGElement('text', {
            x: -15,
            y: yPos + barHeight / 2 + 5, 
            "font-family": "Arial", "font-size": "14",
            "text-anchor": "end", 
            "font-weight": "bold"
        });
        labelText.textContent = item.label;
        chartGroup.appendChild(labelText);

        const bgBar = createSVGElement('rect', {
            x: 0, y: yPos,
            width: chartWidth, height: barHeight,
            fill: "rgb(238, 238, 238)", rx: 5
        });
        chartGroup.appendChild(bgBar);

        const barWidth = (item.value / 100) * chartWidth;
        const valBar = createSVGElement('rect', {
            x: 0, y: yPos,
            width: barWidth, height: barHeight,
            fill: item.color, 
            rx: 5,
            stroke: "var(--brand-grey)", 
            "stroke-width": 2
        });
        chartGroup.appendChild(valBar);
        
        const percentText = createSVGElement('text', {
            x: 440, 
            y: yPos + barHeight / 2 + 5,
            "font-family": "Arial", "font-size": "14",
            "font-weight": "bold"
        });
        percentText.textContent = `${item.value}%`;
        chartGroup.appendChild(percentText);
    });
    container.appendChild(svg);
}

function drawSimpleScene() {
    const container = document.getElementById('creative-viz-container');
    if (!container) return;

    const svg = createSVGElement('svg', { 
        viewBox: "0 0 600 400", 
        width: "100%", 
        height: "100%" 
    });

    const sky = createSVGElement('rect', {
        x: 0, y: 0,
        width: 600, height: 400,
        fill: "rgb(135, 206, 235)"
    });
    svg.appendChild(sky);

    const sun = createSVGElement('circle', {
        cx: 550, cy: 50,
        r: 30,
        fill: "rgb(255, 215, 0)",
        stroke: "rgb(255, 165, 0)",
        "stroke-width": 2
    });
    svg.appendChild(sun);

    const grass = createSVGElement('rect', {
        x: 0, y: 300,
        width: 600, height: 100,
        fill: "rgb(50, 205, 50)"
    });
    svg.appendChild(grass);

    const trunk = createSVGElement('rect', {
        x: 280, y: 240,       
        width: 40, height: 80,
        fill: "rgb(139, 69, 19)"      
    });
    const leaves1 = createSVGElement('circle', {
        cx: 300, cy: 210, r: 40, fill: "rgb(0, 102, 0)" 
    });
    const leaves2 = createSVGElement('circle', {
        cx: 275, cy: 240, r: 35, fill: "rgb(0, 100, 0)"
    });
    const leaves3 = createSVGElement('circle', {
        cx: 325, cy: 240, r: 35, fill: "rgb(0, 100, 0)"
    });
    svg.appendChild(trunk);
    svg.appendChild(leaves1);
    svg.appendChild(leaves2);
    svg.appendChild(leaves3);

    container.appendChild(svg);
}