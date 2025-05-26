document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function createGradient(context, color) {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, color + "66");
    gradient.addColorStop(0.5, color + "33");
    gradient.addColorStop(1, color + "00");
    return gradient;
  }

  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Negotiations Opened",
          data: [800, 1100, 1300, 1700, 2100],
          borderColor: "#00f0ff",
          backgroundColor: context => createGradient(context, "#00f0ff"),
          borderWidth: 1
        },
        {
          label: "Negotiations Closed",
          data: [600, 900, 1100, 1400, 1900],
          borderColor: "#a64dff",
          backgroundColor: context => createGradient(context, "#a64dff"),
          borderWidth: 1
        },
        {
          label: "Auto-Negotiated Deals",
          data: [100, 220, 380, 470, 610],
          borderColor: "#00ffb2",
          backgroundColor: context => createGradient(context, "#00ffb2"),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#ccc" }
        },
        title: {
          display: true,
          text: "Negotiation Volume, Closures, and Auto-Agent Outcomes",
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
        x: {
          stacked: false,
          ticks: { color: "#ccc" },
          grid: { color: "rgba(255,255,255,0.05)" }
        },
        y: {
          ticks: { color: "#ccc" },
          grid: { color: "rgba(255,255,255,0.05)" }
        }
      }
    }
  });
});
