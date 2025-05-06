// Authentication & Session Management
const checkAuth = async () => {
    try {
      const response = await fetch('/auth/check-auth', { credentials: 'include' });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  };
  
  const updateNavbar = async () => {
    const user = await checkAuth();
    const navLinks = document.querySelector('.nav-links');
    
    if (user && navLinks) {
      navLinks.innerHTML = `
        <a href="/" class="active">Home</a>
        <a href="/home">Quiz</a>
        <a href="/logout">Uitloggen (${user.email})</a>
      `;
    } else if (navLinks) {
      navLinks.innerHTML = `
        <a href="/">Home</a>
        <a href="/register">Registratie</a>
        <a href="/login">Login</a>
      `;
    }
  };
  
  // Character Data & Game Logic
  const characters = ['Gandalf', 'Aragorn', 'Frodo', 'Sam', 'Legolas'];
  const quotes = [
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    ],
    // ... andere characters quotes
  ];
  
  function initializeCharacterSystem() {
    let currentCharacterIndex = 0;
    const characterName = document.querySelector('.character-header h1');
    const quoteElements = document.querySelectorAll('.quote-text');
    const quoteTitles = document.querySelectorAll('.quote-title');
  
    function updateContent() {
      if (characterName) characterName.textContent = characters[currentCharacterIndex];
      const currentQuotes = quotes[currentCharacterIndex];
      
      quoteElements.forEach((element, index) => {
        if (element) {
          element.textContent = currentQuotes[index];
          if (quoteTitles[index]) {
            quoteTitles[index].textContent = `Quote ${index + 1}`;
          }
        }
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
  
    if (characterName) updateContent();
  }
  
  // API Integration
  const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
  const apiUrl = "https://the-one-api.dev/v2/quote";
  
  async function fetchRandomQuote() {
    try {
      const response = await fetch(apiUrl, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      
      if (!response.ok) throw new Error("Quote ophalen mislukt");
      
      const data = await response.json();
      const randomQuote = data.docs[Math.floor(Math.random() * data.docs.length)].dialog;
      const quoteElement = document.getElementById('quote-text');
      
      if (quoteElement) {
        quoteElement.innerText = `"${randomQuote}"`;
      }
    } catch (error) {
      console.error('Quote error:', error);
      const quoteElement = document.getElementById('quote-text');
      if (quoteElement) {
        quoteElement.innerText = `Fout: ${error.message}`;
      }
    }
  }
  
  // Timer System
  function initializeTimer() {
    let timeLeft = 60;
    const timerElement = document.getElementById("timer");
    
    if (timerElement) {
      const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
  
        if(timeLeft <= 0){
          clearInterval(countdown);
          alert("De tijd is om!");
        }
      }, 1000);
    }
  }
  
  // Form Handlers
  document.addEventListener('DOMContentLoaded', async () => {
    await updateNavbar();
  
    // Registration Form
    document.getElementById('registrationForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirm-password');
  
      if (password?.value !== confirmPassword?.value) {
        alert("Wachtwoorden komen niet overeen!");
        return;
      }
  
      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: document.getElementById('username')?.value,
            email: document.getElementById('email')?.value,
            password: password?.value
          })
        });
  
        if (response.ok) {
          window.location.href = '/login';
        } else {
          const error = await response.json();
          alert(`Registratie fout: ${error.error}`);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Serverfout bij registratie');
      }
    });
  
    // Login Form
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: document.getElementById('email')?.value,
            password: document.getElementById('password')?.value
          })
        });
  
        if (response.ok) {
          window.location.href = '/home';
        } else {
          const error = await response.json();
          document.querySelector('.error-message').textContent = error.error;
        }
      } catch (error) {
        console.error('Login error:', error);
        document.querySelector('.error-message').textContent = 'Serverfout bij inloggen';
      }
    });
  
    // Game Access Control
    document.querySelectorAll('.game-link').forEach(link => {
      link.addEventListener('click', async (e) => {
        const auth = await checkAuth();
        if (!auth) {
          e.preventDefault();
          alert('Je moet ingelogd zijn om te spelen!');
          window.location.href = '/login';
        }
      });
    });
  
    // Initialize Game Systems
    if (window.location.pathname.includes('/home')) {
      const auth = await checkAuth();
      if (!auth) {
        window.location.href = '/login';
        return;
      }
      
      initializeCharacterSystem();
      initializeTimer();
      fetchRandomQuote();
    }
  
    // Landingpage Restrictions
    document.querySelectorAll("#wrongImg").forEach(image => {
      image.addEventListener('click', () => alert('Je hebt geen toegang tot dit spel!'))
    });
  
    // Avatar Generation
    if (document.getElementById('avatarimg')) {
      // const avatar = createAvatar(funEmoji, { seed: "Robin" }).toDataUri();
      // document.getElementById("avatarimg").src = avatar;
    }
  });
  
  // Leaflet Map Initialization (indien nodig)
  // ...