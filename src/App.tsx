import './App.css'
import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { ImTarget } from "react-icons/im";
// import Forecast from './components/Forecast';
const Forecast = React.lazy(() => import('./components/Forecast'))
// import DateTime from './components/DateTime';
const DateTime = React.lazy(() => import('./components/DateTime'));
// import CurrentWeather from './components/CurrentWether';
const CurrentWeather = React.lazy(() => import('./components/CurrentWether'));
import { MagnifyingGlass } from 'react-loader-spinner';

const App: React.FC = () => {

  const geoLocation_api = import.meta.env.VITE_GEO_CODING_API;
  const weather_api = import.meta.env.VITE_WEATHER_API;
  // const geoLocation_api = '';
  // const weather_api = '';


  const [dateTime, setDateTime] = useState<any>({
    date: '',
    time: "",
    city: "",
    day: "",
  })
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [forecastData, setForecastData] = useState<any>([]);
  const [lodaing, setLoading] = useState<boolean>(true)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [cache, setCache] = useState<string>('')


  const setdefalt = () => {
    setWeatherData(null)
    setError('')
    setForecastData([])
    // setUnit('metric')
    setLoading(true)
  }
  const toggleUnit = async () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    getLocationDateTime()
  };

  useEffect(() => {
    if (city === '') {
      getLocationDateTime(); // Call the function after city is empty
    }
  }, [city]);

  const handleCurrentLocation = async () => {
    setCity(''); // Set city to an empty string
  };

  async function getLocationDateTime() {
    const cacheKey = `${city}_${unit}`;
    if (cacheKey === cache) {
      return
    }
    setdefalt()
    try {
      if (city !== '') {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geoLocation_api}`);
        dateTimeData(response.data)
      }
      else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geoLocation_api}`);
          const data = await response.json();
          dateTimeData(data)
        }, (error) => {
          if (error.code == 2) {
            setError('Error getting location: Check your network connection')
          } else {
            setError('Error getting location: ' + error.message)
          }

          console.error('Error getting location:', error);
        });
      } else {
        setError('Geolocation is not supported by this browser.')
        console.error('Geolocation is not supported by this browser.');
      }
    } catch (e:any) {
      setError(e.message)
      console.log(e)
    }

  }

  const dateTimeData = async (data: any) => {

    if (data.results.length > 0) {
      const city = data.results[0].components.city ||
        data.results[0].components.town || data.results[0].components.state_district || data.results[0].formatted || 'Unknown location';
      const createdHttp = data.timestamp.created_http;
      // const createdUnix = data.timestamp.created_unix;

      // Using created_http
      const dateFromHttp = new Date(createdHttp);
      // const dateStringHttp = dateFromHttp.toLocaleDateString(); // Extract date
      const dayHttp = dateFromHttp.toLocaleDateString('en-US', { weekday: 'long' });
      const dateHttp = dateFromHttp.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
      const timeStringHttp = dateFromHttp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Extract time

      // setCity(city)
      await fetchWeather(city)
      setDateTime({
        city: city,
        date: dateHttp,
        day: dayHttp,
        time: timeStringHttp
      })
      setLoading(false)

    } else {
      setError('Location not found.')
      console.log('Location not found.');
    }
  }
  const fetchWeather = async (citydata: string) => {
    // console.log(weather_api)
    try {

      // checking does the cache have data for particular city and unit
      const cacheKey = `${city}_${unit}`;

      // Runing both the APIs parallel using Promise.all
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${citydata}&appid=${weather_api}&units=${unit}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${citydata}&appid=${weather_api}&units=${unit}`)
      ]);

      // Extract data from the responses
      const currentWeather = currentWeatherResponse.data;
      const forecast = forecastResponse.data.list;

      // Filter the forecast data for entries at 12:00 PM
      const filteredForecast = forecast.filter((item: any) =>
        item.dt_txt.includes('12:00:00')
      );

      // set data in cache
      setCache(cacheKey)

      // Set the data in state
      setWeatherData(currentWeather);
      setForecastData(filteredForecast);

    } catch (err) {
      setError('Failed to fetch weather data')
      console.log('Failed to fetch weather data');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setdefalt()
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geoLocation_api}`);
      dateTimeData(response.data)

    } catch (err:any) {
      setError('Failed to fetch data: '+ err.message)
      console.log(err);
    }

  }


  useEffect(() => {
    getLocationDateTime()
  }, [])

  return (


    <>
      <div className='container mx-auto py-4 px-2 2xl:px-[10rem]'>
        <div className=' flex flex-wrap items-center justify-between gap-4 '>
          <div className='min-w-[5rem] flex items-center gap-2'>
            <label className="switch">
              <input type="checkbox" onChange={toggleUnit} />
              <span className="slider"></span>
            </label>
            <span className='text-white font-bold font-2xl'>{unit === 'metric' ? '°C' : '°F'}</span>
          </div>
          <div className='min-w-[12rem] max-w-[30rem] grow'>
            <form className="form w-full" onSubmit={handleSubmit}>
              <label>
                <input className="input" type="text" placeholder="Search city" id="search" value={city} onChange={(e) => setCity(e.target.value)} />
                <div className="fancy-bg"></div>
                <div className="search">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                </div>
                <button className="close-btn" type="reset" onClick={() => { setCity('') }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </label>
            </form></div>
          <div className='min-w-[10rem]'>
            <button className="cursor-pointer group relative flex items-center gap-1.5 px-5 py-1 bg-[#28de28] bg-opacity-80
             text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-medium shadow-md" onClick={() => { setCity(''); handleCurrentLocation() }}>
              {/* <GiTargeting /> */}
              <ImTarget />
              Current Location
            </button>
          </div>
        </div>

        {lodaing ? <>
          <div className='flex justify-center items-center my-6 min-w-[20rem] min-h-[15rem] bg-[#2f3233] rounded-3xl shadow-box'>
            {error !== "" ?
              <p className='text-white'>{error}</p>
              :
              <MagnifyingGlass
                visible={true}
                height="257px"
                width="257px"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{ width: "200px", fontSize: "40px" }}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"

              />
            }
          </div>
        </> :
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <div className='flex flex-wrap gap-10 pt-5 w-full'>
                <DateTime dateTime={dateTime} />
                <div className='grow min-w-[20rem] min-h-[15rem] bg-[#2f3233] rounded-3xl shadow-box text-white p-4'>
                  <CurrentWeather data={weatherData} unit={unit} />
                </div>
              </div>

              <div className='pt-7 w-full'>
                <Forecast forecast={forecastData} unit={unit} />
              </div>
            </Suspense>
          </>
        }

        {/* </div> */}

      </div>

    </>
  )
}

export default App
