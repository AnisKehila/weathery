import './style/style.scss';
import '@fortawesome/fontawesome-free/js/all';
import * as domFunctions from './components/dom';
import * as apiFunctions from "./components/apiHandler";


// Import Icons
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const icons = importAll(require.context('./assets/icons', false, /\.(png|jpe?g|svg)$/));

async function initCity(city) {
    const data = await apiFunctions.currentWeather(city);
    domFunctions.setPlace(data.name, data.sys.country);
    domFunctions.setDate(apiFunctions.getDate(data.dt));
    domFunctions.setWeatherNote(data.weather[0].description);
    domFunctions.setCurrentTemp(data.main.temp);
    domFunctions.setFeelsLikeTemp(data.main.feels_like);
    domFunctions.setHumidity(data.main.humidity);
    switch (data.weather[0].main) {
        case 'Rain':
            domFunctions.setChanceOfRain(90);
            break;
        case 'Clear':
            domFunctions.setChanceOfRain(0);
            break;
        case 'Clouds':
            domFunctions.setChanceOfRain(25);
            break;
        case 'Snow':
            domFunctions.setChanceOfRain(90);
            break;
        case 'Drizzle':
            domFunctions.setChanceOfRain(75);
            break;
        case 'Drizzle':
            domFunctions.setChanceOfRain(75);
            break;
        case 'Thunderstorm':
            domFunctions.setChanceOfRain(98);
            break;
        case 'Mist':
            domFunctions.setChanceOfRain(50);
            break;
    }
    domFunctions.setWindSpeed(data.wind.speed);
    switch (data.weather[0].icon) {
        case "01d":
            domFunctions.setMainIcon(icons['sun.svg']);
            break;
        case "02d" || "02n":
            domFunctions.setMainIcon(icons['cloud.svg']);
            break;
        case "03d":
            domFunctions.setMainIcon(icons['partial-clouds.svg']);
            break;
        case "04d"|| "04n":
            domFunctions.setMainIcon(icons['broken-clouds.svg']);
            break;
        case "09d"|| "09n":
            domFunctions.setMainIcon(icons['clouds-rain.svg']);
            break;
        case "10d":
            domFunctions.setMainIcon(icons['sun-rain.svg']);
            break;
        case "11d"|| "11n":
            domFunctions.setMainIcon(icons['thunder.svg']);
            break;
        case "13d"|| "13n":
            domFunctions.setMainIcon(icons['snow.svg']);
            break;
        case "01n":
            domFunctions.setMainIcon(icons['clear-night.svg']);
            break;
        case "03n":
            domFunctions.setMainIcon(icons['cloudy-night.svg']);
            break;
        case "10n":
            domFunctions.setMainIcon(icons['night-rain.svg']);
            break;
        default:
            domFunctions.setMainIcon(icons['broken-clouds.svg']);
    }
    // Set background
    let weather = data.weather[0].icon;
    if(weather.includes('d') && (weather.includes('01') || weather.includes('02') || weather.includes('03'))) {
        document.body.className = 'day';
    } else if (weather.includes('d') && !(weather.includes('01') || weather.includes('02') || weather.includes('03'))) {
        document.body.className = 'rainy-day';
    } else if(weather.includes('n') && (weather.includes('01') || weather.includes('02') || weather.includes('03'))){
        document.body.className = 'night';
    } else {
        document.body.className = 'rainy-night';
    }    
}
// Set popular cities 
async function popularCities() {
    const stData = await apiFunctions.currentWeather('New York');
    const ndData = await apiFunctions.currentWeather('oran');
    domFunctions.setTempPopularCities(stData.main.temp, 'new-york-temp');
    domFunctions.setTempPopularCities(ndData.main.temp, 'oran-temp');
    const cards = document.querySelectorAll('.popular-places .card');
    cards.forEach((card) => {
        card.addEventListener('click', () => initCity(card.dataset.city));
    })
}

// last searches handler
async function search() {
    const searchInput = document.querySelector('.search .icon');

}



search();
popularCities();
initCity('algiers');