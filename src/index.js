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
        case 'Thunderstorm':
            domFunctions.setChanceOfRain(98);
            break;
        case 'Mist':
            domFunctions.setChanceOfRain(50);
            break;
    }
    domFunctions.setWindSpeed(data.wind.speed);
    domFunctions.setMainIcon(data.weather[0].icon);
    // Set forCast
    dailyWeather(city);
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

}

// searches handler
async function searchInputHandler() {
    const searchIcon = document.querySelector('#search-icon');
    const input = document.querySelector('#search-field');
    searchIcon.addEventListener('click', () => {
        if(input.value !== '') {
            initCity(input.value)
            domFunctions.addHistory(input.value);
            changeCity();
        }  
        
    });
    input.addEventListener('input', async ()=> {
        if(input.value != '') {
            const hints = await apiFunctions.cityHints(input.value);
            domFunctions.hideSuggestion();
            hints.forEach(hint => {
                domFunctions.appendLi(`${hint.name},${hint.country}`);
            });
        }
        const dropDownLi = document.querySelectorAll('#drop-down li');
        dropDownLi.forEach(ele => ele.addEventListener('click', () => {
            initCity(ele.innerHTML);
            domFunctions.hideSuggestion();
            domFunctions.addHistory(ele.innerHTML);
            changeCity();
        }));
    });
}

function changeCity() {
    const cards = document.querySelectorAll('li.card');
    cards.forEach((card) => {
        card.addEventListener('click', () => initCity(card.dataset.city));
    });
}

async function dailyWeather(city) {
    const data = await apiFunctions.forCast(city);
    domFunctions.setDailyWeather(data);
}
changeCity();
searchInputHandler();
popularCities();
initCity('algiers');