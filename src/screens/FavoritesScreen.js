import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

import { getCurrentWeather } from '../services/api/weather.new';

const CITIES = [
  { id: '1', city: 'Kochi', country: 'India', lat: 9.9312, lon: 76.2673 },
  { id: '2', city: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  { id: '3', city: 'Kolkata', country: 'India', lat: 22.5726, lon: 88.3639 },
  { id: '4', city: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
];

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const data = await getCurrentWeather(city.lat, city.lon);
            return {
              id: city.id,
              city: city.city,
              country: city.country,
              temp: `${Math.round(data.main.temp)}°C`,
              condition: data.weather[0].description
            };
          })
        );
        setFavorites(results);
      } catch (err) {
        setError('Failed to fetch favorites');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Locations</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <FavoriteCard favorite={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const FavoriteCard = ({ favorite }) => (
  <TouchableOpacity style={styles.card}>
    <View>
      <Text style={styles.city}>{favorite.city}, {favorite.country}</Text>
      <Text style={styles.condition}>{favorite.condition}</Text>
    </View>
    <Text style={styles.temp}>{favorite.temp}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.white,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  heading: {
    ...typography.display2,
    color: colors.primary.darkBlue,
    marginBottom: spacing.xl,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary.white,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: colors.secondary.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  city: {
    ...typography.body1,
    color: colors.primary.darkBlue,
    fontFamily: 'Poppins-SemiBold',
  },
  condition: {
    ...typography.body2,
    color: colors.secondary.darkGray,
    fontFamily: 'Poppins-Medium',
  },
  temp: {
    ...typography.display2,
    color: colors.accent.vibrantPurple,
    fontFamily: 'Poppins-Bold',
  },
});

export default FavoritesScreen;
