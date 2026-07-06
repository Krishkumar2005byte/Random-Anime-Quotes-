let panelCount = 0;
let currentQuote = "";

async function loadQuote() {

  const nameEl = document.getElementById("name");
  const quoteEl = document.getElementById("quote");
  const charEl = document.getElementById("char");
  const panelEl = document.getElementById("panel");
  const counterEl = document.getElementById("counter");

  // Restart animation
  panelEl.style.animation = "none";
  void panelEl.offsetWidth;
  panelEl.style.animation = "";

  try {

    const response = await fetch(
      "https://yurippe.vercel.app/api/quotes?random=1"
    );

    if (!response.ok)
      throw new Error("Network response was not ok");

    const dataArray = await response.json();
    const data = dataArray[0];

    currentQuote = data.quote;
    panelCount++;

    nameEl.textContent = data.show;
    quoteEl.textContent = `"${data.quote}"`;
    charEl.textContent = `— ${data.character}`;

    counterEl.textContent =
      `PANEL ${String(panelCount).padStart(3, "0")}`;

  } catch (error) {

    console.error("Error fetching quote:", error);

    quoteEl.textContent =
      "Could not load quote. Try again!";

  }

}

function narrate() {

  if (!("speechSynthesis" in window) || !currentQuote)
    return;

  const narrateBtn = document.getElementById("narrate");

  if (window.speechSynthesis.speaking) {

    window.speechSynthesis.cancel();
    narrateBtn.classList.remove("is-speaking");
    return;

  }

  const utterance = new SpeechSynthesisUtterance(currentQuote);

  utterance.rate = 0.95;
  utterance.pitch = 1;

  utterance.onstart = () =>
    narrateBtn.classList.add("is-speaking");

  utterance.onend = () =>
    narrateBtn.classList.remove("is-speaking");

  utterance.onerror = () =>
    narrateBtn.classList.remove("is-speaking");

  window.speechSynthesis.speak(utterance);

}

document
  .getElementById("next")
  .addEventListener("click", loadQuote);

document
  .getElementById("narrate")
  .addEventListener("click", narrate);

loadQuote();