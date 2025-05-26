document.addEventListener("DOMContentLoaded", () => {
  // Animate KPIs
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

  const ctx = document.getElementById("chart").getContext("2d");

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, "rgba(0,255,178,0.6)");
  gradient1.addColorStop(1, "rgba(0,255,178,0.1)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, "rgba(166,77,255,0.6)");
  gradient2.addColorStop(1, "rgba(166,77,255,0.1)");

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, "rgba(0,255,242,0.6)");
  gradient3.addColorStop(1, "rgba(0,255,242,0.1)");

  const gradient4 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient4.addColorStop(0, "rgba(255,204,0,0.6)");
  gradient4.addColorStop(1, "rgba(255,204,0,0.1)");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Auto-Created Realms",
          data: [5, 9, 13, 18, 23],
          backgroundColor: gradient1,
          borderColor: "#00ffb2",
          borderWidth: 1
        },
        {
          label: "Cross-Realm Deals",
          data: [6, 18, 27, 44, 61],
          backgroundColor: gradient2,
          borderColor: "#a64dff",
          borderWidth: 1
        },
        {
          label: "Mirror Agents",
          data: [80, 170, 260, 350, 437],
          backgroundColor: gradient3,
          borderColor: "#00f0ff",
          borderWidth: 1
        },
        {
          label: "Realm-to-Realm Clones",
          data: [8, 15, 22, 30, 37],
          backgroundColor: gradient4,
          borderColor: "#ffcc00",
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
          text: "Realm Expansion & Propagation Metrics",
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

  // Static map preview placeholder
  const chartContainer = document.querySelector('.chart-container');
  const mapDiv = document.createElement('div');
  mapDiv.className = 'map-preview';
  mapDiv.innerHTML = `
    <h4 style="color: #00f0ff; margin-top: 30px;">Global Realm Propagation Preview</h4>
    <img src="realm-map-placeholder.png" alt="Realm Activity Map" style="width:100%;border-radius:12px;opacity:0.85;" />
  `;
  chartContainer.parentNode.insertBefore(mapDiv, chartContainer.nextSibling);
});
