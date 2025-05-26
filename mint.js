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
  const protocolSelect = document.getElementById("protocolSelect");
  const visibilitySelect = document.getElementById("visibility");

  const protocol = protocolSelect ? protocolSelect.value : null;
  const visibility = visibilitySelect ? visibilitySelect.value : null;

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

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("mintChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

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

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Agents Minted",
          data: [140, 280, 420, 620, 820],
          borderColor: "#00f0ff",
          backgroundColor: context => createGradient(context, "#00f0ff"),
          borderWidth: 1
        },
        {
          label: "Conversion Rate (%)",
          data: [18, 22, 30, 35, 42],
          borderColor: "#a64dff",
          backgroundColor: context => createGradient(context, "#a64dff"),
          borderWidth: 1
        },
        {
          label: "Avg Earnings/Agent",
          data: [200, 360, 520, 690, 820],
          borderColor: "#00ffb2",
          backgroundColor: context => createGradient(context, "#00ffb2"),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#ccc" }
        },
        title: {
          display: true,
          text: "Mint Volume, Success Rate & Earnings",
          color: "#00f0ff",
          font: {
            size: 16,
            weight: "bold"
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#ccc" },
          grid: { color: "rgba(255,255,255,0.05)" }
        },
        y: {
          ticks: { color: "#ccc" },
          grid: { color: "rgba(255,255,255,0.05)" }
        }
      }
    }
  });
});
