import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { WordContext } from '../context/WordContext';

const FavoritesScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { favorites, removeFromFavorites } = useContext(WordContext);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.word}
      description={item.meanings[0]?.definitions[0]?.definition}
      onPress={() => navigation.navigate('Search', { word: item })}
      right={() => (
        <IconButton
          icon="heart"
          iconColor={theme.colors.primary}
          size={24}
          onPress={() => removeFromFavorites(item.word)}
        />
      )}
      titleStyle={{ color: theme.colors.text }}
      descriptionStyle={{ color: theme.colors.placeholder }}
      style={{ backgroundColor: theme.colors.card }}
    />
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
            <View
              style={[styles.separator, { backgroundColor: theme.colors.border }]}
            />
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
    paddingVertical: 15,
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
  separator: {
    height: 1,
  },
});

export default FavoritesScreen; 