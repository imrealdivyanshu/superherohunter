
// Marvel API public and private keys
const publicKey = '1991d25827baa21fe9459a6baa75abbf';
const privateKey = '224b908e3fa7055520c4142d561b1d8fb127b173';

// Function to generate the MD5 hash
function generateHash(timestamp) {
    const hashString = timestamp + privateKey + publicKey;
    return CryptoJS.MD5(hashString).toString();;
}

// Function to fetch superheroes from the Marvel API
function fetchSuperheroes(searchTerm) {
    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);

    const apiUrl = `https://gateway.marvel.com//v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchTerm}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const superheroes = data.data.results;

            const superheroesContainer = document.getElementById('superheroes');
            superheroesContainer.innerHTML = '';

            superheroes.forEach((hero) => {
                // Create a card for each superhero
                const card = document.createElement('div');
                card.className = 'card';

                // Add superhero image
                const img = document.createElement('img');
                img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
                img.className = 'card-img-top';

                // Add href for superhero details
                const link = document.createElement('a')
                link.href = "superherodetails/superhero.html?id="+hero.id
                link.appendChild(img)
                card.appendChild(link);

                // Add superhero name
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                const name = document.createElement('h5');
                name.className = 'card-title';
                name.textContent = hero.name;
                cardBody.appendChild(name);

                // Add "Favorite" button
                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'btn btn-primary';
                favoriteButton.textContent = 'Favorite';
                favoriteButton.addEventListener('click', () => addToFavorites(hero));
                cardBody.appendChild(favoriteButton);
                card.appendChild(cardBody);
                superheroesContainer.appendChild(card);
            });
        })
        .catch((error) => {
            console.error('Error fetching superheroes:', error);
        });
}

// Function to add a superhero to favorites (you can implement this later)
function addToFavorites(hero) {
    const favoriteSuperheroes = JSON.parse(localStorage.getItem('favoriteSuperheroes')) || [];
    favoriteSuperheroes.push(hero);

    // Update local storage
    localStorage.setItem('favoriteSuperheroes', JSON.stringify(favoriteSuperheroes));
}

// Initial load
fetchSuperheroes('iron man');

// Event listener for search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    if(searchTerm === ''){
        document.getElementById('search-heading').innerHTML = "Top Search"
        fetchSuperheroes('iron man')
    }
    else{
        document.getElementById('search-heading').innerHTML = `Search for <b>${searchTerm}</b>`
        fetchSuperheroes(searchTerm);
    }
});



