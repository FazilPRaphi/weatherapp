import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

// Dummy data for hourly forecast
const hours = [
  { time: '8 AM', temp: '18°', icon: '☀️' },
  { time: '9 AM', temp: '19°', icon: '🌤️' },
  { time: '10 AM', temp: '20°', icon: '🌤️' },
  { time: '11 AM', temp: '21°', icon: '⛅' },
  { time: '12 PM', temp: '22°', icon: '⛅' },
  { time: '1 PM', temp: '23°', icon: '🌥️' },
  { time: '2 PM', temp: '24°', icon: '🌥️' },
];

const HourlyForecast = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Hourly Forecast</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {hours.map((hour, idx) => (
        <View key={idx} style={styles.hourBlock}>
          <Text style={styles.hour}>{hour.time}</Text>
          <Text style={styles.icon}>{hour.icon}</Text>
          <Text style={styles.temp}>{hour.temp}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.subtitle1,
    color: colors.primary.darkBlue,
    marginBottom: spacing.md,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: spacing.lg,
  },
  hourBlock: {
    alignItems: 'center',
    backgroundColor: colors.primary.white,
    borderRadius: 12,
    padding: spacing.md,
    marginRight: spacing.md,
    width: 64,
    shadowColor: colors.secondary.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  hour: {
    ...typography.caption1,
    color: colors.secondary.darkGray,
    marginBottom: 2,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    fontSize: 24,
    marginBottom: 2,
  },
  temp: {
    ...typography.body2,
    color: colors.primary.darkBlue,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default HourlyForecast;
