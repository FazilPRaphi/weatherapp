import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export const getForecast = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  // Group forecast by day and get daily high/low and icon
  const days = {};
  response.data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) {
      days[date] = {
        temps: [],
        icons: [],
        date: date
      };
    }
    days[date].temps.push(item.main.temp);
    days[date].icons.push(item.weather[0].icon);
  });
  // Format for 5 days
  const formatted = Object.values(days).slice(0, 5).map(day => {
    const high = Math.round(Math.max(...day.temps));
    const low = Math.round(Math.min(...day.temps));
    // Use the most frequent icon
    const icon = mostFrequent(day.icons);
    return {
      day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      high: `${high}°`,
      low: `${low}°`,
      icon: mapIconToEmoji(icon)
    };
  });
  return formatted;
};

function mostFrequent(arr) {
  return arr.sort((a,b) =>
    arr.filter(v => v===a).length - arr.filter(v => v===b).length
  ).pop();
}

function mapIconToEmoji(icon) {
  // Map OpenWeatherMap icon codes to emoji
  const map = {
    '01d': '☀️', '01n': '🌙',
    '02d': '🌤️', '02n': '☁️',
    '03d': '⛅', '03n': '⛅',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌦️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return map[icon] || '❓';
}
