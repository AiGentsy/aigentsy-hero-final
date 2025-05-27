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

  // Bar Chart
  const ctx = document.getElementById('marketChart').getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, 'rgba(0,255,170,0.6)');
  gradient1.addColorStop(1, 'rgba(0,255,170,0.1)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, 'rgba(255,0,150,0.6)');
  gradient2.addColorStop(1, 'rgba(255,0,150,0.1)');

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, 'rgba(120,0,255,0.6)');
  gradient3.addColorStop(1, 'rgba(120,0,255,0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Agent Earnings',
          data: [5000, 10000, 15000, 21000, 27000, 30000],
          backgroundColor: gradient1,
          borderColor: '#00ffb2',
          borderWidth: 1
        },
        {
          label: 'Vault Growth',
          data: [400, 700, 950, 1200, 1400, 1600],
          backgroundColor: gradient2,
          borderColor: '#ff1cf7',
          borderWidth: 1
        },
        {
          label: 'MetaVenture Activity',
          data: [12, 18, 26, 35, 44, 51],
          backgroundColor: gradient3,
          borderColor: '#a64dff',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#ccc', font: { weight: 'bold' } }
        },
        title: {
          display: true,
          text: 'Agent Earnings, Vault Growth & MetaVenture Activity',
          color: '#00f0ff',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#ccc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#ccc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
});
