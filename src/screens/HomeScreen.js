import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { gradients } from '../styles/gradients';
import { LinearGradient } from 'expo-linear-gradient';
import HourlyForecast from '../components/weather/HourlyForecast';
import DailyForecast from '../components/weather/DailyForecast';
import { getForecast } from '../services/api/forecast';
import Loader from '../components/common/Loader';
import { getCurrentWeather } from '../services/api/weather.new';


// Placeholder for animated weather icon
const WeatherIcon = () => (
  <View style={styles.iconPlaceholder} />
);

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default: Kochi coordinates
  const lat = 9.9312;
  const lon = 76.2673;

  useEffect(() => {
    const fetchWeatherAndForecast = async () => {
      try {
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(lat, lon),
          getForecast(lat, lon)
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherAndForecast();
  }, []);

  return (
    <LinearGradient
      colors={gradients.button.colors}
      start={gradients.button.start}
      end={gradients.button.end}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.darkBlue} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Good Morning!</Text>
        <Text style={styles.subheading}>Here's your weather update</Text>
        {loading ? (
          <Loader />
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : weather ? (
          <View style={styles.weatherCard}>
            <WeatherIcon />
            <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.condition}>{weather.weather[0].description}</Text>
            <Text style={styles.location}>{weather.name}</Text>
          </View>
        ) : null}
        <HourlyForecast />
        <DailyForecast forecast={forecast} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  heading: {
    ...typography.display1,
    color: colors.primary.white,
    marginBottom: spacing.md,
    fontFamily: 'Poppins-Bold',
  },
  subheading: {
    ...typography.subtitle1,
    color: colors.primary.white,
    marginBottom: spacing.xxl,
    fontFamily: 'Poppins-Medium',
  },
  weatherCard: {
    backgroundColor: colors.primary.white,
    borderRadius: 16,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    width: 320,
    shadowColor: colors.secondary.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  iconPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary.lightBlue,
    marginBottom: spacing.lg,
  },
  temperature: {
    ...typography.display2,
    color: colors.primary.darkBlue,
    fontFamily: 'Poppins-Bold',
    marginBottom: spacing.sm,
  },
  condition: {
    ...typography.body1,
    color: colors.secondary.darkGray,
    fontFamily: 'Poppins-Medium',
    marginBottom: spacing.xl,
  },
  location: {
    ...typography.subtitle2,
    color: colors.accent.vibrantPurple,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen;
