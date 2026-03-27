# OpenWeatherMap API Integration Guide

## API Overview

OpenWeatherMap provides weather data through multiple endpoints. This app uses the **Free** tier which provides:
- Current weather
- 5-day forecast
- Hourly data
- Weather alerts (for supported regions)

**Documentation:** https://openweathermap.org/api

---

## Authentication

### API Key Management
```javascript
// .env
OPENWEATHERMAP_API_KEY=your_api_key_here
```

### Request Format
All requests require the API key as a query parameter:
```
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}
```

---

## Core Endpoints

### 1. Current Weather
**Endpoint:** `GET /data/2.5/weather`

**Parameters:**
```javascript
{
  lat: number,           // Latitude
  lon: number,           // Longitude
  units: string,         // 'metric' (Celsius), 'imperial' (Fahrenheit), default 'kelvin'
  lang: string,          // 'en', 'es', 'fr', etc.
  appid: string,         // API Key
}
```

**Response:**
```javascript
{
  coord: {
    lon: -74.0060,
    lat: 40.7128
  },
  weather: [
    {
      id: 500,           // Weather condition code
      main: "Rain",      // Weather category
      description: "light rain",
      icon: "10d"        // Icon code
    }
  ],
  main: {
    temp: 22.5,          // Current temperature
    feels_like: 21.2,    // Feels like temperature
    temp_min: 20.1,      // Min temperature
    temp_max: 24.8,      // Max temperature
    pressure: 1013,      // Atmospheric pressure (hPa)
    humidity: 65         // Humidity (%)
  },
  visibility: 10000,     // Visibility (meters)
  wind: {
    speed: 7.5,          // Wind speed (m/s)
    deg: 220,            // Wind direction (degrees)
    gust: 12.3           // Wind gust (m/s)
  },
  clouds: {
    all: 75              // Cloud coverage (%)
  },
  rain: {
    "1h": 2.5            // Rain volume in last 1h (mm)
  },
  snow: {
    "1h": 0              // Snow volume in last 1h (mm)
  },
  dt: 1711270800,        // Data timestamp (Unix)
  sys: {
    type: 2,
    id: 309646,
    country: "US",       // Country code
    sunrise: 1711257600, // Sunrise time (Unix)
    sunset: 1711303200   // Sunset time (Unix)
  },
  timezone: -14400,      // Timezone offset (seconds)
  id: 5128581,
  name: "New York",      // City name
  cod: 200              // Response code (200 = success)
}
```

### 2. Forecast (5 Day / 3 Hour)
**Endpoint:** `GET /data/2.5/forecast`

**Parameters:**
```javascript
{
  lat: number,
  lon: number,
  units: string,
  appid: string,
}
```

**Response:**
```javascript
{
  cod: "200",
  message: 0,
  cnt: 40,               // Number of forecasts (8 per day)
  list: [
    {
      dt: 1711286400,
      main: {
        temp: 23.5,
        feels_like: 22.1,
        temp_min: 21.0,
        temp_max: 23.5,
        pressure: 1013,
        humidity: 60
      },
      weather: [{
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d"
      }],
      clouds: { all: 70 },
      wind: { speed: 8.2, deg: 230, gust: 13.5 },
      visibility: 10000,
      pop: 0.8,             // Probability of precipitation (0-1)
      rain: { "3h": 1.2 },
      sys: { type: 1, id: 8879, pod: "d" },
      dt_txt: "2024-03-24 12:00:00"
    }
    // ... 39 more forecast objects
  ],
  city: {
    id: 5128581,
    name: "New York",
    coord: { lat: 40.7128, lon: -74.0060 },
    country: "US",
    population: 8336817,
    timezone: -14400,
    sunrise: 1711257600,
    sunset: 1711303200
  }
}
```

### 3. One Call API (All-in-One)
**Endpoint:** `GET /data/3.0/onecall`
**Note:** Requires paid subscription (currently not used in free tier)

---

## Weather Condition Codes

### Main Condition Groups
```javascript
{
  "Clear": {
    ids: [800],
    description: "Clear sky",
    dayIcon: "01d",
    nightIcon: "01n"
  },
  "Clouds": {
    ids: [801, 802, 803, 804],
    description: "Cloudy",
    icons: {
      801: "02d/02n",     // Few clouds
      802: "03d/03n",     // Scattered clouds
      803: "04d/04n",     // Broken clouds
      804: "04d/04n"      // Overcast clouds
    }
  },
  "Rain": {
    ids: [500, 501, 502, 503, 504],
    description: "Rainy",
    icon: "09d/09n",
    drizzle: "10d/10n"
  },
  "Thunderstorm": {
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    icon: "11d/11n"
  },
  "Snow": {
    ids: [600, 601, 602, 610, 611, 612, 613, 620, 621, 622],
    icon: "13d/13n"
  },
  "Mist": {
    ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    icon: "50d/50n"
  }
}
```

### Icon Mapping
```javascript
Day Icons:        Night Icons:
01d (Clear)      01n
02d (Few)        02n
03d (Scattered)  03n
04d (Broken)     04n
09d (Drizzle)    09n
10d (Rain)       10n
11d (Thunder)    11n
13d (Snow)       13n
50d (Mist)       50n
```

---

## Request Implementation

### Basic API Service
```javascript
// services/api/weatherAPI.js
import axios from 'axios';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor for API key
apiClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    appid: API_KEY,
    units: 'metric', // Always use Celsius
  };
  return config;
});

// Get current weather
export const getCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await apiClient.get('/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

// Get 5-day forecast
export const getForecast = async (latitude, longitude) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

// Error handling
const handleAPIError = (error) => {
  if (error.response) {
    const status = error.response.status;
    let message = 'An error occurred';
    
    if (status === 401) message = 'Invalid API key';
    if (status === 404) message = 'Location not found';
    if (status === 429) message = 'Too many requests';
    
    return {
      code: status,
      message,
      raw: error,
    };
  } else if (error.request) {
    return {
      code: 'NETWORK_ERROR',
      message: 'No response from server',
      raw: error,
    };
  } else {
    return {
      code: 'CLIENT_ERROR',
      message: error.message,
      raw: error,
    };
  }
};
```

---

## Data Transformation

### Transform Current Weather
```javascript
export const transformWeatherData = (rawData) => {
  const { main, weather, wind, clouds, sys, timezone } = rawData;
  
  return {
    temperature: Math.round(main.temp),
    feelsLike: Math.round(main.feels_like),
    condition: weather[0].main,
    description: weather[0].description,
    icon: weather[0].icon,
    humidity: main.humidity,
    windSpeed: Math.round(wind.speed * 3.6), // Convert m/s to km/h
    windDirection: wind.deg,
    visibility: Math.round(main.visibility / 1000), // Convert to km
    pressure: main.pressure,
    cloudCoverage: clouds.all,
    sunrise: sys.sunrise,
    sunset: sys.sunset,
    timezone,
  };
};
```

### Transform Forecast Data
```javascript
export const transformForecastData = (forecastList) => {
  // Group by day
  const byDay = {};
  
  forecastList.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString();
    
    if (!byDay[day]) {
      byDay[day] = {
        date: day,
        temps: [],
        conditions: [],
        forecasts: [],
      };
    }
    
    byDay[day].temps.push(forecast.main.temp);
    byDay[day].conditions.push(forecast.weather[0].main);
    byDay[day].forecasts.push({
      time: date.getHours(),
      temp: Math.round(forecast.main.temp),
      condition: forecast.weather[0].main,
      icon: forecast.weather[0].icon,
    });
  });
  
  // Create daily summaries
  return Object.values(byDay).map(day => ({
    date: day.date,
    high: Math.round(Math.max(...day.temps)),
    low: Math.round(Math.min(...day.temps)),
    condition: getMostCommonCondition(day.conditions),
    hourly: day.forecasts,
  }));
};
```

---

## Caching Strategy

### Implementation
```javascript
const cache = {
  data: {},
  ttl: 10 * 60 * 1000, // 10 minutes
};

export const getCachedWeather = async (lat, lon) => {
  const key = `${lat},${lon}`;
  const cached = cache.data[key];
  
  if (cached && Date.now() - cached.timestamp < cache.ttl) {
    return cached.data;
  }
  
  const data = await getCurrentWeather(lat, lon);
  cache.data[key] = {
    data,
    timestamp: Date.now(),
  };
  
  return data;
};

export const clearCache = () => {
  cache.data = {};
};
```

---

## Rate Limiting

### Implementation
```javascript
class RateLimiter {
  constructor(maxCalls = 60, interval = 60000) {
    this.maxCalls = maxCalls;
    this.interval = interval;
    this.calls = [];
  }
  
  checkLimit() {
    const now = Date.now();
    this.calls = this.calls.filter(time => now - time < this.interval);
    
    if (this.calls.length >= this.maxCalls) {
      throw new Error('Rate limit exceeded');
    }
    
    this.calls.push(now);
  }
}

const limiter = new RateLimiter(60, 60000); // 60 calls per minute

export const getWeatherWithLimit = async (lat, lon) => {
  limiter.checkLimit();
  return getCurrentWeather(lat, lon);
};
```

---

## Error Responses

### Common Error Codes
```javascript
{
  200: "Call successful",
  400: "Bad request parameter",
  401: "Invalid API key",
  404: "Location/resource not found",
  429: "Rate limit exceeded",
  500: "Server error",
  502: "Bad gateway",
  503: "Service unavailable",
}
```

### Example Error Response
```javascript
{
  cod: "404",
  message: "city not found"
}
```

---

## Testing the API

### Using cURL
```bash
# Get current weather
curl "https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&appid=YOUR_API_KEY&units=metric"

# Get forecast
curl "https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060&appid=YOUR_API_KEY&units=metric"
```

### Using Thunder Client (VS Code Extension)
1. Install Thunder Client extension
2. Create new request
3. Set URL: `https://api.openweathermap.org/data/2.5/weather`
4. Add params: `lat`, `lon`, `appid`, `units`
5. Send request

---

## Best Practices

1. **Always use HTTPS** for API calls
2. **Include timeout** on all requests (10-30 seconds)
3. **Implement retry logic** for failed requests
4. **Cache responses** to reduce API calls
5. **Respect rate limits** (60 calls/min, 1000 calls/day for free tier)
6. **Handle errors gracefully** with user-friendly messages
7. **Never expose API key** in client-side code (use backend proxy if needed)
8. **Compress large payloads** when possible

---

## Free vs Paid Tiers

### Free Tier Limitations
- 60 API calls/minute
- 1,000,000 calls/month
- 5-day forecast with 3-hour steps
- No historical data
- Limited to current and forecast data

### When to Upgrade
- Need 4 weeks/3 months history
- Need real-time alerts system
- Need air quality data
- Plan to launch commercially

