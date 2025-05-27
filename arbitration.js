document.addEventListener('DOMContentLoaded', () => {
  // Animate KPIs
  document.querySelectorAll('.value[data-count]').forEach(el => {
    const end = parseFloat(el.getAttribute('data-count'));
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

  // Bar Chart Setup
  const ctx = document.getElementById('chart').getContext('2d');

  const gradientResolved = ctx.createLinearGradient(0, 0, 0, 300);
  gradientResolved.addColorStop(0, 'rgba(0,255,255,0.6)');
  gradientResolved.addColorStop(1, 'rgba(0,255,255,0.1)');

  const gradientSubmitted = ctx.createLinearGradient(0, 0, 0, 300);
  gradientSubmitted.addColorStop(0, 'rgba(166,77,255,0.6)');
  gradientSubmitted.addColorStop(1, 'rgba(166,77,255,0.1)');

  const gradientPeer = ctx.createLinearGradient(0, 0, 0, 300);
  gradientPeer.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradientPeer.addColorStop(1, 'rgba(0,255,178,0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Resolved Cases',
          data: [2, 5, 9, 7, 12],
          backgroundColor: gradientResolved,
          borderColor: '#00f0ff',
          borderWidth: 1
        },
        {
          label: 'Submitted Cases',
          data: [3, 6, 12, 9, 18],
          backgroundColor: gradientSubmitted,
          borderColor: '#a64dff',
          borderWidth: 1
        },
        {
          label: 'Peer Arbitrations',
          data: [0, 1, 4, 3, 6],
          backgroundColor: gradientPeer,
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
          text: 'Arbitration Case Volume & Resolution',
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
