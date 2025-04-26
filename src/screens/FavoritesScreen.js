import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { WordContext } from '../context/WordContext';

const FavoritesScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { favorites, removeFromFavorites } = useContext(WordContext);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('Search', { word: item })}
        activeOpacity={0.7}
      >
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          {item.word}
        </Text>
        <Text style={[styles.cardSubtitle, { color: theme.colors.placeholder }]}>
          {item.meanings[0]?.definitions[0]?.definition}
        </Text>
      </TouchableOpacity>
  
      <IconButton
        icon="star"
        iconColor={theme.colors.primary}
        size={28}
        onPress={() => removeFromFavorites(item.word)}
      />
    </View>
  );
  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.headerTitle}>Bookmarked Words</Text>
            </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No favorites yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.word}
          ItemSeparatorComponent={() => (
            <View/>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 3,             // Android shadow
    shadowColor: '#000',      // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },  
});

export default FavoritesScreen; 