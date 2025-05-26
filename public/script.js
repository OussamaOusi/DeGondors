// // import { createAvatar } from '@dicebear/core';
// // import { createAvatar } from '@dicebear/collection';


// // Character data
// function initializePage() {
//     let currentCharacterIndex = 0;
//     const characterName = document.querySelector('.character-header h1');
//     const quoteElements = document.querySelectorAll('.quote-text');
//     const quoteTitles = document.querySelectorAll('.quote-title');

//     function updateContent() {
//         characterName.textContent = characters[currentCharacterIndex];
//         const currentQuotes = quotes[currentCharacterIndex];
//         quoteElements.forEach((element, index) => {
//             element.textContent = currentQuotes[index];
//             quoteTitles[index].textContent = `Quote ${index + 1}`;
//         });
//     }

//     document.getElementById('prevBtn')?.addEventListener('click', () => {
//         currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
//         updateContent();
//     });

//     document.getElementById('nextBtn')?.addEventListener('click', () => {
//         currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
//         updateContent();
//     });

//     document.querySelectorAll('nav a').forEach(link => {
//         link.addEventListener('click', function(e) {
//             document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
//             this.classList.add('active');
//         });
//     });

//     updateContent();
// }
// document.addEventListener('DOMContentLoaded', initializePage);

// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// /*
// const apiKey = "RGcOPi2oQ79fO1Ai2PGE"; // Vervang met je eigen API-sleutel
// const apiUrlQuote = "https://the-one-api.dev/v2/quote";
// const apiUrlCharacter = "https://the-one-api.dev/v2/character";

// var quoteData;
// var charData;

// function fetchQuote() {
//     return __awaiter(this, void 0, void 0, function* () {
//         try {
//             const response = yield fetch(apiUrlQuote, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiKey}`
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error("Er is een fout opgetreden bij het ophalen van de quote.");
//             }
//             const data = response.json();
//             console.log("Quote apicall jsondata: ")
//             console.log(data);
//             const randomQuoteData = data.docs[Math.floor(Math.random() * data.docs.length)];
//             quoteData = randomQuoteData;
//             const randomQuote = randomQuoteData.dialog;

//             const quoteElement = document.getElementById('quote-text');
//             console.log("Opgehaalde quote");
//             console.log(randomQuoteData)
//             console.log(randomQuote)
//             console.log(quoteElement);
//             if (quoteElement) {
//                 quoteElement.innerText = `"${randomQuote}"`;
//             }
//         }
//         catch (error) {
//             const quoteElement = document.getElementById('quote-text');
//             if (quoteElement) {
//                 quoteElement.innerText = `Fout: ${error.message}`;
//             }
//         }
//     });
// }
// fetchQuote();

// function getCharacter() {
//     try {
//         const response = fetch(apiUrlCharacter, {
//             mehtod: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`
//             }
//         });
//         if (!response.ok) {
//             throw new Error("Er is een fout opgetreden bij het ophalen van de karakters.");
//         }

//         const data = response.json();
//         console.log("Character apicall jsondata: ");
//         console.log(data);
//         charData = data.find(char => char._id === quoteData._id);
//         console.log(charData);
//     }
//     catch (error){
//         console.error("Error fetching character data:", error)
//     }
// };

// getCharacter();



// document.getElementById("fetchquotebutton").addEventListener("click", fetchQuote);
// */
// const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
// const quoteApi = "https://the-one-api.dev/v2/quote";
// const characterApi = "https://the-one-api.dev/v2/character";

// let currentQuoteData = null;
// let currentCharacterData = null;

// async function fetchRandomQuote() {
//   const quoteEl = document.getElementById("quote-text");
//   console.log("🔄 Ophalen quote…");
//   try {
//     const res = await fetch(quoteUrl, { headers:{Authorization:`Bearer ${apiKey}`} });
//     const data = await res.json();
//     const random = data.docs[Math.floor(Math.random()*data.docs.length)];
//     console.log("✅ Quote binnen:", random);
//     if (quoteEl) quoteEl.textContent = `"${random.dialog}"`;
//     currentQuote = random;
//     await fetchCharacter(random.character);
//   } catch (err) {
//     console.error("❌ Fout bij quote:", err);
//     if (quoteEl) quoteEl.textContent = "Fout bij laden quote.";
//   }
// }

// async function fetchCharacter(characterId) {
//     console.log("🔎 Ophalen character met ID:", characterId);
//     try {
//         const res = await fetch(characterUrl, {
//             headers: { Authorization: `Bearer ${apiKey}` },
//         });
//         const data = await res.json();
//         console.log("📦 Gehele character-response ontvangen:", data);

//         currentCharacter = data.docs.find(c => c._id === characterId);
//         console.log("✅ Character details gevonden:", currentCharacter);

//         // Je kunt de naam tonen op de pagina als je een element toevoegt met bv. id="character-name"
//         // document.getElementById("character-name").textContent = currentCharacter.name;
//     } catch (err) {
//         console.error("❌ Fout bij ophalen character:", err);
//     }
// }



// //Landingpage
// const wrongLandingpageImgs = document.querySelectorAll("#wrongImg");
// wrongLandingpageImgs.forEach(image => {
//     image.addEventListener('click', () => alert('Je hebt geen toegang tot dit spel!'))
// });

// //Timer 
// let timeLeft = 60;
// const timerElement = document.getElementById("timer");
// const countdown = setInterval(() => {
//     timeLeft--;
//     timerElement.textContent = timeLeft;

//     if(timeLeft <= 0){
//         clearInterval(countdown);
//         alert("De tijd is om!");
//     }
// }, 1000);

// const registeredUser = {
//     username: "admin",
//     password: "admin"
// };

// //Login form 
// const loginForm = document.getElementById("loginForm");
// if(loginForm){
//     loginForm.addEventListener("submit", function(event) {
//         event.preventDefault();
    
//         const username = document.getElementById("loginUsername").value;
//         const password = document.getElementById("loginPassword").value;
//         const errorMessage = document.getElementById("error-message");
//         // console.log(username);
//         // console.log(password); 
//         // console.log(errorMessage);
    
//         if(username === registeredUser.username && password === registeredUser.password){
//             alert("Proficiat, je bent ingelogd!");
//             window.location.href = "../index.html";
//         } else {
//             console.log("foute login")
//             if(errorMessage){
//                 errorMessage.textContent = "Foute gebruikersnaam of wachtwoord. Probeer opnieuw";
//             }
//         }
//     })
// };


// //Registration Form
// const registrationForm = document.getElementById("registrationForm");
// if(registrationForm){
//     registrationForm.addEventListener("submit", function(event) {
//         event.preventDefault(); 
//         alert("Registration successful!");
//         window.location.href = "../index.html";
//     })
// };

// function GenerateAvatar() {
//     const avatar = createAvatar(funEmoji, { seed: "Robin" }).toDataUri();
//     console.log(avatar);
//     document.getElementById("avatarimg").src = avatar;
// }

// document.getElementById("generateAvatar").addEventListener("click", GenerateAvatar)

// //like
// async function fetchCharacter(characterId) {
//     console.log("🔎 Ophalen character met ID:", characterId);
//     try {
//         const res = await fetch(characterUrl, {
//             headers: { Authorization: `Bearer ${apiKey}` },
//         });
//         const data = await res.json();
//         console.log("📦 Gehele character-response ontvangen:", data);

//         currentCharacter = data.docs.find(c => c._id === characterId);
//         console.log("✅ Character details gevonden:", currentCharacter);

//         // Je kunt de naam tonen op de pagina als je een element toevoegt met bv. id="character-name"
//         // document.getElementById("character-name").textContent = currentCharacter.name;
//     } catch (err) {
//         console.error("❌ Fout bij ophalen character:", err);
//     }
// }

// async function likeQuote() {
//     if (!currentQuote || !currentCharacter) {
//         console.warn("⚠️ Geen quote of character geladen om te liken.");
//         return;
//     }

//     const favorite = {
//         quote: currentQuote.dialog,
//         characterId: currentCharacter._id,
//         characterName: currentCharacter.name,
//         wikiUrl: currentCharacter.wikiUrl,
//         movie: currentQuote.movie || "Onbekend",
//         round: 0, // optioneel
//     };

//     console.log("📤 Versturen van favorite:", favorite);

//     try {
//         const res = await fetch("/api/favorites/like", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(favorite),
//         });

//         if (res.ok) {
//             console.log("✅ Quote succesvol geliket en opgeslagen.");
//         } else {
//             console.error("❌ Fout bij opslaan favorite:", await res.text());
//         }
//     } catch (err) {
//         console.error("❌ Netwerkfout bij liken:", err);
//     }
// }



// document.addEventListener("DOMContentLoaded", () => {
//   const quoteEl = document.getElementById("quote-text");
//   const fetchBtn = document.getElementById("fetch");
//   const likeBtn  = document.getElementById("like-button");
//   const scoreCounter = document.getElementById("score-value");
//   scoreCounter.innerText = `${score}/${counter}`;

  

//   if (!quoteEl) console.warn("⚠️ #quote-text niet gevonden");
//   if (!fetchBtn) console.warn("⚠️ #fetch niet gevonden");
//   if (!likeBtn) console.warn("⚠️ #like-button niet gevonden");

//   if (fetchBtn) {
//     fetchBtn.addEventListener("click", fetchRandomQuote);
//   }
//   if (likeBtn) {
//     likeBtn.addEventListener("click", likeQuote);
//   }

//   // Laad meteen een quote bij paginalaad
//   if (fetchBtn) fetchRandomQuote();
// });

// /*
// // Likebutton
// document.getElementById('like-button').onclick = function() {
//     window.location.href = './favorites.html';
// }

// // Dislikebutton
// document.getElementById('dislike-button').onclick = function() {
//     window.location.href = './blacklist.html';
// }
// */

// // //Leaflet
// // document.addEventListener("DOMContentLoaded", function() {
// //     var campusLocation = { lat: 51.2194, lng: 4.4028 };

// //     // Ensure the map container is available before initializing the map
// //     var map = L.map('map').setView(campusLocation, 13);

// //     // Add the OpenStreetMap tile layer
// //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //     }).addTo(map);

// //     // Add a marker to the map
// //     L.marker(campusLocation).addTo(map)
// //         .bindPopup('AP Hogeschool Campus Spoor Noord - Ellermanstraat')
// //         .openPopup();
// // });




// // // Toggle password visibility
// // const togglePassword = document.getElementById('togglePassword');
// // const passwordField = document.getElementById('loginPassword');

// // togglePassword.addEventListener('click', function() {
// //   // Toggle the input type between password and text
// //   const type = passwordField.type === 'password' ? 'text' : 'password';
// //   passwordField.type = type;
// // });
