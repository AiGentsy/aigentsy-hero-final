// ──────────────────────────────────────────────────────────────────────────────
//  mint.js — Overlaid Upgrades for Trait + Optional File + Post-Mint Modal
// ──────────────────────────────────────────────────────────────────────────────

// 1. connectWallet(): unchanged
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

// 2. mintAgent(): updated to:
//    • Capture trait from dropdown (default to "Autonomous Mapper")
//    • Protocol & Visibility remain required
//    • File is truly optional
//    • Save newUser to JSONBin, then trigger post-mint modal
// AME-Integrated Mint Logic
async function mintAgent() {
  const traitDropdown = document.getElementById("traitSelect");
  const trait = traitDropdown && traitDropdown.value ? traitDropdown.value : "Autonomous Mapper";
  const protocol = document.getElementById("protocolSelect")?.value;
  const visibility = document.getElementById("visibility")?.value;
  const username = localStorage.getItem("aigentsyUsername") || "unknown";

  if (!protocol || !visibility) {
    document.getElementById("mintResult").innerText = 
      "Missing required fields: protocol or visibility.";
    return;
  }

  const fileInput = document.getElementById("configUpload");
  const file = fileInput && fileInput.files[0] ? fileInput.files[0] : null;

  const config = file ? await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  }) : null;

  // Call AME runtime API first
  const payload = {
    input: `Minting agent with trait: ${trait}, protocol: ${protocol}, visibility: ${visibility}, by: ${username}`
  };

  try {
    const response = await fetch("https://YOUR-RUNTIME-ENDPOINT-HERE/api/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const output = data.output || "[No agent output received]";
    document.getElementById("mintResult").innerText = `✅ Agent minted: ${output}`;
    showMintModal();
  } catch (err) {
    console.error("❌ AME runtime call failed:", err);
    document.getElementById("mintResult").innerText = "❌ Agent runtime trigger failed.";
  }

  const newUser = {
    id: `User #${Math.floor(Date.now() / 1000)}`,
    wallet: "0x0",
    referral: "chatgpt5",
    trait: trait,
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
    protocol: protocol,
    visibility: visibility,
    consent: {
      agreed: true,
      username: username,
      timestamp: new Date().toISOString()
    }
  };

  try {
    const res = await fetch("https://api.jsonbin.io/v3/b/6839b3328960c979a5a317b5/latest", {
      headers: { "X-Master-Key": "$2a$10$RNYHoP5nCS9wVlj1PizQcOfZTHPM4XA/J4LE/E.p/CuxSnxyySKRe" }
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

    console.log("✅ JSONBin updated with new agent profile.");
  } catch (err) {
    console.error("❌ JSONBin update failed:", err);
  }

  showConsentModal();
}
// 3. doMint(): Writes to JSONBin and then shows the consent modal
async function doMint({ trait, protocol, visibility, config }) {
  // a) Build the user profile for JSONBin
  //    We're using localStorage keys "aigentsyUsername" and "aigentsyUserConsent" for post-mint consent
  const usernameStored = localStorage.getItem("aigentsyUsername") || "unknown";
  const newUser = {
    id: `User #${Math.floor(Date.now() / 1000)}`,
    wallet: "0x0",
    referral: "chatgpt5",
    trait: trait,
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
    protocol: protocol,
    visibility: visibility,
    consent: {
      agreed: true,
      username: usernameStored,
      timestamp: new Date().toISOString()
    }
  };

  // b) Show immediate success message (preview config if available)
  document.getElementById("mintResult").innerText =
    `✅ Agent Minted!\nTrait: ${trait}\nProtocol: ${protocol}\nVisibility: ${visibility}\nPreview:\n${config ? config.slice(0, 200) : "{}"}`;

  showMintModal();

  // c) Fetch existing record and append newUser
  try {
    const res = await fetch("https://api.jsonbin.io/v3/b/6839b3328960c979a5a317b5/latest", {
      headers: { "X-Master-Key": "$2a$10$RNYHoP5nCS9wVlj1PizQcOfZTHPM4XA/J4LE/E.p/CuxSnxyySKRe" }
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

    console.log("✅ JSONBin updated with new agent profile.");
  } catch (err) {
    console.error("❌ JSONBin update failed:", err);
  }

  // d) Trigger the post-mint legal/terms modal
  showConsentModal();
}

// 4. showConsentModal(): defined in HTML; simply expose here if needed
//    (No changes needed since HTML already provides it.)

// 5. Chart and KPI animation: unchanged
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
          font: { size: 16, weight: "bold" },
          padding: { top: 10, bottom: 20 }
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

// 6. Clone and Invite logic: unchanged
function initiateClone() {
  // (Your existing clone logic here)
  alert("Cloning logic executed.");
}

function sendInvite() {
  const email = document.getElementById("inviteEmail")?.value;
  if (!email) {
    alert("Please enter an email to send an invite.");
    return;
  }
  // (Your existing invite-sending logic here)
  alert(`Invite sent to ${email}!`);
}
