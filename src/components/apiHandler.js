import moment from 'moment-timezone';
const key = '57ccfe82f7bf3fdf50d115eb8d03910e';
async function currentWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
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
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data;
}
function getTime(value) {
    const date = new Date(value * 1000);
    const dateString = date.toLocaleDateString();
    return dateString;
}
export {
    currentWeather,
    forCast,
    getTime
}