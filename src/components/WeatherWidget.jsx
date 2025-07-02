import React from 'react';

const WeatherWidget = ({ weather }) => (
  <div className="weather-widget" title={weather ? `${weather.current.condition.text}, ${weather.current.temp_c}°C` : ''}>
    {weather && <img src={weather.current.condition.icon} alt="Weather" className="weather-widget-icon" />}
  </div>
);

export default WeatherWidget;
