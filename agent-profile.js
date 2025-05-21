function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

const mockAgents = {
  "2732": { rating: 88, vaults: 4, remix: 3, ventures: 1, lineage: 2 },
  "1882": { rating: 91, vaults: 5, remix: 6, ventures: 2, lineage: 1 },
  "3117": { rating: 73, vaults: 3, remix: 1, ventures: 0, lineage: 0 }
};

function populateAgentMetrics(id) {
  const data = mockAgents[id];
  if (!data) return;

  const values = document.querySelectorAll(".value");
  values[0].setAttribute("data-count", data.vaults);
  values[1].setAttribute("data-count", data.remix);
  values[2].setAttribute("data-count", data.ventures);
  values[3].setAttribute("data-count", data.rating);
  values[4].setAttribute("data-count", data.lineage);
}

const agentId = getQueryParam("id") || "2732";
document.querySelector("h1").innerText = `Agent Profile #${agentId}`;
populateAgentMetrics(agentId);

// Animate numbers
document.querySelectorAll(".value").forEach(el => {
  if (!el.dataset.count) return;
  const end = parseFloat(el.dataset.count);
  let start = 0;
  const step = end / 60;
  const animate = () => {
    start += step;
    if (start < end) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(animate);
    } else {
      el.textContent = end.toLocaleString();
    }
  };
  animate();
});

// Chart logic
const ctx = document.getElementById("agentChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Agent Earnings",
      data: [200, 400, 500, 700, 820],
      backgroundColor: function(context) {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "#3a0078");
        gradient.addColorStop(0.5, "#ff0080");
        gradient.addColorStop(1, "#00ffe0");
        return gradient;
      },
      borderColor: "#00d9ff",
      fill: true,
      tension: 0.3,
      pointRadius: 0
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {display: false}
    },
    scales: {
      x: {ticks: {color: "#ccc"}},
      y: {ticks: {color: "#ccc"}}
    }
  }
});
