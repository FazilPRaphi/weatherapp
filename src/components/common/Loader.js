import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary.lightBlue} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});

export default Loader;
