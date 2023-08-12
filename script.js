const apiKeyInput = document.getElementById('api-key');
const movieTitleInput = document.getElementById('movie-title');
const searchButton = document.getElementById('search-button');
const loader = document.getElementById('loader');
const errorBox = document.getElementById('error');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value;
    const movieTitle = movieTitleInput.value;

    if (apiKey === '' || movieTitle === '') {
    errorBox.textContent = 'Please provide both API Key and Movie Title.';
    return;
    }

    errorBox.textContent = '';
    resultsContainer.innerHTML = '';
    loader.style.display = 'block';

    const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
   

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        loader.style.display = 'none';

        if (data.Error) {
        errorBox.textContent = data.Error;
        } else {
        data.Search.forEach((movie,index) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            const poster = document.createElement('img');
            poster.classList.add('poster');
            poster.src = movie.Poster;
            movieCard.appendChild(poster);

            const title = document.createElement('h2');
            title.textContent = movie.Title;
            movieCard.appendChild(title);

            const year = document.createElement('p');
            year.textContent = `Year: ${movie.Year}`;
            movieCard.appendChild(year);

            const moreDetailsLink = document.createElement('a');
            moreDetailsLink.textContent = 'More Details';
            moreDetailsLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
            moreDetailsLink.classList.add('more-details');
            movieCard.appendChild(moreDetailsLink);
            
            
            const serialNumber = document.createElement('p'); // Create a <p> element for serial number
            serialNumber.textContent = `${index + 1}`; // Add serial number text
            serialNumber.classList.add('serialNumber');
            movieCard.appendChild(serialNumber); // Append serial number to movieCard

            resultsContainer.appendChild(movieCard);

            
        });
        }
    })
    .catch(error => {
        loader.style.display = 'none';
        errorBox.textContent = 'An error occurred. Please try again.';
    });
});
