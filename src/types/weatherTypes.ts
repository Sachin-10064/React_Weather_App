export interface DateTimeData{
    city:string;
    time:string;
    date:string;
    day:string;
}

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
  uv: number;
}

export interface ForecastData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  dt_txt: string;
}
