ddocument.addEventListener("DOMContentLoaded", () => {
  // Animate KPIs
  document.querySelectorAll(".value[data-count]").forEach(el => {
    const count = parseFloat(el.dataset.count);
    let i = 0;
    const inc = count / 60;
    const interval = setInterval(() => {
      i += inc;
      el.textContent = count >= 1000 ? Math.floor(i).toLocaleString() : i.toFixed(1);
      if (i >= count) {
        el.textContent = count >= 1000 ? Math.floor(count).toLocaleString() : count.toFixed(1);
        clearInterval(interval);
      }
    }, 16);
  });

  // Chart Setup
  const ctx = document.getElementById("remixChart").getContext("2d");

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, "rgba(0,255,255,0.6)");
  gradient1.addColorStop(1, "rgba(0,255,255,0.1)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, "rgba(255,0,170,0.6)");
  gradient2.addColorStop(1, "rgba(255,0,170,0.1)");

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, "rgba(128,0,255,0.6)");
  gradient3.addColorStop(1, "rgba(128,0,255,0.1)");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Earnings (AIGx)", "Clones", "Collabs"],
      datasets: [{
        label: "Remix Protocol Metrics",
        data: [1800, 4, 2], // Based on available lineage, credits, collaborations
        backgroundColor: [gradient1, gradient2, gradient3],
        borderColor: ["#00f0ff", "#ff1cf7", "#a64dff"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Remix Propagation Over Time",
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
          ticks: { color: "#ccc" },
          grid: { color: "rgba(255,255,255,0.05)" }
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#ccc" },
          grid: { color: "rgba(255,255,255,0.05)" }
        }
      }
    }
  });
});
