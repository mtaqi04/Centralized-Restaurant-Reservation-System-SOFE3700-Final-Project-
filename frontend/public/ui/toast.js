// /frontend/public/ui/toast.js

const TOAST_DURATION_MS = 5000;

export function showToast(message, type = "error") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;

  const textSpan = document.createElement("span");
  textSpan.className = "toast__message";
  textSpan.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast__close";
  closeBtn.type = "button";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    toast.classList.add("toast--closing");
    setTimeout(() => toast.remove(), 150);
  });

  toast.appendChild(textSpan);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.isConnected) {
      toast.classList.add("toast--closing");
      setTimeout(() => toast.remove(), 150);
    }
  }, TOAST_DURATION_MS);
}
