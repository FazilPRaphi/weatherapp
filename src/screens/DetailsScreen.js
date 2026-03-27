import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { getCurrentWeather } from '../services/api/weather.new';


const KOCHI_COORDS = { lat: 9.9312, lon: 76.2673 };

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const DetailsScreen = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather(KOCHI_COORDS.lat, KOCHI_COORDS.lon);
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather details');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Weather Details (Kochi)</Text>
      <View style={styles.card}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : weather ? (
          <>
            <Detail label="Feels Like" value={`${Math.round(weather.main.feels_like)}°C`} />
            <Detail label="Humidity" value={`${weather.main.humidity}%`} />
            <Detail label="Wind Speed" value={`${weather.wind.speed} m/s`} />
            <Detail label="Visibility" value={`${weather.visibility / 1000} km`} />
            <Detail label="Pressure" value={`${weather.main.pressure} hPa`} />
            <Detail label="Sunrise" value={formatTime(weather.sys.sunrise)} />
            <Detail label="Sunset" value={formatTime(weather.sys.sunset)} />
            <Detail label="Condition" value={weather.weather[0].description} />
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

const Detail = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.primary.white,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  heading: {
    ...typography.display2,
    color: colors.primary.darkBlue,
    marginBottom: spacing.xl,
    fontFamily: 'Poppins-Bold',
  },
  card: {
    backgroundColor: colors.primary.white,
    borderRadius: 16,
    padding: spacing.xxl,
    width: '100%',
    shadowColor: colors.secondary.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body1,
    color: colors.secondary.darkGray,
    fontFamily: 'Poppins-Medium',
  },
  value: {
    ...typography.body1,
    color: colors.primary.darkBlue,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default DetailsScreen;
