// async function setupCharacterButtons() {
//   document.querySelectorAll(".character-button").forEach(button => {
//     button.onclick = function() {
//       checkCharAnswer(this.innerText);
//       counter++;
//       const scoreCounter = document.getElementById("score-value");
//       if (scoreCounter) scoreCounter.innerText = `${score}/${counter}`;
//       setTimeout(() => {
//         fetchRandomQuote();
//       }, 500);
//     };
//   });
// }

// async function setupMovieButtons() {
//   document.querySelectorAll(".movie-button").forEach(button => {
//     button.onclick = function() {
//       checkMovieAnswer(this.innerText);
//       counter++;
//       const scoreCounter = document.getElementById("score-value");
//       if (scoreCounter) scoreCounter.innerText = `${score}/${counter}`;
//       setTimeout(() => {
//         fetchRandomQuote();
//       }, 500);
//     };
//   });
// }

// async function loadQuoteAndCharacters() {
//   const quoteEl = document.getElementById("quote-text");
//   try {
//     const res = await fetch(quoteUrl, { headers: { Authorization: `Bearer ${apiKey}` } });
//     const data = await res.json();
//     const random = data.docs[Math.floor(Math.random() * data.docs.length)];
//     currentQuote = random;
//     if (quoteEl) quoteEl.textContent = `"${random.dialog}"`;

//     // Fetch all characters
//     const charListRes = await fetch(`${characterUrl}`, { headers:{Authorization:`Bearer ${apiKey}`} });
//     const charListData = await charListRes.json();
//     characterNames = charListData.docs.map(character => character.name);

//     // Fetch the character for the quote
//     const charRes = await fetch(`${characterUrl}/${random.character}`, { headers:{Authorization:`Bearer ${apiKey}`} });
//     const charData = await charRes.json();
//     currentCharacter = charData.docs[0];
//     answerArray = [currentCharacter.name, ...getRandomItems(characterNames)];
//     shuffleArray(answerArray);

//     const button1 = document.getElementById("button1");
//     const button2 = document.getElementById("button2");
//     const button3 = document.getElementById("button3");
//     if(button1) button1.innerText = answerArray[0];
//     if(button2) button2.innerText = answerArray[1];
//     if(button3) button3.innerText = answerArray[2];

//     setupCharacterButtons();
//   } catch (e) {
//     console.error("❌ Fout bij laden quote/character:", e);
//     if (quoteEl) quoteEl.textContent = "Fout bij laden quote.";
//   }
// }

// async function loadMoviesForQuote() {
//   await insertMovies();
//   const button4 = document.getElementById("button4");
//   const button5 = document.getElementById("button5");
//   const button6 = document.getElementById("button6");
//   if(button4) button4.innerText = movieAnswerArray[0];
//   if(button5) button5.innerText = movieAnswerArray[1];
//   if(button6) button6.innerText = movieAnswerArray[2];
//   setupMovieButtons();
// }

// async function fetchRandomQuote() {
//   await loadQuoteAndCharacters();
//   await loadMoviesForQuote();
//   console.log("✅ Quote + character geladen:", currentQuote, currentCharacter);
// }

// public/10rounds.js

const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
const quoteUrl = "https://the-one-api.dev/v2/quote";
const characterUrl = "https://the-one-api.dev/v2/character";
const movieUrl = "https://the-one-api.dev/v2/movie";

let currentQuote = null;
let currentCharacter = null;
let currentMovie = null;
let characterNames = null;
let answerArray = null;
let movieArray = null;
let movieData = null;
let movieAnswerArray = null;
let score = 0;
let counter = 0;
let currentUserId = "12345"; // Placeholder for user ID, replace with actual user ID logic
let currentMode = "10rounds";
let suddendeathActive = false;

if(window.location.pathname.includes("suddendeath")){
  currentMode = "suddendeath";
} else if (window.location.pathname.includes("blitz")){
  currentMode = "blitz";
} else if (window.location.pathname.includes("10rounds")){
  currentMode = "10rounds";
}

console.log("Current gamemode:", currentMode);

async function fetchMovies(){
  try{
    console.log(currentUserId)
    console.log("Fetching movie data")
    const res = await fetch(movieUrl, {headers: { Authorization: `Bearer ${apiKey}`}});
    const data = await res.json();
    movieData = data;
    console.log("MovieData");
    console.log(data);

    if (!data) {
      movieArray = await data.docs.map(movie => movie.name)
    }
    movieArray = data.docs.map(movie => movie.name);

    console.log("Array movies");
    console.log(movieArray);

  }
  catch (e) {
    console.log("Fout bij het laden van de films");
  }
}

async function insertMovies(){
  if(!currentQuote || !movieArray || !movieData || !movieData.docs){
    console.log("insertMovies: missing data");
    return;
  }
  // Find the movie object that matches the quote's movie ID
  let movieObj = null;
  if (currentQuote.movie) {
    movieObj = movieData.docs.find(movie => movie._id === currentQuote.movie);
  }
  currentMovie = movieObj;
  if (currentMovie) {
    console.log("Current movie for quote:", currentMovie.name);
    // Fill movieAnswerArray with the correct movie and random others
    const otherMovies = movieData.docs.filter(m => m._id !== currentMovie._id).map(m => m.name);
    movieAnswerArray = [currentMovie.name, ...getRandomItems(otherMovies)];
    shuffleArray(movieAnswerArray);
  } else {
    console.log("No matching movie found for quote.");
    // fallback: pick 3 random movies
    movieAnswerArray = getRandomItems(movieArray, 3);
    currentMovie = { name: movieAnswerArray[0] };
  }
}

async function fetchRandomQuote() {
  const quoteEl = document.getElementById("quote-text");
  console.log("🔄 Ophalen quote…");
  try {
    const res = await fetch(quoteUrl, { headers: { Authorization: `Bearer ${apiKey}` } });
    const data = await res.json();
    const filteredQuotes = data.docs.filter(q => q.dialog && q.dialog.length <= 100);
    const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
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
    updateCharacterButtons();
    await insertMovies();
    updateMovieButtons();
    // Ensure Sudden Death handlers are set up after new quote/buttons
    if (currentMode === "suddendeath") {
      setupSuddenDeathHandlers();
    }
    //shuffleArray(movieAnswerArray);
    console.log(" fetched movie data")
    console.log(movieAnswerArray)
    console.log("✅ Quote + character geladen:", currentQuote, currentCharacter);
  } catch (e) {
    console.error("❌ Fout bij laden quote/character:", e);
    if (quoteEl) quoteEl.textContent = "Fout bij laden quote.";
  }
}
function updateCharacterButtons() {
  if (!answerArray || !Array.isArray(answerArray) || answerArray.length < 3) {
    console.warn("updateCharacterButtons: answerArray is not ready", answerArray);
    return;
  }
  const buttons = ["button1", "button2", "button3"].map(id => document.getElementById(id));
  buttons.forEach((button, index) => {
    if (button) { button.innerText = answerArray[index]; }
  });
}

function updateMovieButtons() {
  if (!movieAnswerArray || !Array.isArray(movieAnswerArray) || movieAnswerArray.length < 3) {
    console.warn("updateMovieButtons: movieAnswerArray is not ready", movieAnswerArray);
    return;
  }
  const buttons = ["button4", "button5", "button6"].map(id => document.getElementById(id));
  buttons.forEach((button, index) => {
    if (button) { button.innerText = movieAnswerArray[index]; }
  });
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

function setupCharacterButtons() {
  document.querySelectorAll(".character-button").forEach(button => {
    button.removeEventListener("click", characterClickHandler);
    button.addEventListener("click", characterClickHandler);
  });
}

function setupMovieButtons() {
  document.querySelectorAll(".movie-button").forEach(button => {
    button.removeEventListener("click", movieClickHandler);
    button.addEventListener("click", movieClickHandler);
  });
}

function characterClickHandler(event) {
  checkCharAnswer(event.target.innerText);
}

function movieClickHandler(event) {
  checkMovieAnswer(event.target.innerText);
  updateCounter();
  setTimeout(fetchRandomQuote, 500);
}

function updateCounter() {
  console.log("Counter before increment:", counter);
  counter++;
  console.log("Counter after increment:", counter);
  const scoreCounter = document.getElementById("score-value");
  if (scoreCounter) {
    scoreCounter.innerText = `${score}/${counter}`;
  }
  if(counter >= 10) {
    alert("Je hebt 10 rondes gespeeld! Je score is: " + score + "/" + counter);
    sendScoreToServer(currentUserId, score, currentMode);
    score = 0;
    counter = 0;
    if (scoreCounter) scoreCounter.innerText = `${score}/${counter}`;
  }

}

function sendScoreToServer(userId, score, mode){
  fetch("/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, score, mode })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Score succesvol verzonden:", data);
  })
  .catch(err => {
    console.error("Fout bij verzenden score:", err);
  });
}

function getRandomItems(array, numItems = 2) {
  let shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numItems);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkCharAnswer(selectedAnswer){
  if(selectedAnswer === currentCharacter.name){
      score += 0.5;
  }
}

function checkMovieAnswer(selectedAnswer){
 if(selectedAnswer === currentMovie.name){
      score += 0.5;
  }
}

function startSuddenDeath() {
  suddendeathActive = true;
  score = 0;
  counter = 0;
  if (document.getElementById("score-value")) {
    document.getElementById("score-value").innerText = `${score}/${counter}`;
  }
  fetchMovies();
  fetchRandomQuote();
}

let sdSelectedChar = null;
let sdSelectedMovie = null;

function sdCharacterClickHandler(event) {
  sdSelectedChar = event.target.innerText;
  document.querySelectorAll(".character-button").forEach(b => b.classList.remove("selected"));
  event.target.classList.add("selected");
  if (sdSelectedMovie) {
    checkSuddenDeathAnswers(sdSelectedChar, sdSelectedMovie);
    sdSelectedChar = null;
    sdSelectedMovie = null;
  }
}

function sdMovieClickHandler(event) {
  sdSelectedMovie = event.target.innerText;
  document.querySelectorAll(".movie-button").forEach(b => b.classList.remove("selected"));
  event.target.classList.add("selected");
  if (sdSelectedChar) {
    checkSuddenDeathAnswers(sdSelectedChar, sdSelectedMovie);
    sdSelectedChar = null;
    sdSelectedMovie = null;
  }
}

function setupSuddenDeathHandlers() {

  document.querySelectorAll(".character-button").forEach(button => {
    button.replaceWith(button.cloneNode(true));
  });
  document.querySelectorAll(".movie-button").forEach(button => {
    button.replaceWith(button.cloneNode(true));
  });
  document.querySelectorAll(".character-button").forEach(button => {
    button.addEventListener("click", sdCharacterClickHandler);
  });
  document.querySelectorAll(".movie-button").forEach(button => {
    button.addEventListener("click", sdMovieClickHandler);
  });
}

function checkSuddenDeathAnswers(selectedChar, selectedMovie) {
  counter++;
  let correct = false;
  if (
    selectedChar === currentCharacter.name &&
    selectedMovie === currentMovie.name
  ) {
    score++;
    correct = true;
    if (document.getElementById("score-value")) {
      document.getElementById("score-value").innerText = `${score}/${counter}`;
    }
    setTimeout(fetchRandomQuote, 500);
  } else {
    suddendeathActive = false;
    if (document.getElementById("score-value")) {
      document.getElementById("score-value").innerText = `${score}/${counter}`;
    }
    alert(`Game over! Je score is: ${score}/${counter}`);
    sendScoreToServer(currentUserId, score, currentMode);
  }
}

//like verwijderen favoriet
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".delete-favorite").forEach(btn => {
    btn.addEventListener("click", async () => {
        console.log("🔴 Verwijderknop is geklikt!");
      const li = btn.closest("li");
      const id = li.dataset.id;
      if (!id) return;

      if (!confirm("Weet je zeker dat je deze quote wilt verwijderen?")) return;

      try {
        const res = await fetch(`/favorites/${id}`, { method: "DELETE" });
        const body = await res.json();
        if (res.ok && body.success) {
          li.remove();
        } else {
          alert(body.error || "Kon niet verwijderen");
        }
      } catch (e) {
        console.error("Network error bij verwijderen:", e);
      }
    });
  });
});
//dilike verwijderen blacklist
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".delete-blacklist").forEach(btn => {
    btn.addEventListener("click", async () => {
      const li = btn.closest("li");
      const id = li.dataset.id;
      if (!id) return;

      if (!confirm("Weet je zeker dat je deze quote wilt verwijderen?")) return;

      try {
        const res = await fetch(`/blacklist/${id}`, { method: "DELETE" });
        const body = await res.json();
        if (res.ok && body.success) {
          li.remove();
        } else {
          alert(body.error || "Kon niet verwijderen");
        }
      } catch (e) {
        alert("Netwerkfout bij verwijderen");
      }
    });
  });

  // Filteren (optioneel: highlight de actieve filter)
  document.querySelectorAll(".blacklist-character-name-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location = this.href;
    });
  });
});
  // if (dislikeBtn) {dislikeBtn.addEventListener("click", dislikeQuote);}
  // fetchRandomQuote();
document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch");
  const likeBtn  = document.getElementById("like-button");
  const dislikeBtn = document.getElementById("dislike-button");

  if (fetchBtn) fetchBtn.addEventListener("click", fetchRandomQuote);
  if (likeBtn)  likeBtn.addEventListener("click", likeQuote);

  if (currentMode === "suddendeath") {
    startSuddenDeath();
    setupSuddenDeathHandlers();
  } else {
    fetchMovies();
    fetchRandomQuote();
    setupCharacterButtons();
    setupMovieButtons();
  }
});

const characters = [
  { name: "Aragorn", image: "Aragorn.webp" },
  { name: "Sauron", image: "sauron.webp" },
  { name: "Gandalf", image: "GandalfGrey.webp" },
  { name: "Saruman", image: "sarumanTheWhite.png" },
  { name: "Legolas", image: "legolas.png" },
  { name: "Orc", image: "orc.png" },
  { name: "Boromir", image: "boromir.png" },
  { name: "Elven Ranger", image: "boogschutter.png" }
];

  let currentIndex = characters.findIndex(c => c.image === "boogschutter.png");

  function updateCharacter() {
    const char = characters[currentIndex];
    document.getElementById("characterImage").src = `/images/profileImages/${char.image}`;
    document.getElementById("characterName").textContent = char.name;
    document.getElementById("avatarInput").value = char.image;
  }

  function prevCharacter() {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCharacter();
  }

  function nextCharacter() {
    currentIndex = (currentIndex + 1) % characters.length;
    updateCharacter();
  }