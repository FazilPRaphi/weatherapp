import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const DailyForecast = ({ forecast }) => (
  <View style={styles.container}>
    <Text style={styles.title}>5-Day Forecast</Text>
    {forecast && forecast.length > 0 ? (
      forecast.map((day, idx) => (
        <View key={idx} style={styles.dayRow}>
          <Text style={styles.day}>{day.day}</Text>
          <Text style={styles.icon}>{day.icon}</Text>
          <Text style={styles.temp}>{day.high} / {day.low}</Text>
        </View>
      ))
    ) : (
      <Text>No forecast data available.</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primary.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    shadowColor: colors.secondary.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...typography.subtitle1,
    color: colors.primary.darkBlue,
    marginBottom: spacing.md,
    fontFamily: 'Poppins-SemiBold',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  day: {
    ...typography.body1,
    color: colors.secondary.darkGray,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    fontSize: 22,
  },
  temp: {
    ...typography.body1,
    color: colors.primary.darkBlue,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default DailyForecast;
