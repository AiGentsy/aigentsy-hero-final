let connected = false;
function connectWallet() {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        document.getElementById("wallet-address").textContent = accounts[0];
        connected = true;
        document.getElementById("credit-balance").textContent = "740 AIGx";
        document.getElementById("withdraw-btn").style.display = "inline-block";
      })
      .catch(error => {
        console.error("MetaMask connection failed:", error);
        alert("MetaMask connection failed.");
      });
  } else {
    alert("MetaMask not found. Please install it.");
  }
}
function withdrawCredits() {
  if (connected) {
    alert("✅ Withdrawal request submitted.");
  }
}
