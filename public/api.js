// public/10rounds.js
const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
const quoteUrl = "https://the-one-api.dev/v2/quote";
const characterUrl = "https://the-one-api.dev/v2/character";

let currentQuote = null;
let currentCharacter = null;
let characterNames = null;
let answerArray = null;
let movieArray = ["The Fellowship Of The Ring","The Two Towers","The Return Of The King"];

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
    const charListRes = await fetch(`${characterUrl}`, { headers:{Authorization:`Bearer ${apiKey}`} });
    const charListData = await charListRes.json();
    characterNames = charListData.docs.map(character => character.name);
    console.log("Lijst van alle character namen");
    console.log(characterNames);
    const charRes = await fetch(`${characterUrl}/${random.character}`, { headers:{Authorization:`Bearer ${apiKey}`} });
    const charData = await charRes.json();
    currentCharacter = charData.docs[0];
    answerArray = [currentCharacter.name, ...getRandomItems(characterNames)]
    shuffleArray(answerArray);
    console.log("Answer array")
    console.log(answerArray)
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");

    if(button1) button1.innerText = answerArray[0];
    if(button2) button2.innerText = answerArray[1];
    if(button3) button3.innerText = answerArray[2];

    const button4 = document.getElementById("button4");
    const button5 = document.getElementById("button5");
    const button6 = document.getElementById("button6");

    shuffleArray(movieArray);

    if(button4) button4.innerText = movieArray[0];
    if(button5) button5.innerText = movieArray[1];
    if(button6) button6.innerText = movieArray[2];

    console.log("✅ Quote + character geladen:", currentQuote, currentCharacter);
  } catch (e) {
    console.error("❌ Fout bij laden quote/character:", e);
    if (quoteEl) quoteEl.textContent = "Fout bij laden quote.";
  }
}

async function likeQuote() {
  if (!currentQuote || !currentCharacter) return console.warn("Nog niets geladen om te liken");
  const favorite = {
    quote: currentQuote.dialog,
    characterId: currentCharacter._id,
    characterName: currentCharacter.name,
    wikiUrl: currentCharacter.wikiUrl,
    movie: currentQuote.movie
  };
  console.log("📤 Like versturen:", favorite);
  try {
    const res = await fetch("/api/favorites/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favorite)
    });
    console.log("↪ Server antwoord:", await res.text());
  } catch (e) {
    console.error("❌ Network error bij like:", e);
  }
}

function getRandomItems(array, numItems = 2) {
  let shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numItems);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

 function fillButtons(){
  
try{
  // console.log("AnswerArray:")
  // console.log(answerArray);
  // //shuffleArray(answerArray);
  // console.log("Shuffled answerArray")
  // console.log(answerArray);
}
catch(e) {
  console.error("fillButtons failed")
}
}



document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch");
  const likeBtn  = document.getElementById("like-button");
  
  

  if (fetchBtn) fetchBtn.addEventListener("click", fetchRandomQuote);
  if (likeBtn)  likeBtn.addEventListener("click", likeQuote);

  fetchRandomQuote(); // eerste quote direct
});

fillButtons();
