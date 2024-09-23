## Weather App 🌦️

A simple and responsive weather app built with React, TypeScript, and Vite. This application allows users to view the current weather for their location or any city they search for. It also provides the option to toggle between Celsius (°C) and Fahrenheit (°F).

## Features ✨
- **Weather by Current Location:** Automatically fetches the weather report based on the user's current location using geolocation services.
- **Weather by City Search:** Allows users to search for the weather in any city across the globe.
- **Temperature Unit Toggle:** Users can switch between Celsius (°C) and Fahrenheit (°F) for temperature display.
- **Responsive UI:** The app is fully responsive and works well on all screen sizes.
- **Fast Performance:** Powered by Vite for fast build times and hot-reloading.

## Getting Started 🚀
- **Prerequisites**
  - Node.js (v20 or later)
  - npm or yarn

- **Installation**
  - Clone the repository: https://github.com/Sachin-10064/React_Weather_App.git
  - Install dependencies: npm install
  - Set up environment variables: 
      - VITE_GEO_CODING_API = "your key"
      - VITE_WEATHER_API = "your key"
  - Start the development server: npm run dev

## API Integration 🌐
The app fetches real-time weather data using the OpenWeatherMap API (or any other weather API) and current Location by . Ensure you have an API key and add it to the .env file.
- **Weather API** : https://openweathermap.org/api
- **Geocoding API** : https://opencagedata.com/api#quickstart


## Usage 🌐
- **Get Weather by Current Location:** Upon opening the app, the user will be prompted to allow location access. If granted, the app will fetch and display the weather report for the user's current location.

- **Search by City:** Use the search bar to input a city name and view the weather details for that location.

- **Toggle Temperature Units:** A toggle button allows users to switch between Celsius and Fahrenheit for temperature readings.      