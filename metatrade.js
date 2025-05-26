
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

  // Chart.js setup
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
          backgroundColor: context => createGradient(context, '#00f0ff'),
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Total Volume',
          data: [6000, 7500, 9300, 11200, 13000],
          borderColor: '#a64dff',
          backgroundColor: context => createGradient(context, '#a64dff'),
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Highest Valuation',
          data: [1400, 1800, 2200, 2700, 3200],
          borderColor: '#00ffb2',
          backgroundColor: context => createGradient(context, '#00ffb2'),
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#ccc' } }
      },
      scales: {
        x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });

  function createGradient(context, color) {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, color + "66");
    gradient.addColorStop(0.5, color + "33");
    gradient.addColorStop(1, color + "00");
    return gradient;
  }

  // Internal Credit Ledger
  let userCredits = 10000;  // Example starting credit balance

  window.connectWallet = async function () {
    return "user@example.eth"; // Simulated wallet identity
  };

  // Trade Modal Logic
  const modal = document.getElementById("tradeModal");
  const overlay = document.getElementById("overlay");
  let selectedAsset = null;

  window.openTradeModal = function (assetName) {
    selectedAsset = assetName;
    document.getElementById("modalAsset").innerText = assetName;
    modal.style.display = "block";
    overlay.style.display = "block";
  };

  window.closeTradeModal = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
    selectedAsset = null;
  };

  // Submit Offer with internal credit logic
  const submitBtn = modal.querySelector(".buy-btn");
  submitBtn.addEventListener("click", async () => {
    const offerInput = modal.querySelector("input[type='number']");
    const offerAmount = parseFloat(offerInput.value);
    if (!offerAmount || isNaN(offerAmount)) {
      alert("Enter a valid offer amount.");
      return;
    }

    const wallet = await window.connectWallet();
    if (!wallet) return;

    if (offerAmount > userCredits) {
      alert(`Insufficient AIGx Credits. You have ${userCredits}.`);
      return;
    }

    userCredits -= offerAmount;
    alert(`Trade confirmed: ${selectedAsset} purchased for ${offerAmount} AIGx.
New balance: ${userCredits} AIGx.`);

    window.closeTradeModal();
  });
});
