import React, { useEffect } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_sky from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import mist from '../assets/mist.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import cloudy_sky from '../assets/clouds.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import { useState } from 'react'
import { useRef } from 'react'

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  
  const allicons = {
    "01d": clear_sky,
    "01n": clear_sky,
    "02d": cloudy_sky,
    "02n": cloudy_sky,
    "03d": cloudy_sky,
    "03n": cloudy_sky,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist
  }

  const search = async (city) => {
    if (!city){
      alert("Enter a city nigga, damn");
      return;
    } 
    try {
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_Weather_API}`;
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();

      if(!response.ok)
      {
        alert("Bhosdike, city likh");
        setWeatherData(null);
        return;
      }
      console.log(data);
      const icon = allicons[data.weather[0].icon] || clear_sky;
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.round(data.main.temp),
        location: data.name,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: icon
      })
    } catch (error) {
      console.log(error);
      alert("Teri Maa ki chu");
      setWeatherData(null);
    }
  }
    useEffect(() => {
      search("London");
    }, []) //response in arrray format

  return (
    <div>
      <div className='weather'>
        <h1 className='heading'>WEATHER</h1>
        <div className="search-bar">
            <input ref={inputRef} type='text'placeholder='Enter city...'/>
            <img src= {search_icon} alt='' style={{width: '35px', height: '35px'}} 
            onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?
        <>
        <img src= {weatherData.icon} alt='' className='weather-icon' />
        <h1 className='temperature'>{weatherData.temperature} °C</h1>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className="col">
            <img src= {humidity} alt='' className='humidity-icon' />
            <div>
              <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src= {wind} alt='' className='wind-icon' />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
            </div>
          </div>
        </div>

      
    
        </>:<></>}
        </div>
        </div>
        
  );
}

export default Weather

