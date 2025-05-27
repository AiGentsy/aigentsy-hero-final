document.addEventListener("DOMContentLoaded", () => {
  // Animate KPI values
  document.querySelectorAll(".value[data-count]").forEach(el => {
    const end = parseFloat(el.getAttribute("data-count"));
    let current = 0;
    const step = end / 60;
    const animate = () => {
      current += step;
      if (current < end) {
        el.textContent = end >= 1000 ? Math.floor(current).toLocaleString() : current.toFixed(1);
        requestAnimationFrame(animate);
      } else {
        el.textContent = end >= 1000 ? Math.floor(end).toLocaleString() : end.toFixed(1);
      }
    };
    animate();
  });

  // Arena Battle Activity Chart
  const ctx = document.getElementById("arenaChart").getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(0,255,242,0.6)");
  gradient.addColorStop(0.5, "rgba(166,77,255,0.5)");
  gradient.addColorStop(1, "rgba(0,240,255,0.1)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Arena Challenge Activity",
        data: [18, 64, 126, 180, 244],
        backgroundColor: gradient,
        borderColor: "#00d9ff",
        fill: true,
        tension: 0.3,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Arena Challenge Activity",
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
