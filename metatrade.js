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

  // Chart.js with 3 metrics
  const canvas = document.getElementById('metatradeChart');
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Active Listings',
          data: [2500, 3000, 3400, 4000, 4500],
          borderColor: '#00f0ff',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Total Volume',
          data: [6000, 7200, 9100, 11000, 12700],
          borderColor: '#a64dff',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Highest Valuation',
          data: [1000, 1400, 1900, 2500, 3100],
          borderColor: '#00ffb2',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#ccc'
          }
        }
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
