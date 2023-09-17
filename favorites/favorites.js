

// Function to display favorite superheroes from local storage
function displayFavoriteSuperheroes() {
    const favoriteSuperheroesList = document.getElementById('favoriteSuperheroesList');
    favoriteSuperheroesList.innerHTML = '';

    // Retrieve favorite superheroes from local storage
    const favoriteSuperheroes = JSON.parse(localStorage.getItem('favoriteSuperheroes')) || [];

    favoriteSuperheroes.forEach((hero) => {
        // Create a card for each favorite superhero
        const card = document.createElement('div');
        card.className = 'card';

        // Add superhero image
        const img = document.createElement('img');
        img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`; // Use the image URL stored in local storage
        img.className = 'card-img-top';

         // Add href for superhero details
         const link = document.createElement('a')
         link.href = "../superherodetails/superhero.html?id="+hero.id
         link.appendChild(img)
         card.appendChild(link);


        // Add superhero name
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        const name = document.createElement('h5');
        name.className = 'card-title';
        name.textContent = hero.name;
        cardBody.appendChild(name);

        // Add "Remove" button
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromFavorites(hero));
        cardBody.appendChild(removeButton);

        card.appendChild(cardBody);
        favoriteSuperheroesList.appendChild(card);
    });
}
// Function to remove a superhero from favorites
function removeFromFavorites(hero) {
    const favoriteSuperheroes = JSON.parse(localStorage.getItem('favoriteSuperheroes')) || [];

    // Filter out the removed superhero
    const updatedFavorites = favoriteSuperheroes.filter((favoriteHero) => favoriteHero.id !== hero.id);

    // Update local storage
    localStorage.setItem('favoriteSuperheroes', JSON.stringify(updatedFavorites));

    // Update the display
    displayFavoriteSuperheroes();
}

// Initial load
displayFavoriteSuperheroes();
