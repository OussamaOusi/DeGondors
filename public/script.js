// Character data
const characters = ['Gandalf', 'Aragorn', 'Frodo', 'Sam', 'Legolas'];
const quotes = [
    [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    ],
    [
        "Duis aute irure dolor in reprehenderit in voluptate velit.",
        "Excepteur sint occaecat cupidatat non proident.",
        "Sunt in culpa qui officia deserunt mollit anim id est laborum."
    ],
    [
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet."
    ],
    [
        "At vero eos et accusamus et iusto odio dignissimos ducimus.",
        "Qui blanditiis praesentium voluptatum deleniti atque corrupti.",
        "Et harum quidem rerum facilis est et expedita distinctio."
    ],
    [
        "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
        "Itaque earum rerum hic tenetur a sapiente delectus.",
        "Ut aut reiciendis voluptatibus maiores alias consequatur."
    ]
];

function initializePage() {
    let currentCharacterIndex = 0;
    const characterName = document.querySelector('.character-header h1');
    const quoteElements = document.querySelectorAll('.quote-text');
    const quoteTitles = document.querySelectorAll('.quote-title');

    function updateContent() {
        characterName.textContent = characters[currentCharacterIndex];
        const currentQuotes = quotes[currentCharacterIndex];
        quoteElements.forEach((element, index) => {
            element.textContent = currentQuotes[index];
            quoteTitles[index].textContent = `Quote ${index + 1}`;
        });
    }

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
        updateContent();
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
        updateContent();
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    updateContent();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "RGcOPi2oQ79fO1Ai2PGE"; // Vervang met je eigen API-sleutel
const apiUrl = "https://the-one-api.dev/v2/quote";
function fetchQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            if (!response.ok) {
                throw new Error("Er is een fout opgetreden bij het ophalen van de quote.");
            }
            const data = yield response.json();
            console.log("Json response data:");
            console.log(data);
            const randomQuote = data.docs[Math.floor(Math.random() * data.docs.length)].dialog;
            const quoteElement = document.getElementById('quote');
            console.log("Opgehaalde quote");
            console.log(quoteElement);
            if (quoteElement) {
                quoteElement.innerText = `"${randomQuote}"`;
            }
        }
        catch (error) {
            const quoteElement = document.getElementById('quote');
            if (quoteElement) {
                quoteElement.innerText = `Fout: ${error.message}`;
            }
        }
    });
}
fetchQuote();

const wrongLandingpageImgs = document.querySelectorAll("#wrongImg");
wrongLandingpageImgs.forEach(image => {
    image.addEventListener('click', () => alert('You are not authorized to view this project!'))
});

let timeLeft = 60;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if(timeLeft <= 0){
        clearInterval(countdown);
        alert("Out of time!");
    }
}, 1000);

