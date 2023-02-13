// Import Icons
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const icons = importAll(require.context('../assets/icons', false, /\.(png|jpe?g|svg)$/));
function setPlace(city, country) {
    const cityName = document.querySelector('#place-name');
    cityName.innerHTML = `${city}, ${country}`;
}
function setDate(date) {
    const placeDate = document.querySelector('#place-date');
    placeDate.innerHTML = date;
}
function setMainIcon(weather) {
    const iconLink = chooseIcon(weather)
    const icon = document.querySelector('#icon');
    icon.src = iconLink;
}
function setWeatherNote(note) {
    const domNote = document.querySelector('#note');
    domNote.innerHTML = note;
}
function setCurrentTemp(temp) {
    const domTemp = document.querySelector('#temperature');
    domTemp.innerHTML = `${temp} °C`;
}
function setFeelsLikeTemp(temp) {
    const domTemp = document.querySelector('#feels-like-value');
    domTemp.innerHTML = `${temp} °C`;
}
function setHumidity(value) {
    const humidity = document.querySelector('#humidity-value');
    humidity.innerHTML = `${value} %`;
}
function setChanceOfRain(value) {
    const rainPossibility = document.querySelector('#rain-possibility-value');
    rainPossibility.innerHTML = `${value}%`;
}
function setWindSpeed(value) {
    const windSpeed = document.querySelector('#wind-speed-value');
    windSpeed.innerHTML = `${value} km/h`;
}
function setTempPopularCities(value, id) {
    const tempField = document.getElementById(id);
    tempField.innerHTML = `${value} °C`;
}
const searchHistory = [];
const dropDown = document.querySelector('#drop-down');
const lastSearched = document.querySelector('.last-searched');
function addHistory(value) {
    searchHistory.unshift(value);
    resetHistory();
    if(searchHistory.length > 1) {
        for(let i = 0 ; i < 2 ; i++) {
            const li = document.createElement('li');
            li.classList.add('card');
            li.dataset.city = searchHistory[i];
            li.innerHTML = searchHistory[i];
            lastSearched.appendChild(li);
        }
    }
}
function resetHistory() {
    const lastSearches = document.querySelectorAll('.last-searched li');
    lastSearches.forEach(ele => ele.remove());
}
function hideSuggestion() {
    const li = document.querySelectorAll('#drop-down li');
    li.forEach(li => li.remove());
    document.addEventListener('click', function(event) {
        if (!dropDown.contains(event.target)) {
            const li = document.querySelectorAll('#drop-down li');
            li.forEach(li => li.remove());
        }
    });
}
function appendLi(value) {
    const hintLi = document.createElement('li');
    hintLi.innerHTML = value;
    hintLi.style = 'display: block';
    dropDown.appendChild(hintLi);
}

function cityNotFound(value) {
    const note = document.querySelector('#city-note');
    note.innerHTML = value;
}
function cityFound() {
    const note = document.querySelector('#city-note');
    const searhcField = document.querySelector('#search-field');
    searhcField.value = '';
    note.innerHTML = '';
}
function setDailyWeather(objectOfFiveDays) {
    const list = document.querySelector('#list');
    list.innerHTML = '';
    for(let i = 0; i < 5; i++) {
        const li = document.createElement('li');
        const day = document.createElement('span');
        day.className = 'day';
        const dayValue = new Date(objectOfFiveDays[i].date).toLocaleDateString("default", { weekday: "long" });
        day.innerHTML = dayValue;
        li.appendChild(day);
        const icon = document.createElement('span');
        icon.className = 'icon';
        const img = new Image();
        img.src = chooseIcon(objectOfFiveDays[i].icon);
        icon.appendChild(img);
        li.appendChild(icon)
        const maxTemp = document.createElement('span');
        maxTemp.className = 'max-temp';
        maxTemp.innerHTML = objectOfFiveDays[i].maxTemperature + ' °C';
        li.appendChild(maxTemp);
        const minTemp = document.createElement('span');
        minTemp.className = 'min-temp';
        minTemp.innerHTML = objectOfFiveDays[i].minTemperature + ' °C';
        li.appendChild(minTemp);
        list.appendChild(li);
    }
    console.log(objectOfFiveDays);

}
function chooseIcon(value) {
    switch (value) {
        case "01d":
            return icons['sun.svg'];
        case "02d" || "02n":
            return icons['cloud.svg'];
        case "03d":
            return icons['partial-clouds.svg'];
        case "04d"|| "04n":
            return icons['broken-clouds.svg'];
        case "09d"|| "09n":
            return icons['clouds-rain.svg'];
        case "10d":
            return icons['sun-rain.svg'];
        case "11d"|| "11n":
            return icons['thunder.svg'];
        case "13d"|| "13n":
            return icons['snow.svg'];
        case "01n":
            return icons['clear-night.svg'];
        case "03n":
            return icons['cloudy-night.svg'];
        case "10n":
            return icons['night-rain.svg'];
        default:
            return icons['broken-clouds.svg'];
    }
}
export {
    setMainIcon,
    chooseIcon,
    setPlace,
    setDate,
    setWindSpeed,
    setChanceOfRain,
    setHumidity,
    setFeelsLikeTemp,
    setCurrentTemp,
    setWeatherNote,
    setTempPopularCities,
    appendLi,
    hideSuggestion,
    cityNotFound,
    addHistory,
    cityFound,
    setDailyWeather
}