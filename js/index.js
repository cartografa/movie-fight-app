const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '25e170d',
            s: searchTerm
        }
    });

    console.log(response.data)
}

const input = document.querySelector('input');


// REUSABLE DEBOUNCE
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    };
};


const onInput = e => {
    fetchData(e.target.value);
};
input.addEventListener('input', debounce(onInput, 600));