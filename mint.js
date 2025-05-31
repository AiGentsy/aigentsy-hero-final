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
  const protocol = document.getElementById("protocolSelect")?.value;
  const visibility = document.getElementById("visibility")?.value;

  if (!file || !protocol || !visibility) {
    document.getElementById("mintResult").innerText = "Missing required fields.";
    return;
  }

  // ✅ Consent fallback — should already exist from modal
  const username = localStorage.getItem("aigentsy_username");
  const consented = localStorage.getItem("aigentsy_consent");

  if (!username || consented !== "true") {
    alert("Consent or username missing. Please refresh and complete onboarding.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const config = reader.result;

    const newUser = {
      id: `User #${Math.floor(Date.now() / 1000)}`,
      wallet: "0x0",
      referral: "chatgpt5",
      trait: "Autonomous Mapper",
      staked: false,
      mintTime: new Date().toISOString(),
      role: "Agent",
      sdkAccess: false,
      vaultAccess: true,
      remixUnlocked: true,
      cloneLineage: [],
      originIP: "placeholder",
      platform: "Desktop",
      browser: "Chrome",
      device: "Mac",
      protocol,
      visibility,
      consent: {
        agreed: true,
        username,
        timestamp: new Date().toISOString()
      }
    };

    document.getElementById("mintResult").innerText =
      `✅ Agent Minted!\nUsername: ${username}\nProtocol: ${protocol}\nVisibility: ${visibility}\nPreview:\n${config.slice(0, 200)}`;

    try {
      const res = await fetch("https://api.jsonbin.io/v3/b/6839b3328960c979a5a317b5/latest", {
        headers: {
          "X-Master-Key": "$2a$10$RNYHoP5nCS9wVlj1PizQcOfZTHPM4XA/J4LE/E.p/CuxSnxyySKRe"
        }
      });

      const data = await res.json();
      const currentUsers = data.record || [];
      const updatedUsers = [...currentUsers, newUser];

      await fetch("https://api.jsonbin.io/v3/b/6839b3328960c979a5a317b5", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$RNYHoP5nCS9wVlj1PizQcOfZTHPM4XA/J4LE/E.p/CuxSnxyySKRe"
        },
        body: JSON.stringify(updatedUsers)
      });

      console.log("✅ JSONBin updated with full agent + consent profile.");
    } catch (err) {
      console.error("❌ JSONBin update failed:", err);
    }
  };

  reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", () => {
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

  document.querySelectorAll(".value[data-count]").forEach(el => {
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
