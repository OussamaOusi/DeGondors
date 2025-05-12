// // public/script.ts

// // Character data
// const characters = ['Gandalf', 'Aragorn', 'Frodo', 'Sam', 'Legolas'];
// const quotes = [
//   [
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
//   ],
//   [
//     "Duis aute irure dolor in reprehenderit in voluptate velit.",
//     "Excepteur sint occaecat cupidatat non proident.",
//     "Sunt in culpa qui officia deserunt mollit anim id est laborum."
//   ],
//   [
//     "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
//     "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
//     "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet."
//   ],
//   [
//     "At vero eos et accusamus et iusto odio dignissimos ducimus.",
//     "Qui blanditiis praesentium voluptatum deleniti atque corrupti.",
//     "Et harum quidem rerum facilis est et expedita distinctio."
//   ],
//   [
//     "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
//     "Itaque earum rerum hic tenetur a sapiente delectus.",
//     "Ut aut reiciendis voluptatibus maiores alias consequatur."
//   ]
// ];

// // function initializePage() {
// //   let currentCharacterIndex = 0;
// //   const characterName = document.querySelector('.character-header h1') as HTMLElement;
// //   const quoteElements = document.querySelectorAll('.quote-text');
// //   const quoteTitles = document.querySelectorAll('.quote-title');

// //   function updateContent() {
// //     characterName.textContent = characters[currentCharacterIndex];
// //     const currentQuotes = quotes[currentCharacterIndex];
// //     quoteElements.forEach((element, index) => {
// //       element.textContent = currentQuotes[index];
// //       quoteTitles[index].textContent = `Quote ${index + 1}`;
// //     });
// //   }

// //   document.getElementById('prevBtn')?.addEventListener('click', () => {
// //     currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
// //     updateContent();
// //   });

// //   document.getElementById('nextBtn')?.addEventListener('click', () => {
// //     currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
// //     updateContent();
// //   });

// //   document.querySelectorAll('nav a').forEach(link => {
// //     link.addEventListener('click', () => {
// //       document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
// //       link.classList.add('active'); // Gebruik direct de link variabele
// //     });
// //   });

// //   updateContent();
// // }

// // document.addEventListener('DOMContentLoaded', initializePage);



// // Fetch quote from backend
// async function fetchQuote() {
//   try {
//     const response = await fetch('/api/quote');
//     const data = await response.json();
//     const quoteElement = document.getElementById('quote-text');
//     if (quoteElement) {
//       quoteElement.textContent = `"${data.quote}"`;
//     }
//   } catch (error) {
//     const quoteElement = document.getElementById('quote-text');
//     if (quoteElement) {
//       quoteElement.textContent = `Error: ${(error as Error).message}`;
//     }
//   }
// }
// fetchQuote();

// // Timer countdown
// let timeLeft = 60;
// const timerElement = document.getElementById("timer") as HTMLElement;
// const countdown = setInterval(() => {
//   timeLeft--;
//   if (timerElement) timerElement.textContent = timeLeft.toString();

//   if (timeLeft <= 0) {
//     clearInterval(countdown);
//     alert("De tijd is om!");
//   }
// }, 1000);

// // Wrong landingpage images
// const wrongLandingpageImgs = document.querySelectorAll("#wrongImg");
// wrongLandingpageImgs.forEach(image => {
//   image.addEventListener('click', () => alert('Je hebt geen toegang tot dit spel!'));
// });

// // Login validation
// const registeredUser = {
//   username: "admin",
//   password: "admin"
// };

// const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
// if (loginForm) {
//   loginForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const username = (document.getElementById("loginUsername") as HTMLInputElement).value;
//     const password = (document.getElementById("loginPassword") as HTMLInputElement).value;
//     const errorMessage = document.getElementById("error-message");

//     if (username === registeredUser.username && password === registeredUser.password) {
//       alert("Proficiat, je bent ingelogd!");
//       window.location.href = "/";
//     } else {
//       if (errorMessage) {
//         errorMessage.textContent = "Foute gebruikersnaam of wachtwoord. Probeer opnieuw.";
//       }
//     }
//   });
// }

// // Registration form
// const registrationForm = document.getElementById("registrationForm") as HTMLFormElement | null;
// if (registrationForm) {
//   registrationForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     alert("Registratie succesvol!");
//     window.location.href = "/";
//   });
// }

// // Generate Avatar
// async function generateAvatar() {
//   const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=Robin`;
//   const avatarImg = document.getElementById("avatarimg") as HTMLImageElement;
//   if (avatarImg) {
//     avatarImg.src = avatarUrl;
//   }
// }
// generateAvatar();