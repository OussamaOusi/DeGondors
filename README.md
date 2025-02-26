# DeGondors

Gemeenschappelijk.
De gebruiker komt op een landing page terecht waar alle uit te kiezen projecten staan.
	Deze hebben minstens de naam van het project en een afbeelding.
De gebruiker kiest het project dat door de groep gemaakt is.
Ben je nog niet ingelogd dan krijg je de melding dat je eerst moet inloggen.
LET OP: blacklists en favorieten zijn gebruiker gebonden 
(gebruiker a kan dus een andere favoriete karakters hebben dan gebruiker b)
	Als de gebruiker op een ander project klikt krijgt hij een melding dat hij hier niet aan kan deelnemen. (mag hard coded zijn)
De gebruiker komt op de landing page van het project terecht.
API
https://the-one-api.dev/documentation
Quotes quiz
De gebruiker kiest om de quiz te starten
Het systeem geeft een quote die ergens in Lord of The Rings voorkomt
Het systeem geeft 3 mogelijke karakters en films waarin deze quote voorkomt.
	Je kan vragen een thumbs up geven: favoriten (opgeslagen in database)
	Je kan vragen een thumbs down geven: blacklisten (opgeslagen in database)
		Je moet een reden geven waarom je ze blacklist
		Deze zullen niet meer voorkomen in de quizen
De gebruiker kiest de juiste combinatie.
	10 rounds
		Per goede combinatie 1 punt,  als 1 stukje juist is 0,5
		Na 10 vragen stopt het spel en komt de eindscore op het scherm
			Je krijgt ook te zien wat de high score was
	Sudden Death
		Per goede combinatie 1 punt
		Bij een fout (half)antwoord krijg je te zien hoeveel er na elkaar goed waren 
			Je krijgt ook te zien wat de high score was
Favorites
Hier staan je favoriete quotes opgelijst met de naam van het karakter van wie de quote komt.
Je kan quotes verwijderen of ze allemaal afprinten naar een tekstbestand in volgend formaat:
<Quote> - <Karakternaam>
<Quote> - <Karakternaam>
Je kan per karakter dat voorkomt in de quotes zien hoeveel quotes deze heeft. Klik je op de karakternaam dan krijg je enkel deze quotes te zien.
De naam is ook een hyperlink naar https://lotr.fandom.com/wiki/ <naam karakter>
Blacklists
Hier staan al je geblackliste quotes. Deze komen niet voor in de quiz, je kan de reden zien en aanpassen.
Je kan een geblackliste quote verwijderen.
