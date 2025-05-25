document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('metatradeChart');
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Active Listings',
          data: [2500, 3000, 3400, 4000, 4400],
          borderColor: '#00f0ff',
          backgroundColor: function(context) {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Total Volume',
          data: [6000, 7500, 9300, 11200, 13000],
          borderColor: '#a64dff',
          backgroundColor: function(context) {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(166, 77, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(166, 77, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(166, 77, 255, 0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Highest Valuation',
          data: [1400, 1800, 2200, 2700, 3200],
          borderColor: '#00ffb2',
          backgroundColor: function(context) {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(0, 255, 178, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 255, 178, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 255, 178, 0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#ccc' }
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

  // KPI animation
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
});
