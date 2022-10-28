import React, { useState, useEffect } from 'react'
import {useCookies} from 'react-cookie';
import axios from 'axios'
import Clock from './clock'
import Welcomepage from './welcomepage'

function Weather() {
    const [data, setData] = useState({})
    const [cookies, setCookie] = useCookies(['location']);
    
    function getWeather(loc) {
      if (!!loc) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=8a87a6f77adbe0a4dae673c48c8e9eab`)
        .then(res => {
            setData(res.data)
            updateBg(res.data)
        })
        .catch(err => {
          setCookie('location', '', { path: '/' });
          alert('Please enter a valid location')
        })
      }
        
    }


    useEffect(() => {
      getWeather(cookies.location ? cookies.location : undefined); 
    }, []);

    function updateBg(d) {
      let elm = document.querySelector('.app')
      if (d.weather[0].main === 'Clear') {
        elm.style.background = 'url('+ require('./images/clear.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Clouds') {
        elm.style.background = 'url('+ require('./images/clouds.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Rain') {
        elm.style.background = 'url('+ require('./images/rain.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Snow') {
        elm.style.background = 'url('+ require('./images/snow.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Thunderstorm') {
        elm.style.background = 'url('+ require('./images/thunderstorm.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Mist') {
        elm.style.background = 'url('+ require('./images/fog.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Smoke') {
        elm.style.background = 'url('+ require('./images/fog.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Dust') {
        elm.style.background = 'url('+ require('./images/dust.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Fog') {
        elm.style.background = 'url('+ require('./images/fog.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Squall') {
        elm.style.background = 'url('+ require('./images/squall.jpg') +') no-repeat center center/cover'
      }
      else if (d.weather[0].main === 'Tornado') {
        elm.style.background = 'url('+ require('./images/tornado.jpg') +') no-repeat center center/cover'
      } 
    }
    

    function searchLocation(e) {
      if (e.key === 'Enter') {
        getWeather(cookies.location ? cookies.location : undefined);
      }
    }
    
  
    return (
      <div className="app">
        
        <div className="search">
          <input
            // value={location}
            onChange={(e) => {setCookie('location', e.target.value, {path: '/'}); }}
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
  