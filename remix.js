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

  // 🔁 Bonus Monetization Panel Logic
  window.launchVenture = function () {
    alert("MetaVenture launched! Revenue share logic is now active.");
  };

  // 💰 Optional: Inject Monetization Panel if not present
  const container = document.querySelector(".chart-container");
  if (container && !document.querySelector(".monetize-remix")) {
    const panel = document.createElement("div");
    panel.className = "monetize-remix";
    panel.innerHTML = `
      <h2>Monetize This Remix</h2>
      <p>Turn your remix into a monetizable asset. Choose one of the actions below:</p>
      <button onclick="alert('Staked to boost propagation!')">Stake to Boost Propagation</button>
      <button onclick="alert('Converted to Vault!')">Convert to Vault</button>
      <button onclick="alert('Royalty terms saved!')">Set Royalty Terms</button>
      <button onclick="alert('Collaborators invited!')">Invite Collaborators</button>
    `;
    container.parentNode.insertBefore(panel, container.nextSibling);
  }

  // 🧠 Optional: Inject Silo Guide if not already present
  if (!document.querySelector(".silo-guide")) {
    const guide = document.createElement("div");
    guide.className = "silo-guide";
    guide.innerHTML = `
      <h3>Remix — What Is This?</h3>
      <p>
        This silo visualizes your remix lineage. Every remix creates a branching tree of derivative value and agent credit.
        Track earnings, trigger MetaVentures, and convert remix chains into protocol-native vaults or royalties.
      </p>
    `;
    document.querySelector(".main").appendChild(guide);
  }
});
