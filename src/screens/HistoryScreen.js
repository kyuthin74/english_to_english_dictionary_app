import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { WordContext } from '../context/WordContext';

const HistoryScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { history, clearHistory } = useContext(WordContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.word.word}
      description={formatDate(item.timestamp)}
      onPress={() => navigation.navigate('Search', { word: item.word })}
      titleStyle={{ color: theme.colors.text }}
      descriptionStyle={{ color: theme.colors.placeholder }}
      style={{ backgroundColor: theme.colors.card }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No search history
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: theme.colors.text }]}>
              Recent Searches
            </Text>
            <IconButton
              icon="delete"
              iconColor={theme.colors.primary}
              size={24}
              onPress={clearHistory}
            />
          </View>
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item) => item.timestamp}
            ItemSeparatorComponent={() => (
              <View
                style={[styles.separator, { backgroundColor: theme.colors.border }]}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
  },
});

export default HistoryScreen; 