document.querySelectorAll(".value").forEach(el => {
  const end = parseFloat(el.getAttribute("data-count"));
  let start = 0;
  const step = end / 60;
  const animate = () => {
    start += step;
    if (start < end) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(animate);
    } else {
      el.textContent = end.toLocaleString();
    }
  };
  animate();
});

const ctx = document.getElementById("walletChart") || document.getElementById("remixChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Activity Growth",
      data: [100, 250, 500, 620, 740],
      backgroundColor: function(context) {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "#3a0078");
        gradient.addColorStop(0.5, "#ff0080");
        gradient.addColorStop(1, "#00ffe0");
        return gradient;
      },
      borderColor: "#00d9ff",
      fill: true,
      tension: 0.3,
      pointRadius: 0
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {display: false}
    },
    scales: {
      x: {ticks: {color: "#ccc"}},
      y: {ticks: {color: "#ccc"}}
    }
  }
});
