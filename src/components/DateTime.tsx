import React from "react";
import { DateTimeData } from "../types/weatherTypes";

interface DateTimeprops {
    dateTime: DateTimeData;
}

const DateTime: React.FC<DateTimeprops> = ({ dateTime }) => {

    return (
        <>
            <div className='grow max-w-[30rem] min-w-[10rem] min-h-[15rem] bg-[#2f3233] rounded-3xl shadow-box '>
                <div className='flex flex-col items-center justify-center w-full h-full text-white'>
                    <div><h3 className=' font-bold text-xl pb-4'>{dateTime?.city}</h3></div>
                    <div><h2 className=' font-extrabold text-6xl'>{dateTime?.time}</h2></div>
                    <p className='font-light text-sm'>{dateTime?.day},{dateTime?.date}</p>
                </div>
            </div>
        </>
    )
}

export default DateTime