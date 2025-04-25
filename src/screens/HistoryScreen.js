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
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>Recent Searches</Text>
      </View>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No search history
          </Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
  onPress={clearHistory}
  style={[styles.clearHistoryContainer, { backgroundColor: theme.colors.border }]}
>
<Text style={[styles.clearHistoryText, { color: theme.colors.text }]}>Clear History</Text>
  <IconButton icon="delete" iconColor={theme.colors.primary} size={20} />
</TouchableOpacity>

          <View>
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
          </View>
        </>
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
    borderRadius: 8,
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
  clearHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },
  clearHistoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
  },
});

export default HistoryScreen; 