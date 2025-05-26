console.log("Favorieten-script wordt geladen!");
const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
const quoteApi = "https://the-one-api.dev/v2/quote";
const characterApi = "https://the-one-api.dev/v2/character";

let currentQuote = null;
let currentCharacter = null;

async function fetchRandomQuote() {
  const quoteEl = document.getElementById("quote-text");
  console.log("🔄 Ophalen quote…");
  try {
    const res = await fetch(quoteUrl, { headers:{Authorization:`Bearer ${apiKey}`} });
    const data = await res.json();
    const random = data.docs[Math.floor(Math.random()*data.docs.length)];
    console.log("✅ Quote binnen:", random);
    if (quoteEl) quoteEl.textContent = `"${random.dialog}"`;
    currentQuote = random;
    await fetchCharacter(random.character);
  } catch (err) {
    console.error("❌ Fout bij quote:", err);
    if (quoteEl) quoteEl.textContent = "Fout bij laden quote.";
  }
}

async function fetchCharacter(characterId) {
    console.log("🔎 Ophalen character met ID:", characterId);
    try {
        const res = await fetch(characterUrl, {
            headers: { Authorization: `Bearer ${apiKey}` },
        });
        const data = await res.json();
        console.log("📦 Gehele character-response ontvangen:", data);

        currentCharacter = data.docs.find(c => c._id === characterId);
        console.log("✅ Character details gevonden:", currentCharacter);

        // Je kunt de naam tonen op de pagina als je een element toevoegt met bv. id="character-name"
        // document.getElementById("character-name").textContent = currentCharacter.name;
    } catch (err) {
        console.error("❌ Fout bij ophalen character:", err);
    }
}



//Landingpage
const wrongLandingpageImgs = document.querySelectorAll("#wrongImg");
wrongLandingpageImgs.forEach(image => {
    image.addEventListener('click', () => alert('Je hebt geen toegang tot dit spel!'))
});

//Timer 
let timeLeft = 60;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if(timeLeft <= 0){
        clearInterval(countdown);
        alert("De tijd is om!");
    }
}, 1000);

const registeredUser = {
    username: "admin",
    password: "admin"
};

//Login form 
const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        const errorMessage = document.getElementById("error-message");
        // console.log(username);
        // console.log(password); 
        // console.log(errorMessage);
    
        if(username === registeredUser.username && password === registeredUser.password){
            alert("Proficiat, je bent ingelogd!");
            window.location.href = "../index.html";
        } else {
            console.log("foute login")
            if(errorMessage){
                errorMessage.textContent = "Foute gebruikersnaam of wachtwoord. Probeer opnieuw";
            }
        }
    })
};


//Registration Form
const registrationForm = document.getElementById("registrationForm");
if(registrationForm){
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        alert("Registration successful!");
        window.location.href = "../index.html";
    })
};

function GenerateAvatar() {
    const avatar = createAvatar(funEmoji, { seed: "Robin" }).toDataUri();
    console.log(avatar);
    document.getElementById("avatarimg").src = avatar;
}

document.getElementById("generateAvatar").addEventListener("click", GenerateAvatar)


//like verwijderen
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".delete-fav").forEach(btn => {
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
