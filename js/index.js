const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '25e170d',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }
    
    return response.data.Search;
};


// GENERATING HTML ELEMENTS OF THE AUTOCOMPLETE WIDGET
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Searth for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

// SELECTORS
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async event => {
    const movies = await fetchData(event.target.value);

    // Si no hay resultados, se cierra el dropdown.
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;


        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
        `;
        // Evento para cuando se elige una opción
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
        });

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener('input', debounce(onInput, 600));


// CLOSING THE AUTOCOMPLETE with a global click event
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});