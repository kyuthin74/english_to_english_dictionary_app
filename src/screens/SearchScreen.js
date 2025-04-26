import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { DictionaryService } from '../services/DictionaryService';
import { ThemeContext } from '../context/ThemeContext';
import { WordContext } from '../context/WordContext';
import AudioButton from '../components/AudioButton';
import { SafeAreaView } from 'react-native';

const SearchScreen = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { addToFavorites, removeFromFavorites, favorites, addToHistory } = useContext(WordContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (route.params?.word) {
      setDefinition(route.params.word);
      setSearchTerm(route.params.word.word);
    }
  }, [route.params]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await DictionaryService.getWordDefinition(searchTerm);
      setDefinition(result);
      addToHistory(result);
    } catch (err) {
      setError('Word not found. Please try another word.');
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = definition && favorites.some(fav => fav.word === definition.word);

  const toggleFavorite = () => {
    if (definition) {
      if (isFavorite) {
        removeFromFavorites(definition.word);
      } else {
        addToFavorites(definition);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>Eng-to-Eng Dictionary</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          placeholder="Enter a word"
          placeholderTextColor={theme.colors.placeholder}
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.notification }]}>
            {error}
          </Text>
        </View>
      )}

      {definition && !loading && !error && (
        <ScrollView style={styles.definitionContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.wordHeader}>
            <Text
              style={[
                styles.word,
                { color: theme.colors.text, fontSize: theme.fontSize + 8 },
              ]}
            >
              {definition.word}
            </Text>
            <View style={styles.wordActions}>
              <AudioButton word={definition.word} />
              <IconButton
                icon={isFavorite ? 'star' : 'star-outline'}
                iconColor={isFavorite ? theme.colors.primary : theme.colors.text}
                size={24}
                onPress={toggleFavorite}
              />
            </View>
          </View>
          {definition.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaningContainer}>
              <Text
                style={[
                  styles.partOfSpeech,
                  { color: theme.colors.text, fontSize: theme.fontSize + 2 },
                ]}
              >
                {meaning.partOfSpeech}
              </Text>
              {meaning.definitions.map((def, defIndex) => (
                <View key={defIndex} style={styles.definitionItem}>
                  <Text
                    style={[
                      styles.definitionText,
                      { color: theme.colors.text, fontSize: theme.fontSize },
                    ]}
                  >
                    {def.definition}
                  </Text>
                  {def.example && (
                    <Text
                      style={[
                        styles.exampleText,
                        { color: theme.colors.placeholder, fontSize: theme.fontSize - 2 },
                      ]}
                    >
                      Example: {def.example}
                    </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',      
    marginHorizontal: 15,      
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  button: {
    height: 40,              
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    minWidth: 80,            
    elevation: 2,
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
    fontSize: 16,
  },
  definitionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  word: {
    fontWeight: 'bold',
  },
  wordActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meaningContainer: {
    marginBottom: 20,
  },
  partOfSpeech: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  definitionItem: {
    marginBottom: 15,
  },
  definitionText: {
    marginBottom: 5,
  },
  exampleText: {
    fontStyle: 'italic',
  },
});

export default SearchScreen; 