(() => {
  const script = document.currentScript;
  const projectKey = script?.getAttribute("data-project-key");

  if (!projectKey) {
    console.error("Feedback Widget: Missing data-project-key attribute");
    return;
  }

  const API_URL = script.src.replace(
    "/widget/feedback-widget.js",
    "/api/widget/feedback",
  );

  const styles = `
    .fw-trigger {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #6366f1;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      transition: transform 0.2s, background 0.2s;
    }
    .fw-trigger:hover {
      transform: scale(1.05);
      background: #4f46e5;
    }
    .fw-trigger svg {
      width: 24px;
      height: 24px;
      fill: white;
    }
    .fw-modal {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 360px;
      max-width: calc(100vw - 40px);
      background: #18181b;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 9999;
      display: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #fafafa;
    }
    .fw-modal.open {
      display: block;
      animation: fw-slide-up 0.2s ease-out;
    }
    @keyframes fw-slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fw-header {
      padding: 16px;
      border-bottom: 1px solid #27272a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .fw-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    .fw-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: #a1a1aa;
    }
    .fw-close:hover {
      color: #fafafa;
    }
    .fw-body {
      padding: 16px;
    }
    .fw-types {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .fw-type-btn {
      flex: 1;
      padding: 10px;
      border: 1px solid #27272a;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: #a1a1aa;
      font-size: 12px;
      transition: all 0.2s;
    }
    .fw-type-btn:hover {
      border-color: #3f3f46;
      color: #fafafa;
    }
    .fw-type-btn.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
    }
    .fw-type-btn svg {
      width: 20px;
      height: 20px;
    }
    .fw-textarea {
      width: 100%;
      min-height: 100px;
      padding: 12px;
      border: 1px solid #27272a;
      border-radius: 8px;
      background: #09090b;
      color: #fafafa;
      font-size: 14px;
      resize: vertical;
      margin-bottom: 12px;
      box-sizing: border-box;
    }
    .fw-textarea:focus {
      outline: none;
      border-color: #6366f1;
    }
    .fw-textarea::placeholder {
      color: #52525b;
    }
    .fw-actions {
      display: flex;
      gap: 8px;
    }
    .fw-screenshot-btn {
      padding: 10px 16px;
      border: 1px solid #27272a;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      color: #a1a1aa;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .fw-screenshot-btn:hover {
      border-color: #3f3f46;
      color: #fafafa;
    }
    .fw-screenshot-btn.has-screenshot {
      border-color: #22c55e;
      color: #22c55e;
    }
    .fw-submit-btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      background: #6366f1;
      border-radius: 8px;
      cursor: pointer;
      color: white;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .fw-submit-btn:hover {
      background: #4f46e5;
    }
    .fw-submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .fw-success {
      text-align: center;
      padding: 32px 16px;
    }
    .fw-success svg {
      width: 48px;
      height: 48px;
      color: #22c55e;
      margin-bottom: 12px;
    }
    .fw-success h4 {
      margin: 0 0 8px;
      font-size: 16px;
    }
    .fw-success p {
      margin: 0;
      color: #a1a1aa;
      font-size: 14px;
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const container = document.createElement("div");
  container.id = "feedback-widget";
  container.innerHTML = `
    <button class="fw-trigger" aria-label="Open feedback">
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
    </button>
    <div class="fw-modal">
      <div class="fw-header">
        <h3>Send Feedback</h3>
        <button class="fw-close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="fw-body">
        <div class="fw-form">
          <div class="fw-types">
            <button class="fw-type-btn active" data-type="bug">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 8h-1.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H5v2h1.09c-.05.33-.09.66-.09 1v1H5v2h1v1c0 .34.04.67.09 1H5v2h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19v-2h-1.09c.05-.33.09-.66.09-1v-1h1v-2h-1v-1c0-.34-.04-.67-.09-1H19V8zm-6 8h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              Bug
            </button>
            <button class="fw-type-btn" data-type="idea">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
              Idea
            </button>
            <button class="fw-type-btn" data-type="other">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
              Other
            </button>
          </div>
          <textarea class="fw-textarea" placeholder="Tell us what's on your mind..."></textarea>
          <div class="fw-actions">
            <button class="fw-screenshot-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              Screenshot
            </button>
            <button class="fw-submit-btn">Send Feedback</button>
          </div>
        </div>
        <div class="fw-success" style="display: none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h4>Thank you!</h4>
          <p>Your feedback has been received.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const trigger = container.querySelector(".fw-trigger");
  const modal = container.querySelector(".fw-modal");
  const closeBtn = container.querySelector(".fw-close");
  const typeButtons = container.querySelectorAll(".fw-type-btn");
  const textarea = container.querySelector(".fw-textarea");
  const screenshotBtn = container.querySelector(".fw-screenshot-btn");
  const submitBtn = container.querySelector(".fw-submit-btn");
  const formEl = container.querySelector(".fw-form");
  const successEl = container.querySelector(".fw-success");

  let selectedType = "bug";
  let screenshotData = null;

  trigger.addEventListener("click", () => {
    modal.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      for (const b of typeButtons) {
        b.classList.remove("active");
      }
      btn.classList.add("active");
      selectedType = btn.dataset.type;
    });
  });

  screenshotBtn.addEventListener("click", async () => {
    if (screenshotData) {
      screenshotData = null;
      screenshotBtn.classList.remove("has-screenshot");
      screenshotBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        Screenshot
      `;
      return;
    }

    modal.classList.remove("open");

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true,
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      for (const t of stream.getTracks()) {
        t.stop();
      }

      screenshotData = canvas.toDataURL("image/png");
      screenshotBtn.classList.add("has-screenshot");
      screenshotBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Remove
      `;
    } catch (_e) {
      console.log("Screenshot cancelled");
    }

    modal.classList.add("open");
  });

  submitBtn.addEventListener("click", async () => {
    const message = textarea.value.trim();
    if (!message) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectKey,
          type: selectedType,
          message,
          image: screenshotData,
          metadata: {
            url: window.location.href,
            userAgent: navigator.userAgent,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
          },
        }),
      });

      if (response.ok) {
        formEl.style.display = "none";
        successEl.style.display = "block";

        setTimeout(() => {
          modal.classList.remove("open");
          setTimeout(() => {
            formEl.style.display = "block";
            successEl.style.display = "none";
            textarea.value = "";
            screenshotData = null;
            screenshotBtn.classList.remove("has-screenshot");
            screenshotBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              Screenshot
            `;
          }, 300);
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send feedback");
      }
    } catch (_e) {
      alert("Failed to send feedback");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Feedback";
  });
})();
