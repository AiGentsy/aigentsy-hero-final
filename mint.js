async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("mintResult").innerText = "Connected wallet: " + accounts[0];
    } catch (err) {
      document.getElementById("mintResult").innerText = "Wallet connection failed.";
    }
  } else {
    document.getElementById("mintResult").innerText = "MetaMask not found.";
  }
}

function mintAgent() {
  const file = document.getElementById("configUpload").files[0];
  const protocol = document.getElementById("protocolSelect").value;
  const visibility = document.getElementById("visibility").value;

  if (!file || !protocol || !visibility) {
    document.getElementById("mintResult").innerText = "Missing required fields.";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const config = reader.result;
    document.getElementById("mintResult").innerText =
      "Agent minted!\nProtocol: " + protocol + "\nVisibility: " + visibility + "\nConfig preview:\n" + config.slice(0, 200);
  };
  reader.readAsText(file);
}

// Chart.js animation
const ctx = document.getElementById("mintChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Mint Growth",
      data: [140, 280, 420, 620, 820],
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
