import React from 'react'
import axios from 'axios'
// import { useEffect } from 'react'
import { useState } from 'react'
import './styles.css'

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: './Images/cloudy.png'
    })

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if(name !== "") {
            // to get API, we use 'axios' library
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f5a0d49251cfe9fc03cbefeb334a583f&units=metric`;
            axios.get(apiURL)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main === "Clouds") {
                    imagePath = "./Images/cloudy.png"
                }
                else if(res.data.weather[0].main === "Clear") {
                    imagePath = "./Images/clear.png"
                }
                else if(res.data.weather[0].main === "Rain") {
                    imagePath = "./Images/rain.png"
                }
                else if(res.data.weather[0].main === "Drizzle") {
                    imagePath = "./Images/drizzle.png"
                }
                else if(res.data.weather[0].main === "Mist") {
                    imagePath = "./Images/mist.png"
                }
                else {
                    imagePath = "./Images/cloudy.png"
                }

                setData({...data, 
                    celcius: res.data.main.temp, 
                    name: res.data.name, 
                    humidity: res.data.main.humidity,
                    speed: res.data.wind.speed,
                    image: imagePath
                })

                setError('');
            })
            .catch( err => {
                if(err.response.status === 404) {
                    setError("Invalid City Name")
                }
                else {
                    setError('');
                }
                console.log(err)
            });
        }
    }

  return (
    <div className='container'>
        <div className='header'>
            <img src='./Images/icon.png' alt=''/>
            <h2>WeatherVerse</h2>
        </div>

        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                <button><img src='./Images/search.png' onClick={handleClick} alt=''/></button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img src={data.image} alt='' />
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src='./Images/humidity.png' alt='' />
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src='./Images/wind.png' alt='' />
                        <div className='wind'>
                            <p>{Math.round(data.speed)} km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='footer'>
            <p>© 2023 Madhusmita Mukherjee.</p>
        </div>

    </div>
  )
}

export default Home