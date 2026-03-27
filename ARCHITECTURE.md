# Architecture Overview

## Architecture Pattern: Redux + Middleware + Services

This weather app follows a **layered, service-oriented architecture** with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                    UI LAYER (Screens & Components)          │
│         HomeScreen, DetailsScreen, SettingsScreen, etc.     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  HOOKS LAYER (Custom Hooks)                 │
│     useWeather, useLocation, useFavorites, useSettings      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              STATE MANAGEMENT LAYER (Redux)                 │
│  • Store (Redux Toolkit)                                    │
│  • Slices (weatherSlice, locationSlice, etc.)              │
│  • Middleware (thunks, custom middleware)                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              SERVICES LAYER (Business Logic)                │
│  • API Services (OpenWeatherMap)                            │
│  • Location Services (Geolocation)                          │
│  • Storage Services (AsyncStorage, SQLite)                  │
│  • Notification Services (FCM)                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES & DEVICES                   │
│  • OpenWeatherMap API                                       │
│  • Device GPS/Geolocation                                   │
│  • Firebase Cloud Messaging                                 │
│  • Local Storage (Phone)                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
User Action (e.g., Search Location)
    │
    ▼
┌─────────────────┐
│  Screen/UI      │
│  Component      │
└────────┬────────┘
         │ useDispatch(action)
         ▼
┌─────────────────────────────────────┐
│  Redux Action / Thunk               │
│  dispatch(fetchWeather(location))   │
└────────┬────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│  Middleware / Async Thunk                    │
│  Handle side effects                         │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│  Services Layer                              │
│  • weatherAPI.getWeather(lat, lon)           │
│  • geolocationService.getLocation()          │
│  • storageService.saveFavorite()             │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│  External Data Sources                       │
│  • API Response                              │
│  • Device GPS                                │
│  • Phone Storage                             │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│  Redux Reducer                               │
│  Process & Store in State                    │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│  Component Re-render                         │
│  useSelector(state => state.weather)         │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│  Updated UI Display                          │
│  Show Weather Data                           │
└──────────────────────────────────────────────┘
```

---

## Redux State Structure

```javascript
const appState = {
  weather: {
    current: {
      temp: 25.5,
      feelsLike: 24.2,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 10000,
      uvIndex: 6,
      pressure: 1013,
      icon: '02d',
    },
    hourly: [
      { time: '2024-03-24T13:00:00', temp: 25.5, condition: 'Cloudy' },
      // ... more hours
    ],
    daily: [
      { date: '2024-03-24', high: 28, low: 18, condition: 'Sunny' },
      // ... more days
    ],
    alerts: [],
    loading: false,
    error: null,
    lastUpdated: 1711270800000,
  },

  location: {
    current: {
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      country: 'United States',
      address: 'New York, NY, USA',
    },
    searchHistory: [
      { city: 'London', lat: 51.5074, lon: -0.1278 },
      // ... more locations
    ],
    loading: false,
    error: null,
  },

  favorites: {
    locations: [
      { id: 1, city: 'New York', lat: 40.7128, lon: -74.0060 },
      { id: 2, city: 'London', lat: 51.5074, lon: -0.1278 },
    ],
    loading: false,
    error: null,
  },

  settings: {
    temperatureUnit: 'celsius',    // 'celsius' | 'fahrenheit'
    timeFormat: '24h',              // '24h' | '12h'
    notificationsEnabled: true,
    alertsEnabled: true,
    refreshInterval: 30,            // minutes
    theme: 'light',                 // 'light' | 'dark'
  },

  ui: {
    activeTab: 'home',
    loading: false,
    error: null,
    lastAction: 'FETCH_WEATHER',
  },
};
```

---

## Redux Slices

### weatherSlice
- **State:** Current weather, hourly forecast, daily forecast, alerts
- **Actions:**
  - `fetchWeatherRequest()` - Start loading
  - `fetchWeatherSuccess(payload)` - Store data
  - `fetchWeatherError(error)` - Store error
  - `setTemperatureUnit(unit)` - Change unit
  - `clearWeatherData()` - Reset data

### locationSlice
- **State:** Current location, search history
- **Actions:**
  - `fetchLocationRequest()`
  - `fetchLocationSuccess(coordinates)`
  - `fetchLocationError(error)`
  - `addToSearchHistory(location)`
  - `clearSearchHistory()`

### favoritesSlice
- **State:** Array of favorited locations
- **Actions:**
  - `addFavorite(location)`
  - `removeFavorite(id)`
  - `fetchFavoritesSuccess(favorites)`
  - `updateFavorite(location)`

### settingsSlice
- **State:** User preferences
- **Actions:**
  - `updateTemperatureUnit(unit)`
  - `updateTimeFormat(format)`
  - `toggleNotifications()`
  - `toggleAlerts()`
  - `setRefreshInterval(minutes)`

---

## Key Services

### weatherAPI.js
```javascript
Methods:
- getCurrentWeather(lat, lon) → Promise<WeatherData>
- getHourlyForecast(lat, lon, hours) → Promise<HourlyData[]>
- getDailyForecast(lat, lon, days) → Promise<DailyData[]>
- getWeatherAlerts(lat, lon) → Promise<Alerts[]>
- getAirQuality(lat, lon) → Promise<AirQualityData>

Features:
- Automatic retry on failure
- Response caching (10 min TTL)
- Rate limiting
- Error normalization
```

### geolocationService.js
```javascript
Methods:
- getCurrentLocation() → Promise<Coordinates>
- watchLocation(callback) → WatchId
- clearWatch(watchId) → void
- reverseGeocode(lat, lon) → Promise<Address>

Features:
- Permission handling (iOS/Android)
- Fallback to IP-based geolocation
- High accuracy on demand
```

### storageService.js
```javascript
AsyncStorage Methods:
- saveFavorite(location) → Promise<void>
- removeFavorite(id) → Promise<void>
- getFavorites() → Promise<Location[]>
- saveSettings(settings) → Promise<void>
- getSettings() → Promise<Settings>

SQLite Methods:
- saveWeatherHistory(data) → Promise<void>
- getWeatherHistory(days) → Promise<HistoryData[]>
- clearOldData(olderThan) → Promise<void>
```

### notificationService.js
```javascript
Methods:
- requestPermissions() → Promise<boolean>
- scheduleLocalNotification(config) → Promise<id>
- sendAlertNotification(alert) → Promise<void>
- getDeliveredNotifications() → Promise<Notification[]>
```

---

## Middleware Architecture

### thunkMiddleware
- Handles async API calls
- Dispatches loading/success/error actions
- Manages request cancellation

### syncMiddleware
- Syncs Redux state to AsyncStorage
- Persists critical data (favorites, settings)
- Hydrates state on app launch

### errorMiddleware
- Catches and logs errors
- Dispatches error actions
- Integrates with crash reporting

---

## Component Communication Pattern

```
Screen Component
    │
    ├─ useWeather() hook
    │   └─ useSelector() + useDispatch()
    │       └─ Redux Store
    │           └─ Services Layer
    │               └─ External APIs
    │
    ├─ useLocation() hook
    │
    ├─ useFavorites() hook
    │
    └─ useSettings() hook
```

### Example Hook Implementation
```javascript
// hooks/useWeather.js
export const useWeather = () => {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather);
  
  const fetchWeather = async (lat, lon) => {
    dispatch(fetchWeatherRequest());
    try {
      const data = await weatherAPI.getCurrentWeather(lat, lon);
      dispatch(fetchWeatherSuccess(data));
    } catch (error) {
      dispatch(fetchWeatherError(error.message));
    }
  };
  
  return {
    weather,
    fetchWeather,
    loading: weather.loading,
    error: weather.error,
  };
};
```

---

## Navigation Stack Structure

```
RootNavigator
├── Stack Navigation (Authentication check)
│   ├── SplashScreen
│   │
│   └── MainApp (Bottom Tab Navigator)
│       ├── HomeStack
│       │   ├── HomeScreen
│       │   └── DetailsScreen
│       │
│       ├── FavoritesStack
│       │   ├── FavoritesScreen
│       │   └── FavoriteDetailsScreen
│       │
│       ├── SearchStack
│       │   ├── SearchScreen
│       │   └── SearchResultsScreen
│       │
│       └── SettingsStack
│           ├── SettingsScreen
│           ├── UnitSettings
│           └── NotificationSettings
```

---

## Error Handling Strategy

### Hierarchical Error Handling
```javascript
1. Service Layer
   └─ Handles API errors, transforms to app errors

2. Middleware Layer
   └─ Catches async errors, dispatches error actions

3. Redux Reducer
   └─ Stores error state

4. Component Level
   └─ Displays error UI, retry mechanism

5. Global Error Boundary
   └─ Catches crash-level errors
```

### Error Types
```javascript
{
  API_ERROR: 'Failed to fetch weather data',
  LOCATION_ERROR: 'Could not determine location',
  NETWORK_ERROR: 'No internet connection',
  PERMISSION_ERROR: 'Location permission denied',
  STORAGE_ERROR: 'Failed to access storage',
  VALIDATION_ERROR: 'Invalid input data',
}
```

---

## Performance Optimization Strategies

1. **Memoization**
   - React.memo for components
   - useMemo for expensive calculations

2. **Code Splitting**
   - Lazy load navigation stacks
   - Dynamic imports for screens

3. **State Management**
   - Normalize Redux state
   - Selector memoization (reselect library)

4. **Caching**
   - API response caching (10 min)
   - Image caching with react-native-cached-image

5. **Bundle Optimization**
   - Tree shaking unused code
   - Image optimization
   - Lazy load heavy libraries

---

## Security Considerations

1. **API Keys**
   - Store in .env file
   - Use environment variables
   - Never commit to version control

2. **Data Storage**
   - Encrypt sensitive data in SQLite
   - Use KeyChain/Keystore for tokens

3. **Network Security**
   - HTTPS only
   - Certificate pinning for critical endpoints
   - Validate SSL certificates

4. **User Data**
   - Minimize data collection
   - Clear data on logout
   - Comply with privacy policies

---

## Testing Strategy

### Unit Tests
- Redux slices and actions
- Service layer functions
- Utility functions
- Custom hooks

### Integration Tests
- Redux store + components
- API calls + state updates
- Navigation flows

### E2E Tests
- Complete user workflows
- Critical paths
- Cross-platform testing

### Coverage Target
- Overall: 70%+
- Critical services: 85%+
- Reducers: 90%+

