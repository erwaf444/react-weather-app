import React, { useState } from 'react';
import './WeatherApp.css';


const WeatherApp = () => {

  let api_key ="94d597f6e512c262e27e699c772d2568";
  const drizzle_icon = process.env.PUBLIC_URL + '/drizzle.png';
  const clear_icon = process.env.PUBLIC_URL + '/clear.png';
  const cloud_icon = process.env.PUBLIC_URL + '/cloud.png';
  const rain_icon = process.env.PUBLIC_URL + '/rain.png';
  const snow_icon = process.env.PUBLIC_URL + '/snow.png';
  
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () =>{
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value==="")
    {
      return 0;
    };
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
    
    

    let response = await fetch(url);
    let data = await response.json();
    
    const humidity = document.getElementsByClassName('humidity-percent')
    const wind = document.getElementsByClassName('wind-rate')
    const temprature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location')

    humidity[0].innerHTML = data.main.humidity + ' %';
    wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
    temprature[0].innerHTML = Math.floor(data.main.temp) + ' C';
    location[0].innerHTML = data.name;

    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
    {
      setWicon(clear_icon);
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
    {
      setWicon(cloud_icon)
    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
    {
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
    {
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
    {
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
    {
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
    {
      setWicon(snow_icon)
    }
    else
    {
      setWicon(clear_icon)
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder="Search" />
        <div className='search-icon' onClick={()=>search()}> 
          <img src="/search.png" alt="" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="" />
      </div>
      <div className='weather-temp'>24c</div>
      <div className='weather-location'>Taiwan</div>
      <div className='data-container'>
        <div className='element'>
          <img src="/humidity.png" alt="" className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src="/wind.png" alt="" className='icon' />
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
