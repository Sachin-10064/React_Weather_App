import React from 'react';
import { WeatherData } from '../types/weatherTypes';
import { TbUvIndex } from 'react-icons/tb';
import { FaWind } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import { MdWaves } from 'react-icons/md';
import { FiSunrise, FiSunset } from 'react-icons/fi';

interface CurrentWeatherProps {
    data: WeatherData;
    unit: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
    const { temp, feels_like, humidity, pressure } = data.main;
    const { description, icon } = data.weather[0];
    const { speed: windSpeed } = data.wind;
    const { sunrise, sunset } = data.sys;
    const uvIndex = data.uv;
    const temperatureUnit = unit === 'metric' ? '°C' : '°F';
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';

    return (
        <>
            <div className='flex flex-wrap gap-3'>

                <div className='grow'>
                    <h2 className='font-extrabold text-5xl'>{temp} {temperatureUnit}</h2>
                    <h5 className=''>Feel like: <span className='font-semibold'>{feels_like}{temperatureUnit}</span></h5>
                    <div className='pt-4'>
                        <div className='flex items-center justify-start gap-4'>
                            <FiSunrise style={{ width: '35px', fontSize: '35px' }} />
                            <div>
                                <p className='text-sm'>Sunrise</p>
                                <p className='text-sm'>{new Date(sunrise * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>

                        </div>
                        <div className='flex items-center justify-start gap-4 pt-4'>
                            <FiSunset style={{ width: '35px', fontSize: '35px' }} />
                            <div>
                                <p className='text-sm'>Sunrise</p>
                                <p className='text-sm'>{new Date(sunset * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='grow flex flex-col justify-between items-center'>
                    <p><img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt='icon'
                    /></p>
                    <h3 className='font-semibold text-lg'>{description}</h3>
                </div>

                <div className='grow'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <MdWaves style={{ width: '35px', fontSize: '35px' }} />
                            <div className='pt-2 '>
                                <p className='text-sm'>{humidity}%</p>
                                <p className='text-sm'>Hummidity</p>
                            </div>

                        </div>
                        <div>
                            <IoMdSpeedometer style={{ width: '35px', fontSize: '35px' }} />
                            <div className='pt-2'>
                                <p className='text-sm'>{windSpeed}{windUnit}</p>
                                <p className='text-sm'>Wind speed</p>
                            </div>

                        </div>
                        <div>
                            <FaWind style={{ width: '35px', fontSize: '35px' }} />
                            <div className='pt-2'>
                                <p className='text-sm'>{pressure}hpa</p>
                                <p className='text-sm'>pressure</p>
                            </div>

                        </div>
                        <div>
                            <TbUvIndex style={{ width: '35px', fontSize: '35px' }} />
                            <div className='pt-2'>
                                <p className='text-sm'>{uvIndex}</p>
                                <p className='text-sm'>UV</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CurrentWeather;
