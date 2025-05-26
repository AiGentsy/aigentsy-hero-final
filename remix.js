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

  // Render Remix Chart
  const canvas = document.getElementById("remixChart");
  const ctx = canvas.getContext("2d");

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, "rgba(0,255,255,0.6)");
  gradient1.addColorStop(1, "rgba(0,255,255,0.1)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, "rgba(166,77,255,0.6)");
  gradient2.addColorStop(1, "rgba(166,77,255,0.1)");

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, "rgba(0,255,178,0.6)");
  gradient3.addColorStop(1, "rgba(0,255,178,0.1)");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Earnings",
          data: [200, 360, 480, 620, 780],
          backgroundColor: gradient1,
          borderColor: "#00f0ff",
          borderWidth: 1
        },
        {
          label: "Clones",
          data: [3, 5, 9, 13, 18],
          backgroundColor: gradient2,
          borderColor: "#a64dff",
          borderWidth: 1
        },
        {
          label: "Collabs",
          data: [1, 2, 3, 5, 7],
          backgroundColor: gradient3,
          borderColor: "#00ffb2",
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
          text: "Remix Propagation Over Time",
          color: "#00f0ff",
          font: { size: 16, weight: "bold" },
          padding: { top: 10, bottom: 20 }
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

  // 🔁 Bonus Panel Logic: Launch Venture
  window.launchVenture = function () {
    alert("MetaVenture launched! Revenue share logic is now active.");
  };
});
