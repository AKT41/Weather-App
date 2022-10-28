import React, { useState } from 'react'
import axios from 'axios'
import Clock from './clock'
import Welcomepage from './welcomepage'

function Weather() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8a87a6f77adbe0a4dae673c48c8e9eab`
  
    const searchLocation = (e) => {
      if (e.key === 'Enter') {
        axios.get(url).then((response) => {
          setData(response.data)
          updateBg(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
    }

    function updateBg(d) {
      let elm = document.querySelector('.app')
      if (d.weather[0].main === 'Clear') {
        elm.style.background = 'url(./images/clear.jpg)'
      }
      else if (d.weather[0].main === 'Clouds') {
        elm.style.background = 'url('+ require('./images/cloudy-weather-blue-sky-cumulus-clouds-cloudscape-background-wallpaper-backdrop-natural-design-decoration-179502729.jpg') +')no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Rain') {
        elm.style.background = 'url(./images/rain.jpg)'
      }
    }
    
    
  
    return (
      <div className="app">
        
        <div className="search">
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text" />
        </div>
        <Clock/>

        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name} </p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C </h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p id='status'>{data.weather[0].main} </p> : null}
            </div>
            <div> {data.main ? data.weather.main : <Welcomepage/> } </div>
          </div>
    
        
          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
          
          
          
        </div>
      </div>
      
    );
  }
  
  export default Weather;
  