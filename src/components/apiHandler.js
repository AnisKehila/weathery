async function apiHandler(city) {
    const key = '57ccfe82f7bf3fdf50d115eb8d03910e';
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&id=524901&appid=${key}`);
    const data = await response.json();
    return data;
}

export {
    apiHandler
}