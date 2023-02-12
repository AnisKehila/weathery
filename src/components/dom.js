function setPlace(city, country) {
    const cityName = document.querySelector('#place-name');
    cityName.innerHTML = `${city}, ${country}`;
}
function setDate(date) {
    const placeDate = document.querySelector('#place-date');
    placeDate.innerHTML = date;
}
function setMainIcon(iconLink) {
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
export {
    setMainIcon,
    setPlace,
    setDate,
    setWindSpeed,
    setChanceOfRain,
    setHumidity,
    setFeelsLikeTemp,
    setCurrentTemp,
    setWeatherNote,
}