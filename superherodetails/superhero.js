// Marvel API public and private keys
const publicKey = '1991d25827baa21fe9459a6baa75abbf';
const privateKey = '224b908e3fa7055520c4142d561b1d8fb127b173';

// Function to generate the MD5 hash
function generateHash(timestamp) {
    const hashString = timestamp + privateKey + publicKey;
    return CryptoJS.MD5(hashString).toString();;
}


// Function to fetch superhero details by ID
function fetchSuperheroDetails(superheroId) {
    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);
    // Make an API request to fetch superhero details by ID
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${superheroId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const superhero = data.data.results[0];
            console.log(superhero)
            displaySuperheroDetails(superhero);
        })
        .catch((error) => {
            console.error('Error fetching superhero details:', error);
        });
}

// Function to display superhero details
function displaySuperheroDetails(superhero) {
    const superheroDetailsContainer = document.getElementById('superheroDetails');

    // Add superhero image
    const img = document.getElementById('superhero-image');
    img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;

    // Add superhero name
    const name = document.getElementById('superhero-name');
    name.textContent = superhero.name;

    // Add superhero description
    const desc = document.getElementById('superhero-bio')
    desc.textContent = superhero.description

    // Add comics
    const comic_list = document.getElementById('comics-list')
    superhero.comics.items.forEach(element => {
        const lis = document.createElement('li')
        lis.innerHTML = element.name
        lis.addEventListener('click', function () {
            displayComicsDetails(element.resourceURI);
        })
        comic_list.appendChild(lis)
    });

    // Add Events
    const event_list = document.getElementById('event-list')
    superhero.events.items.forEach(element => {
        const lis = document.createElement('li')
        lis.innerHTML = element.name
        lis.addEventListener('click', function () {
            displayEventDetails(element.resourceURI);
        })
        event_list.appendChild(lis)
    });

}


// Fetching details of comics
function displayComicsDetails(comicsUri) {
    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);
    // Make an API request to fetch comics details by ID
    const apiUrl = `${comicsUri}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const comics = data.data.results[0];
            console.log(comics)

            //Add comics image
            const img = document.getElementById('comics-img');
            img.src = `${comics.images[0].path}.${comics.images[0].extension}`;

            //Add title and description
            const name = document.getElementById('comics-name');
            name.textContent = comics.title;
            const desc = document.getElementById('comics-desc')
            desc.textContent = comics.description
        })
        .catch((error) => {
            console.error('Error fetching superhero details:', error);
        });
}

// Fetching details of events
function displayEventDetails(eventsUri){
    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);
    // Make an API request to fetch event details by ID
    const apiUrl = `${eventsUri}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const event = data.data.results[0];
            console.log(event)

            //Add comics image
            const img = document.getElementById('event-img');
            img.src = `${event.thumbnail.path}.${event.thumbnail.extension}`;

            //Add title and description
            const name = document.getElementById('event-name');
            name.textContent = event.title;
            const desc = document.getElementById('event-desc')
            desc.textContent = event.description
        })
        .catch((error) => {
            console.error('Error fetching superhero details:', error);
        });
}

// Extract superhero ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const superheroId = urlParams.get('id');

// Fetch and display superhero details
if (superheroId) {
    fetchSuperheroDetails(superheroId);
}
