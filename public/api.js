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
  if(!currentQuote || !movieArray || movieData){
    console.log("test")
   currentMovie = await movieArray.find(quote => quote.movie === movieData.docs._id);
  }
  console.log("insert movie function:")
  console.log(`current quote: ${currentQuote}`);
  console.log(`movie array: ${movieArray}`);
  console.log(`movie data: ${movieData}`);
  currentMovie = movieArray.find(quote => quote.movie === movieData.docs._id);
  console.log("Current movie:", currentMovie.name);
  movieAnswerArray = [currentMovie, ...getRandomItems(movieArray)];
}

async function fetchRandomQuote() {
  const quoteEl = document.getElementById("quote-text");
  console.log("🔄 Ophalen quote…");
  try {
    const res = await fetch(quoteUrl, { headers: { Authorization: `Bearer ${apiKey}` } });
    const data = await res.json();
    // Filter quotes to only those with 100 characters or less
    const filteredQuotes = data.docs.filter(q => q.dialog && q.dialog.length <= 100);
    if (filteredQuotes.length === 0) {
      if (quoteEl) quoteEl.textContent = "Geen korte quotes gevonden.";
      return;
    }
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
  const buttons = ["button1", "button2", "button3"].map(id => document.getElementById(id));
  buttons.forEach((button, index) => {
    if (button) { button.innerText = answerArray[index]; }
})
}

function updateMovieButtons() {
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
  if(counter >= 10 && currentMode === "10rounds"){ {
    // alert("Je hebt 10 rondes gespeeld! Je score is: " + score + "/" + counter);
    sendScoreToServer(currentUserId, score, currentMode);
    if (typeof showEndQuizPopup === 'function') {
      showEndQuizPopup(score, currentMode);
    } else {
      setTimeout(() => showEndQuizPopup(score, currentMode), 100);
    }
    score = 0;
    counter = 0;
    if (scoreCounter) scoreCounter.innerText = `${score}/${counter}`;
  }}
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
    // alert(`Game over! Je score is: ${score}/${counter}`);
    sendScoreToServer(currentUserId, score, currentMode);
    if (typeof showEndQuizPopup === 'function') {
      showEndQuizPopup(score, currentMode);
    } else {
      setTimeout(() => showEndQuizPopup(score, currentMode), 100);
    }
  }
}

// Add popup HTML to the page (only once)
function showEndQuizPopup(score, mode) {
  let popup = document.getElementById('end-quiz-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'end-quiz-popup';
    popup.innerHTML = `
      <div class="end-quiz-popup-content">
        <h2>Quiz afgelopen!</h2>
        <p>Je score is: <strong>${score}</strong></p>
        <button id="play-again-btn">Speel opnieuw</button>
        <button id="to-leaderboard-btn">Bekijk leaderboard</button>
      </div>
    `;
    document.body.appendChild(popup);
    // Basic styles for popup
    const style = document.createElement('style');
    style.innerHTML = `
      #end-quiz-popup {
        position: fixed; 
        z-index: 9999; 
        top: 0; 
        left: 0; 
        width: 100vw; 
        height: 100vh;
        background: rgba(10,10,10,0.92); 
        display: flex; 
        align-items: center; 
        justify-content: center;
      }
      .end-quiz-popup-content {
        background: linear-gradient(135deg, #23211a 80%, #bfa53422 100%);
        color: #f8e6da;
        border-radius: 18px;
        padding: 2.5rem 2rem 2rem 2rem;
        box-shadow: 0 8px 32px #000c, 0 0 0 8px #bfa53433;
        text-align: center;
        min-width: 260px;
        max-width: 90vw;
        letter-spacing: 1px;
        font-family: 'Cinzel', 'Segoe UI', serif;
        text-shadow: 0 2px 8px #000a;
        font-size: 1.7rem;
        border: 2px solid #bfa53455;
      }
      .end-quiz-popup-content h2 {
        color: #ffd700;
        margin-bottom: 1rem;
        text-shadow: 0 2px 8px #000, 0 0 12px #bfa53455;
      }
      .end-quiz-popup-content p {
        color: #f8e6da;
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        text-shadow: 0 1px 4px #000a;
      }
      .end-quiz-popup-content button {
        margin: 1.2rem 0.7rem 0 0.7rem;
        padding: 0.7rem 1.7rem;
        font-size: 1.1rem;
        border-radius: 8px; border: none;
        background: linear-gradient(90deg, #bfa534 60%, #46371b 100%);
        color: #fffbe9;
        font-family: inherit;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 2px 8px #0006;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
      }
      .end-quiz-popup-content button:hover {
        background: linear-gradient(90deg, #46371b 60%, #bfa534 100%);
        color: #ffd700;
        box-shadow: 0 4px 16px #bfa53444;
      }
    `;
    document.head.appendChild(style);
  } else {
    popup.querySelector('p').innerHTML = `Je score is: <strong>${score}</strong>`;
    popup.style.display = 'flex';
  }
  // Button handlers
  document.getElementById('play-again-btn').onclick = function() {
    popup.style.display = 'none';
    if (mode === 'blitz') {
      window.location.reload();
    } else if (mode === '10rounds') {
      window.location.reload();
    } else if (mode === 'suddendeath') {
      window.location.reload();
    }
  };
  document.getElementById('to-leaderboard-btn').onclick = function() {
    window.location.href = '/leaderboards';
  };
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

//timer
let timeleft = 60;
const timerElement = document.getElementById("timer");
if(currentMode === "blitz"){
const countdown = setInterval(() => {
    timeleft--;
    timerElement.textContent = timeleft;
    if(timeleft <= 0){
      timeleft = 60;
      // alert("De tijd is om!");
      sendScoreToServer(currentUserId, score, currentMode);
      score = 0;
      counter = 0;
      if (typeof showEndQuizPopup === 'function') {
        showEndQuizPopup(score, currentMode);
      } else {
        // fallback: show popup anyway
        setTimeout(() => showEndQuizPopup(score, currentMode), 100);
      }
      clearInterval(countdown);
    }
}, 1000);}