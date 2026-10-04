/* =====================================================================
   DAY 18 · char-counter.js · Update a counter on every 'input' event
   ===================================================================== */

const bio = document.getElementById('bio');
const counter = document.getElementById('bio-counter');
const max = Number(bio.getAttribute('maxlength'));    // read the limit from the HTML: 160

function updateCounter() {
  const used = bio.value.length;
  const left = max - used;
  counter.textContent = `${used} / ${max}`;
  counter.classList.toggle('is-near', left <= 20 && left > 0);   // toggle(name, force): on if true, off if false
  counter.classList.toggle('is-full', left === 0);
}

bio.addEventListener('input', updateCounter);   // 'input': every change. ('change' would wait until you leave the box)
updateCounter();
