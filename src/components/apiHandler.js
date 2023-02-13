import { cityNotFound, cityFound } from "./dom";
const key = '20f7632ffc2c022654e4093c6947b4f4';
async function currentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('City not found')
        }
        cityFound();
        const data = await response.json();
        return data;
    }catch (error) {
        cityNotFound('Sorry, the city you searched for was not found. Please try again.');
    }
}
async function cityHints(input) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=${key}`;
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
    const dailyWeather = [];
    for(let list of data.list) {
        const day = list.dt_txt.split(" ")[0];
        const time = list.dt_txt.split(" ")[1];
        const temp = list.main.temp;
        let dailyDataIndex = -1;
        dailyWeather.forEach((data, index) => {
            if (data.date === day) {
                dailyDataIndex = index;
            }
        });
        if (dailyDataIndex === -1) {
            dailyWeather.push({
                date: day,
                minTemperature: temp,
                maxTemperature: temp,
            });
        } else {
            time === '12:00:00' ? dailyWeather[dailyDataIndex].icon = list.weather[0].icon : false;
            if (temp < dailyWeather[dailyDataIndex].minTemperature) {
                dailyWeather[dailyDataIndex].minTemperature = temp;
            }
            if (temp > dailyWeather[dailyDataIndex].maxTemperature) {
                dailyWeather[dailyDataIndex].maxTemperature = temp;
            }
        }
    }
    return dailyWeather;
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
    getDate,
    cityHints
}