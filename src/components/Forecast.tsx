import React from 'react';
import { ForecastData } from '../types/weatherTypes';

interface ForecastProps {
    forecast: ForecastData[];
    unit: 'metric' | 'imperial';
}

const Forecast: React.FC<ForecastProps> = ({ forecast,unit }) => {
    const temperatureUnit = unit === 'metric' ? '°C' : '°F';
    return (
        <>
            <div className='min-w-[20rem] min-h-[15rem] bg-[#2f3233] rounded-3xl shadow-box p-4'>
                <div className='flex flex-col items-center justify-center w-full h-full text-white'>
                    <div className='text-center'>
                        <h3 className=' font-bold text-3xl pb-4'>5 Day Forecast: </h3>
                    </div>
                    <div className='flex flex-wrap gap-2 w-full'>
                        {forecast.map((day,index) => (
                            <div key={index} className=' grow min-w-[7rem] min-h-[14rem] bg-[#131313] rounded-3xl flex flex-col justify-center items-center'>
                                <p className='font-bold text-lg'>{new Date(day.dt_txt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</p>
                                <p className='font-semibold text-sm'>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                <p><img
                                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                /></p>
                                <p className='font-semibold text-sm'>{day.weather[0].description}</p>
                                <p className='text-sm'> <samp className='font-semibold'>max:</samp> {day.main.temp_min}{temperatureUnit} </p>
                                <p className='text-sm'><samp className='font-semibold'>min:</samp> {day.main.temp_max} {temperatureUnit}</p>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </>
    )
}


export default Forecast;