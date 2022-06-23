import React, {useEffect,  useState} from 'react'
import  axios from 'axios'

function App() {

  const [latLon,  setLatLon]  = useState({})
  const [weather, setWeather] = useState()
  
  
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = day + '/' + month + '/' + year;

  {/*const Lamp  = ()  =>  {
    const [isOn, setIsOn] = useState ('on')

    const switchLight = ()  =>  {
      if(isOn === 'on') {
        setIsOn('off')
      } else  {
        setIsOn('on')
      }
    }
  }
*/}
  
  useEffect(()  =>  {
    const success = pos =>  {
      console.log(pos.coords)
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setLatLon({lat, lon})
    }
    navigator.geolocation.getCurrentPosition(success)
  },  [])

  useEffect(()  =>  {
    if(latLon.lat  !== undefined)  {
      const API_KEY = '57bee9b4013d411077d9225e80240ab1'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}&units=metric`

      axios.get(URL)
        .then(res =>  setWeather(res.data))
        .catch(err => console.log(err))
    }
  },  [latLon])

  console.log(weather)
  
  return (
    <div className="App">

      <div  className='container'>
        {/*
        <div  className='toggle'>
          <div  className={`lamp ${isOn}`}></div>
          <button onClick={switchLight} className='btn'>{isOn}</button>
        </div> 
  */}
        <div  className='top'>
          <div  className='location'>
            <p>{weather?.name}, {weather?.sys.country} </p>
          </div>
          <div  className='temp'>
            <h1>{weather?.main.temp.toFixed()} C°</h1>
            <p>{date}</p>
          </div>
        </div>

        <div  className='icons-description'>
          <p><img  className='icons' src={weather && (`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`)} alt="" /></p>
          <p>"{weather?.weather[0].description}"</p>
        </div>

        <div  className='bottom'>
          <div  className='feels'>
            <p  className='bold'>{weather?.main.humidity}%</p>
            <p>Humedad</p>
          </div>
          <div className='humidity'>
            <p  className='bold'>{weather?.wind.speed}m/s</p>
            <p>Vel. Viento</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
