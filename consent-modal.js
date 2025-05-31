// consent-modal.js
(async function enforceConsent() {
  const binUrl = "https://api.jsonbin.io/v3/b/6839b3328960c979a5a317b5/latest";
  const binKey = "$2a$10$RNYHoP5nCS9wVlj1PizQcOfZTHPM4XA/J4LE/E.p/CuxSnxyySKRe";

  const res = await fetch(binUrl, {
    headers: { "X-Master-Key": binKey }
  });

  const data = await res.json();
  const users = data.record;
  const currentUserAgent = navigator.userAgent.toLowerCase();

  const nonCompliant = users.find(u => u.consent?.agreed !== true && currentUserAgent.includes(u.browser.toLowerCase()));

  if (nonCompliant) {
    if (!document.getElementById("consentBanner")) {
      const banner = document.createElement("div");
      banner.id = "consentBanner";
      banner.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;background:#290000;color:#fff;text-align:center;padding:16px 10px;z-index:9999;font-family:sans-serif;">
          ⚖️ Terms & Legal Consent Required. Please <a href="/mint" style="color:#00f0ff;text-decoration:underline;">return to Mint</a> and agree to proceed.
        </div>
      `;
      document.body.appendChild(banner);
    }

    document.querySelectorAll("a, button, input, select, textarea").forEach(el => {
      el.disabled = true;
      el.style.pointerEvents = "none";
      el.style.opacity = "0.5";
    });
  }
})();
