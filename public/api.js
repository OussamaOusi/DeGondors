// public/10rounds.js
const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
const quoteUrl = "https://the-one-api.dev/v2/quote";
const characterUrl = "https://the-one-api.dev/v2/character";

let currentQuote = null;
let currentCharacter = null;

async function fetchRandomQuote() {
  const quoteEl = document.getElementById("quote-text");
  console.log("🔄 Ophalen quote…");
  try {
    const res = await fetch(quoteUrl, { headers: { Authorization: `Bearer ${apiKey}` } });
    const data = await res.json();
    const random = data.docs[Math.floor(Math.random() * data.docs.length)];
    currentQuote = random;
    if (quoteEl) quoteEl.textContent = `"${random.dialog}"`;
    // Haal character op:
    const charRes = await fetch(`${characterUrl}/${random.character}`, { headers:{Authorization:`Bearer ${apiKey}`} });
    const charData = await charRes.json();
    currentCharacter = charData.docs[0];
    console.log("✅ Quote + character geladen:", currentQuote, currentCharacter);
  } catch (e) {
    console.error("❌ Fout bij laden quote/character:", e);
    if (quoteEl) quoteEl.textContent = "Fout bij laden quote.";
  }
}

async function likeQuote() {
  if (!currentQuote || !currentCharacter) return console.warn("Nog niks geladen om te liken");
  const favorite = {
    quote: currentQuote.dialog,
    characterId: currentCharacter._id,
    characterName: currentCharacter.name,
    wikiUrl: currentCharacter.wikiUrl,
    movie: currentQuote.movie
  };
  console.log("📤 Like versturen:", favorite);
  try {
    const res = await fetch("/api/rounds/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favorite)
    });
    console.log("↪ Server antwoord:", await res.text());
  } catch (e) {
    console.error("❌ Network error bij like:", e);
  }
}
async function dislikeQuote() {
  console.log("🔄 dislikeQuote() aangeroepen");
  if (!currentQuote || !currentCharacter) {
    console.warn("⚠️ Geen quote/character geladen");
    return;
  }

  const reason = prompt("Waarom vind je deze quote niet leuk?");
  console.log("📋 Prompt returned:", reason);
  if (!reason) {
    alert("Je moet een reden invullen.");
    return;
  }

  const payload = {
    quote: currentQuote.dialog,
    characterId: currentCharacter._id,
    characterName: currentCharacter.name,
    wikiUrl: currentCharacter.wikiUrl,
    movie: currentQuote.movie,
    reason
  };
  console.log("📤 Sending dislike payload:", payload);

  try {
    const res = await fetch("/api/rounds/dislike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("↪ Server response status:", res.status);
    console.log("↪ Server response body:", await res.text());
  } catch (err) {
    console.error("❌ Network error in dislikeQuote:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dislikeBtn = document.getElementById("dislike-button");
  if (dislikeBtn) {
    dislikeBtn.addEventListener("click", dislikeQuote);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch");
  const likeBtn  = document.getElementById("like-button");
  const dislikeBtn = document.getElementById("dislike-button");
  
  if (fetchBtn) fetchBtn.addEventListener("click", fetchRandomQuote);
  if (likeBtn)  likeBtn.addEventListener("click", likeQuote);
  if (dislikeBtn) {dislikeBtn.addEventListener("click", dislikeQuote);}
  fetchRandomQuote();
});
