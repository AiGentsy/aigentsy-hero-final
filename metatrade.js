document.addEventListener("DOMContentLoaded", () => {
  // Animate .value counters
  document.querySelectorAll(".value[data-count]").forEach(el => {
    const end = parseFloat(el.getAttribute("data-count"));
    let start = 0;
    const step = end / 60;
    const animate = () => {
      start += step;
      if (start < end) {
        el.textContent = end >= 1000 ? Math.floor(start).toLocaleString() : start.toFixed(1);
        requestAnimationFrame(animate);
      } else {
        el.textContent = end >= 1000 ? Math.floor(end).toLocaleString() : end.toFixed(1);
      }
    };
    animate();
  });

  // Chart.js setup
  const canvas = document.getElementById('metatradeChart');
  const ctx = canvas.getContext('2d');

  let gradient;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Trade Volume',
        data: [2500, 5400, 7300, 9200, 11300],
        fill: true,
        backgroundColor: context => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          if (!gradient) {
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, '#6100ff');
            gradient.addColorStop(0.5, '#ff1cf7');
            gradient.addColorStop(1, '#00f0ff');
          }
          return gradient;
        },
        borderColor: '#00f0ff',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: '#ccc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: '#ccc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
});
