# Project Beschrijving

## Gemeenschappelijk

- De gebruiker komt op een **landing page** terecht waar alle uit te kiezen projecten staan. Deze projecten bevatten minimaal:
  - De naam van het project
  - Een afbeelding

- De gebruiker kiest het project dat door de groep is gemaakt.

- **Let op**: Blacklists en favorieten zijn gebruiker gebonden.
  - Gebruiker A kan andere favoriete karakters hebben dan gebruiker B.

- Als de gebruiker nog niet is ingelogd, krijgt hij een melding dat hij eerst moet inloggen.

- **Bij klikken op een ander project**:
  - De gebruiker krijgt een melding dat hij hier niet aan kan deelnemen (dit kan hardcoded zijn).

- De gebruiker komt vervolgens op de landing page van het gekozen project terecht.

---

## API Integratie

De API die we gebruiken is: [The One API](https://the-one-api.dev/documentation).

---

## Quiz Functionaliteiten

### Starten van de Quiz

1. De gebruiker kiest om de quiz te starten.
2. Het systeem geeft een quote die ergens in *Lord of the Rings* voorkomt.
3. Het systeem biedt **3 mogelijke karakters** en **films** waarin deze quote voorkomt.
4. De gebruiker kan:
   - Een **thumbs-up** geven (deze wordt toegevoegd aan de favorieten in de database).
   - Een **thumbs-down** geven (deze wordt toegevoegd aan de blacklists in de database).
     - De gebruiker moet een reden geven voor de blacklist.
     - Deze quotes komen niet meer voor in de quiz.

### Score & Beoordeling

- Het quizspel bestaat uit **10 rounds**.
  - Per correcte combinatie krijgt de gebruiker **1 punt**.
  - Als één onderdeel correct is, krijgt de gebruiker **0,5 punt**.
- Na de 10 vragen stopt het spel en wordt de **eindscore** op het scherm weergegeven.
- De gebruiker krijgt ook te zien wat de **high score** was.

---

## Sudden Death Mode

- In de **Sudden Death** modus:
  - Per correcte combinatie krijgt de gebruiker **1 punt**.
  - Bij een fout (half goed antwoord) krijgt de gebruiker te zien hoeveel antwoorden hij of zij goed had na elkaar.
  - De gebruiker krijgt ook te zien wat de **high score** was.

---

## Blitz Mode

- In de **Blitz** modus:
  - Per correcte combinatie krijgt de gebruiker **1 punt**.
  - Na 60 seconden stopt de gamemode.
  - De gebruiker krijgt ook te zien wat de **high score** was.

---

## Favorieten

In het gedeelte **Favorieten** staan de favoriete quotes van de gebruiker:

- Elke quote wordt weergegeven met de naam van het karakter van wie de quote komt.
- De gebruiker kan:
  - Quotes verwijderen.
  - Alle quotes afprinten naar een tekstbestand in het volgende formaat:
    - `- [Quote text]`
- Per karakter kan de gebruiker zien hoeveel quotes dit karakter heeft.
  - Als je op de karakternaam klikt, krijg je enkel de quotes van dit specifieke karakter te zien.
  - De naam van het karakter is ook een hyperlink naar de Fandom-pagina van dit karakter: [https://lotr.fandom.com/wiki/](https://lotr.fandom.com/wiki/).

---

## Blacklists

In het gedeelte **Blacklists** staan de geblackliste quotes van de gebruiker:

- Deze quotes komen niet voor in de quiz.
- De gebruiker kan de reden voor de blacklist zien en deze aanpassen.
- De gebruiker kan een geblackliste quote verwijderen.
