document.addEventListener("DOMContentLoaded", () => {
  // Animate KPI values
  document.querySelectorAll(".value[data-count]").forEach(el => {
    const end = parseFloat(el.dataset.count);
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

  // Arena Bar Chart
  const ctx = document.getElementById("arenaChart").getContext("2d");

  const gradientWins = ctx.createLinearGradient(0, 0, 0, 300);
  gradientWins.addColorStop(0, 'rgba(0,240,255,0.6)');
  gradientWins.addColorStop(1, 'rgba(0,240,255,0.1)');

  const gradientStaked = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStaked.addColorStop(0, 'rgba(166,77,255,0.6)');
  gradientStaked.addColorStop(1, 'rgba(166,77,255,0.1)');

  const gradientPayouts = ctx.createLinearGradient(0, 0, 0, 300);
  gradientPayouts.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradientPayouts.addColorStop(1, 'rgba(0,255,178,0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Agent Wins',
          data: [12, 29, 61, 104, 137],
          backgroundColor: gradientWins,
          borderColor: '#00f0ff',
          borderWidth: 1
        },
        {
          label: 'Staked Challenges',
          data: [40, 95, 190, 280, 383],
          backgroundColor: gradientStaked,
          borderColor: '#a64dff',
          borderWidth: 1
        },
        {
          label: 'AIGx Awarded',
          data: [1200, 3400, 6100, 9800, 14420],
          backgroundColor: gradientPayouts,
          borderColor: '#00ffb2',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#ccc',
            font: { weight: 'bold' }
          }
        },
        title: {
          display: true,
          text: 'Arena Challenge Volume & AIGx Payouts',
          color: '#00f0ff',
          font: {
            size: 18,
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
