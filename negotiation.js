document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let gradient;

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Vault Activity",
        data: [500, 1200, 1800, 2300, 3100],
        borderColor: "#00f0ff",
        backgroundColor: context => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          if (!gradient) {
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, "#00f0ff");
            gradient.addColorStop(0.5, "#ff1cf7");
            gradient.addColorStop(1, "#6100ff");
          }
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#ccc" }
        },
        title: {
          display: true,
          text: "Negotiation Volume & Vault Impact",
          color: "#00f0ff",
          font: {
            size: 16,
            weight: "bold"
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        x: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.05)" } },
        y: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.05)" } }
      }
    }
  });
});
