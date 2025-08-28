
// Tiny helper
const $ = (sel, scope=document) => scope.querySelector(sel);
const $$ = (sel, scope=document) => Array.from(scope.querySelectorAll(sel));

// Year
(() => { const y = $("#year"); if (y) y.textContent = new Date().getFullYear(); })();

// Theme toggle (persist on <body> class)
(() => {
  const body = document.body;
  const saved = localStorage.getItem("theme-mode") || "dark-mode";
  body.classList.remove("light-mode","dark-mode");
  body.classList.add(saved);
  const btn = $("#themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
      body.classList.remove("light-mode","dark-mode");
      body.classList.add(next);
      localStorage.setItem("theme-mode", next);
    });
  }
})();

// Back to top
(() => {
  const link = $("#backToTop");
  if (link) link.addEventListener("click", (e)=>{ e.preventDefault(); window.scrollTo({top:0, behavior:"smooth"}); });
})();

// Home: reveal fullstack
(() => {
  const btn = $("#revealFullstack");
  const box = $("#fullstackExplain");
  if (btn && box) btn.addEventListener("click", () => box.classList.toggle("d-none"));
})();

// HTML page: copy snippet
(() => {
  const btn = $("#copyHtml");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const code = btn.previousElementSibling.textContent;
    try {
      await navigator.clipboard.writeText(code);
      $("#copyHtmlMsg").classList.remove("d-none");
      setTimeout(()=>$("#copyHtmlMsg").classList.add("d-none"), 1400);
    } catch (e) { alert("Copy failed — " + e.message); }
  });
})();

// CSS page: toggle style + color picker
(() => {
  const btn = $("#styleToggleBtn");
  const box = document.querySelector(".demo-toggle");
  const picker = $("#colorPicker");
  const demoText = $("#cssDemo");
  if (btn && box) btn.addEventListener("click", () => box.classList.toggle("active"));
  if (picker && demoText) picker.addEventListener("input", (e)=> demoText.style.color = e.target.value);
})();

// JS page: form validation
(() => {
  const form = $("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#email");
    const msg = $("#message");
    const emailErr = $("#emailErr");
    const msgErr = $("#msgErr");
    const ok = $("#formOk");
    let valid = true;

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!pattern.test(email.value.trim())) { emailErr.classList.remove("d-none"); valid = false; } else emailErr.classList.add("d-none");
    if (msg.value.trim().length < 10) { msgErr.classList.remove("d-none"); valid = false; } else msgErr.classList.add("d-none");

    if (valid) { ok.classList.remove("d-none"); setTimeout(()=> ok.classList.add("d-none"), 1600); form.reset(); }
  });
})();

// JS page: mini calculator
(() => {
  const buttons = $$(".calc");
  const out = $("#calcOut");
  if (buttons.length && out) {
    buttons.forEach(btn => btn.addEventListener("click", () => {
      const a = parseFloat($("#num1").value);
      const b = parseFloat($("#num2").value);
      const op = btn.getAttribute("data-op");
      if (Number.isNaN(a) || Number.isNaN(b)) {
        out.className = "alert alert-warning mt-3"; out.textContent = "Enter two numbers."; out.classList.remove("d-none"); return;
      }
      let result;
      switch(op){
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b === 0 ? "∞ (cannot divide by zero)" : a / b; break;
      }
      out.className = "alert alert-info mt-3";
      out.textContent = `${a} ${op} ${b} = ${result}`;
      out.classList.remove("d-none");
    }));
  }
})();

// Bootstrap page: toast
(() => {
  const btn = $("#showToastBtn");
  const toastEl = $("#liveToast");
  if (btn && toastEl) btn.addEventListener("click", () => new bootstrap.Toast(toastEl).show());
})();

// Fullstack page: hover pills -> show info
(() => {
  const pills = $$(".pill");
  const info = $("#stackInfo");
  if (pills.length && info) {
    pills.forEach(p => p.addEventListener("mouseenter", () => {
      info.textContent = p.getAttribute("data-info");
      info.classList.remove("d-none");
    }));
    pills.forEach(p => p.addEventListener("mouseleave", () => info.classList.add("d-none")));
  }
})();
