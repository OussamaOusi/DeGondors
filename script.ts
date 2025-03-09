const apiKey: string = "RGcOPi2oQ79fO1Ai2PGE"; // Vervang met je eigen API-sleutel
const apiUrl: string = "https://the-one-api.dev/v2/quote";

interface QuoteResponse {
    docs: Quote[];
}

interface Quote {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
    date: string;
}

async function fetchQuote(): Promise<void> {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error("Er is een fout opgetreden bij het ophalen van de quote.");
        }

        const data: QuoteResponse = await response.json();
        console.log("Json response data:")
        console.log(data);
        const randomQuote: string = data.docs[Math.floor(Math.random() * data.docs.length)].dialog;
        const quoteElement = document.getElementById('quote');
        console.log("Opgehaalde quote")
        console.log(quoteElement)
        if (quoteElement) {
            quoteElement.innerText = `"${randomQuote}"`;
        }
    } catch (error) {
        const quoteElement = document.getElementById('quote');
        if (quoteElement) {
            quoteElement.innerText = `Fout: ${(error as Error).message}`;
        }
    }
}

fetchQuote();