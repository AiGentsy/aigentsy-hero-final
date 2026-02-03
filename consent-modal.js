// consent-modal.js — Server-side consent check (no client-side keys)
(async function enforceConsent() {
  const username = localStorage.getItem("aigentsyUsername") || "";
  if (!username) return; // No user — nothing to check

  try {
    const res = await fetch(
      `https://aigentsy-ame-runtime.onrender.com/api/consent-check?username=${encodeURIComponent(username)}`
    );

    if (!res.ok) {
      console.warn("Consent check unavailable — allowing access");
      return;
    }

    const data = await res.json();

    // Only block when backend explicitly confirms non-compliance
    if (data.compliant === false) {
      if (!document.getElementById("consentBanner")) {
        const banner = document.createElement("div");
        banner.id = "consentBanner";
        banner.innerHTML = `
          <div style="position:fixed;top:0;left:0;width:100%;background:#0e101a;color:#fff;text-align:center;padding:16px 10px;z-index:9999;font-family:'Inter',sans-serif;border-bottom:1px solid #222;">
            Terms & Legal Consent Required. Please <a href="/" style="color:#00bfff;text-decoration:underline;">return to signup</a> and agree to proceed.
          </div>
        `;
        document.body.appendChild(banner);
      }
    }
  } catch (err) {
    // On fetch error, log warning and allow page access (fix bricking)
    console.warn("Consent check error — allowing access:", err.message);
  }
})();
