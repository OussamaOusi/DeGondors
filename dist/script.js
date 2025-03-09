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
