document.addEventListener("DOMContentLoaded", () => {
  // Animate KPI Counters
  document.querySelectorAll(".value[data-count]").forEach(el => {
    const end = parseFloat(el.dataset.count);
    let start = 0;
    const step = end / 60;
    const animate = () => {
      start += step;
      el.textContent = end >= 1000 ? Math.floor(start).toLocaleString() : start.toFixed(1);
      if (start < end) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = end >= 1000 ? Math.floor(end).toLocaleString() : end.toFixed(1);
      }
    };
    animate();
  });

  // Render Chart After Canvas Layout
  const canvas = document.getElementById("remixChart");
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(58, 0, 120, 0.6)");
  gradient.addColorStop(0.5, "rgba(255, 0, 128, 0.4)");
  gradient.addColorStop(1, "rgba(0, 255, 224, 0.2)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Remix Growth",
        data: [12, 24, 36, 44, 60],
        backgroundColor: gradient,
        borderColor: "#00f0ff",
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#ccc"
          }
        }
      },
      scales: {
        x: {
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

  // Bonus Panel Logic Stub (if needed in future)
  window.launchVenture = function () {
    alert("MetaVenture launched! Revenue share logic is now active.");
  };
});
