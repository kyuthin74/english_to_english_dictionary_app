import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { DictionaryService } from '../services/DictionaryService';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await DictionaryService.getWordDefinition(searchTerm);
      setDefinition(result);
    } catch (err) {
      setError('Word not found. Please try another word.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a word"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {definition && !loading && !error && (
        <ScrollView style={styles.definitionContainer}>
          <Text style={styles.word}>{definition.word}</Text>
          {definition.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaningContainer}>
              <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
              {meaning.definitions.map((def, defIndex) => (
                <View key={defIndex} style={styles.definitionItem}>
                  <Text style={styles.definitionText}>{def.definition}</Text>
                  {def.example && (
                    <Text style={styles.exampleText}>Example: {def.example}</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 15,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#c62828',
    fontSize: 16,
  },
  definitionContainer: {
    flex: 1,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  meaningContainer: {
    marginBottom: 20,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  definitionItem: {
    marginBottom: 15,
  },
  definitionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  exampleText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SearchScreen; 