const url = "https://the-one-api.dev/v2/quote";
const apiKey = "RGcOPi2oQ79fO1Ai2PGE";
var _data; 

async function fetchData(): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json();
        console.log(data)
        _data = data
    } catch (error){
        console.error("Error fetching data:", error)
    }
}

document.getElementById("fetch")?.addEventListener("click", fetchData)