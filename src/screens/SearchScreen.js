import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const searchHistory = [
  { id: '1', city: 'Paris', country: 'France' },
  { id: '2', city: 'Berlin', country: 'Germany' },
  { id: '3', city: 'Sydney', country: 'Australia' },
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Dummy search handler
  const handleSearch = (text) => {
    setQuery(text);
    setResults(
      searchHistory.filter(item =>
        item.city.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Locations</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name..."
        placeholderTextColor={colors.secondary.mediumGray}
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results.length > 0 ? results : searchHistory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SearchResult result={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const SearchResult = ({ result }) => (
  <TouchableOpacity style={styles.resultCard}>
    <Text style={styles.city}>{result.city}, {result.country}</Text>
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
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary.mediumGray,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: spacing.xl,
    color: colors.primary.darkBlue,
    backgroundColor: colors.secondary.lightGray,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  resultCard: {
    backgroundColor: colors.primary.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
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
});

export default SearchScreen;
