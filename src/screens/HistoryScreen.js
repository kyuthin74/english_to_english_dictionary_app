import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { WordContext } from '../context/WordContext';

const HistoryScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { history, clearHistory, removeFromHistory } = useContext(WordContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('Search', { word: item.word })}
        activeOpacity={0.7}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            {item.word.word}
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.placeholder }]}>
            {formatDate(item.timestamp)}
          </Text>
        </View>
      </TouchableOpacity>
  
      <IconButton
        icon="delete"
        iconColor={theme.colors.primary}
        size={20}
        onPress={() => handleDeleteOne(item.timestamp)}
      />
    </View>
  );
  
  const handleDeleteOne = (timestamp) => {
    removeFromHistory(timestamp);
  };
  
  

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
  <ScrollView
    contentContainerStyle={{ paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
  >
    <TouchableOpacity
      onPress={clearHistory}
      style={[styles.clearHistoryContainer, { backgroundColor: theme.colors.border }]}
    >
      <Text style={[styles.clearHistoryText, { color: theme.colors.text }]}>
        Delete All Histories
      </Text>
      <IconButton icon="delete" iconColor={theme.colors.primary} size={18} />
    </TouchableOpacity>

    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.timestamp}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View />}
    />
  </ScrollView>
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
    paddingVertical: 10,
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
    paddingLeft: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  clearHistoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 3,             
    shadowColor: '#000',      
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

export default HistoryScreen; 