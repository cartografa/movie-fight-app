const fetchData = async() => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '25e170d',
            i: 'tt0848228'
        }
    });

    console.log(response.data)
}

fetchData();