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