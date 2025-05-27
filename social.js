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

  // Social Chart
  const ctx = document.getElementById("chart").getContext("2d");

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, "rgba(0,240,255,0.6)");
  gradient1.addColorStop(1, "rgba(0,240,255,0.1)");

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
          label: "Remix Reach %",
          data: [12, 26, 41, 61, 78],
          backgroundColor: gradient1,
          borderColor: "#00f0ff",
          borderWidth: 1
        },
        {
          label: "Referral Joins",
          data: [8, 31, 67, 102, 184],
          backgroundColor: gradient2,
          borderColor: "#a64dff",
          borderWidth: 1
        },
        {
          label: "Partner Threads",
          data: [1, 4, 7, 12, 16],
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
          labels: {
            color: "#ccc",
            font: { weight: "bold" }
          }
        },
        title: {
          display: true,
          text: "Social Engagement & Growth Trends",
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
});
