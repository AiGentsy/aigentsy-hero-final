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
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
      datasets: [
        {
          label: 'Zones Protected',
          data: [880, 940, 1020, 1100, 1180, 1220],
          backgroundColor: gradient1,
          borderColor: '#00ffb2',
          borderWidth: 1
        },
        {
          label: 'Threats Blocked',
          data: [30500, 42000, 53000, 64000, 75000, 82140],
          backgroundColor: gradient2,
          borderColor: '#ff00aa',
          borderWidth: 1
        },
        {
          label: 'Isolation Events',
          data: [260, 510, 740, 1020, 1220, 1442],
          backgroundColor: gradient3,
          borderColor: '#8000ff',
          borderWidth: 1
        },
        {
          label: 'Active Sentinels',
          data: [80, 140, 210, 260, 300, 320],
          backgroundColor: gradient4,
          borderColor: '#00bfff',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: 'white' } }
      },
      scales: {
        x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { beginAtZero: true, ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.05)' } }
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
});
