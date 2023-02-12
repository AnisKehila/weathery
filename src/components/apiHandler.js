import moment from 'moment-timezone';
const key = '57ccfe82f7bf3fdf50d115eb8d03910e';
async function currentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
async function getLocation(city) {
    const location = await currentWeather(city);
    const {lon, lat} = location.coord;
    return {lon, lat};
}
async function forCast(city) {
    const {lon, lat} = await getLocation(city);
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data;
}
function getDate(value) {
    const date = new Date(value * 1000);
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate;
}
function getTime(value) {
    const date = new Date(value * 1000);
    const formattedTime = date.getHours();
    return formattedTime;
}
export {
    currentWeather,
    forCast,
    getTime,
    getDate
}