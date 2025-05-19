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

async function fetchMovies(){
  try{

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
  movieAnswerArray = [currentMovie, ...getRandomItems(movieArray)];
}

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

    await insertMovies();
    //shuffleArray(movieAnswerArray);
    console.log(" fetched movie data")
    console.log(movieAnswerArray)
    document.querySelectorAll(".movie-button").forEach(button => {
      button.addEventListener("click", function() {
        checkMovieAnswer(this.innerText);
        // Update score/counter here
        counter++;
        const scoreCounter = document.getElementById("score-value");
        if (scoreCounter) scoreCounter.innerText = `${score}/${counter}`;
        setTimeout(() => {
          fetchRandomQuote();
        }, 500); // short delay for UX
      });
    });

    document.querySelectorAll(".character-button").forEach(button => {
      button.addEventListener("click", function() {
        checkCharAnswer(this.innerText);
        // Update score/counter here
        // const scoreCounter = document.getElementById("score-value");
        // if (scoreCounter) scoreCounter.innerText = `${score}/${counter}`;
      });
    });  

    if(button4) button4.innerText = movieAnswerArray[0];
    if(button5) button5.innerText = movieAnswerArray[1];
    if(button6) button6.innerText = movieAnswerArray[2];

    document.querySelectorAll(".character-button").forEach(button => {
      button.addEventListener("click", function() {
          checkAnswer(this.innerText);
      });
  })

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

function checkCharAnswer(selectedAnswer){
  if(selectedAnswer === currentCharacter.name){
      score = score + 0.5;
  }
}

function checkMovieAnswer(selectedAnswer){
 
}



document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch");
  const likeBtn  = document.getElementById("like-button");

  const scoreCounter = document.getElementById("score-value");
  scoreCounter.innerText = `${score}/${counter}`;
  
  
  

  if (fetchBtn) fetchBtn.addEventListener("click", fetchRandomQuote);
  if (likeBtn)  likeBtn.addEventListener("click", likeQuote);

  fetchMovies();
  fetchRandomQuote(); // eerste quote direct
});


