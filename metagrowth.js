document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');

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
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
      datasets: [
        {
          label: 'Realm Adoption %',
          data: [45, 58, 69, 76, 83, 88.4],
          backgroundColor: gradient1,
          borderColor: '#00ffb2',
          borderWidth: 1
        },
        {
          label: 'Expansion Rate',
          data: [0.9, 1.2, 1.5, 1.9, 2.3, 2.6],
          backgroundColor: gradient2,
          borderColor: '#ff00aa',
          borderWidth: 1
        },
        {
          label: 'Cloning Events',
          data: [180, 460, 730, 940, 1200, 1440],
          backgroundColor: gradient3,
          borderColor: '#8000ff',
          borderWidth: 1
        },
        {
          label: 'Max Tier Spread',
          data: [2, 3, 4, 5, 6, 6],
          backgroundColor: gradient4,
          borderColor: '#00bfff',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: 'white' } },
        title: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: { color: 'white' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: 'white' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });

  document.querySelectorAll('.value[data-count]').forEach(el => {
    const count = parseFloat(el.dataset.count);
    let i = 0;
    const inc = count / 60;
    const interval = setInterval(() => {
      i += inc;
      el.textContent = count >= 1000 ? Math.floor(i).toLocaleString() : i.toFixed(1);
      if (i >= count) {
        el.textContent = count >= 1000 ? Math.floor(count).toLocaleString() : count.toFixed(1);
        clearInterval(interval);
      }
    }, 16);
  });
})
