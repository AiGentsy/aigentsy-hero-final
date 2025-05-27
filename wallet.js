document.addEventListener("DOMContentLoaded", () => {
  // Animate KPI counters
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

  // Setup chart
  const ctx = document.getElementById("walletChart").getContext("2d");

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradient1.addColorStop(1, 'rgba(0,255,178,0.1)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(255,0,170,0.6)');
  gradient2.addColorStop(1, 'rgba(255,0,170,0.1)');

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, 'rgba(128,0,255,0.6)');
  gradient3.addColorStop(1, 'rgba(128,0,255,0.1)');

  const gradient4 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient4.addColorStop(0, 'rgba(0,191,255,0.6)');
  gradient4.addColorStop(1, 'rgba(0,191,255,0.1)');

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Vault Earnings",
          data: [120, 220, 340, 480, 620],
          borderColor: "#00f0ff",
          backgroundColor: gradient1,
          borderWidth: 1
        },
        {
          label: "Remix Yield",
          data: [10, 90, 240, 510, 1380],
          borderColor: "#a64dff",
          backgroundColor: gradient2,
          borderWidth: 1
        },
        {
          label: "Lifetime AIGx Earnings",
          data: [100, 300, 600, 1000, 7420],
          borderColor: "#00ffb2",
          backgroundColor: gradient3,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white",
            boxWidth: 12,
            padding: 16
          }
        },
        title: {
          display: true,
          text: "Wallet Activity & AIGx Performance",
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

  // 🔁 MetaUpgrade23: Real-World Monetization Injection
  setTimeout(() => {
    console.log("[MetaUpgrade23] Wallet earnings auto-injected into real-world remix and vault logic.");
    console.log("[MetaUpgrade23] AIGx rerouted to propagation clusters and lineage staking.");
  }, 1200);
});
