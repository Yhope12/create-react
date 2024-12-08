import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}


// import React, {useState} from "react";
// import './Weather.css';
// import axios from "axios";
// export default function Weather(){
//     const [ready, setReady]= useState(false);
//     const [weatherData,setWeatherData]= useState({});
//     function handleResponse(response){
//         console.log(response.data);
//         setReady(true);
//         setWeatherData(
//             {
//                 temperature: response.data.temperature.current,
//                 wind: response.data.wind.speed,
//                 city: response.data.city,
//                 description: response.data.condition.description,
//                 humidity: response.data.temperature.humidity,
//                 iconUrl: response.data.condition.icon_url,
//                 icon: response.data.condition.icon
//             }
//         )
//     }
//     if (ready){
//         return(
//             <div className="Weather">
//                 <form>
//                     <div className="row">
//                         <div className="col-9">
//                             <input type="search" placeholder="Enter a city" className="form-control" autoFocus="on"/>
//     </div>
//                         <div className="col-3">
//                             <input type="submit" placeholder="Search" className="btn btn-primary"/>
//                         </div>
//                     </div>
                
//                 </form>
//                 <h1>Yangon</h1>
//                 <ul>
//                     <li>Wednesday 3:40pm</li>
//                     <li className="text-capitalize">{weatherData.description}</li>
//                 </ul>
//                <div className="row mt-3">
//                 <div className="col-6">
//                     <img src={weatherData.iconUrl} alt={weatherData.icon} className="float-left"/>
//                      <span className="temperature">
//                         {Math.round(weatherData.temperature)}
//                      </span>
//                      <span className="unit"> °C</span>
                 
//                 </div>
//                 <div className="col-6">
//                     <ul>
//                         <li>Precipitation: 100%</li>
//     <li>Humidity: {weatherData.humidity}%</li>
//     <li>Wind: {weatherData.wind} km/h</li>
//                     </ul>
//                 </div>
//                </div>
//             </div>
//         )
//     } else
//     {
//       const apiKey="e4ada4d5033f1bdt8o356e4c1f68a52f";
//       let city="Yangon";
//     let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(handleResponse);  
//   return"Loading";
//     }
// }