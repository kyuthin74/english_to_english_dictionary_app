import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Chip,
  IconButton,
  Badge,
} from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { WordContext } from '../context/WordContext';
import { DictionaryService } from '../services/DictionaryService';
import AudioButton from '../components/AudioButton';

const categories = [
  'Common Words',
  'Business',
  'Technology',
  'Science',
  'Arts',
  'Nature',
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

const DictionaryScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { addToHistory } = useContext(WordContext);
  const [wordOfDay, setWordOfDay] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Common Words');
  const [categoryWords, setCategoryWords] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
  const [relatedWords, setRelatedWords] = useState([]);

  useEffect(() => {
    fetchWordOfDay();
    fetchCategoryWords(selectedCategory, selectedDifficulty);
  }, [selectedCategory, selectedDifficulty]);

  const fetchWordOfDay = async () => {
    try {
      const commonWords = [
        'serendipity',
        'ephemeral',
        'mellifluous',
        'ethereal',
        'luminous',
        'eloquent',
        'ineffable',
        'epiphany',
        'sonder',
        'petrichor',
        'sonder',
        'solitude',
        'zenith',
        'quintessential',
        'aesthetic',
        'labyrinth',
        'resilience',
        'panacea',
        'bucolic',
        'halcyon'
      ];
      
      const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
      const result = await DictionaryService.getWordDefinition(randomWord);
      setWordOfDay(result);
      fetchRelatedWords(result.word);
    } catch (error) {
      console.error('Error fetching word of the day:', error);
    }
  };

  const fetchRelatedWords = async (word) => {
    const mockRelatedWords = {
      serendipity: ['chance', 'fortune', 'luck', 'destiny'],
      ephemeral: ['fleeting', 'transient', 'temporary', 'brief'],
      mellifluous: ['melodious', 'smooth', 'sweet', 'harmonious'],
      ethereal: ['celestial', 'delicate', 'heavenly', 'light'],
      luminous: ['bright', 'radiant', 'shining', 'glowing'],
      eloquent: ['articulate', 'persuasive', 'expressive', 'fluent'],
      ineffable: ['indescribable', 'unspeakable', 'unutterable', 'sublime'],
      epiphany: ['realization', 'awakening', 'discovery', 'revelation'],
      sonder: ['realization', 'awareness', 'perspective', 'reflection'],
      petrichor: ['earthy smell', 'rain scent', 'after rain', 'fresh aroma'],
      solitude: ['seclusion', 'isolation', 'alone time', 'quietness'],
      zenith: ['peak', 'pinnacle', 'apex', 'summit'],
      quintessential: ['perfect example', 'ideal', 'ultimate', 'classic'],
      aesthetic: ['artistic', 'visual', 'beautiful', 'stylish'],
      labyrinth: ['maze', 'complex', 'network', 'puzzle'],
      resilience: ['toughness', 'endurance', 'grit', 'adaptability'],
      panacea: ['cure-all', 'remedy', 'solution', 'elixir'],
      bucolic: ['pastoral', 'rural', 'country', 'idyllic'],
      halcyon: ['peaceful', 'calm', 'serene', 'tranquil']
    };
    setRelatedWords(mockRelatedWords[word] || []);
  };

  const fetchCategoryWords = async (category, difficulty) => {
    // Enhanced mock data with difficulty levels
    const mockCategoryWords = {
      'Common Words': {
        Beginner: ['happy', 'sad', 'good', 'bad', 'beautiful'],
        Intermediate: ['jubilant', 'melancholy', 'excellent', 'terrible', 'gorgeous'],
        Advanced: ['euphoric', 'despondent', 'exemplary', 'atrocious', 'resplendent'],
      },
      'Business': {
        Beginner: ['money', 'work', 'team', 'plan', 'goal'],
        Intermediate: ['strategy', 'innovation', 'market', 'finance', 'leadership'],
        Advanced: ['acquisition', 'diversification', 'paradigm', 'synergy', 'optimization'],
      },
      // ... add more categories with difficulty levels
    };
    setCategoryWords(mockCategoryWords[category]?.[difficulty] || []);
  };

  const handleWordPress = async (word) => {
    try {
      const result = await DictionaryService.getWordDefinition(word);
      addToHistory(result);
      navigation.navigate('Search', { word: result });
    } catch (error) {
      console.error('Error fetching word definition:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Word of the Day Section */}
      {wordOfDay && (
        <Card style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Title style={{ color: theme.colors.primary }}>Word of the Day</Title>
            </View>
            <Title style={{ color: theme.colors.text }}>{wordOfDay.word}</Title>
            <View style={styles.audioContainer}>
              <AudioButton word={wordOfDay.word} color={theme.colors.primary} />
            </View>
            <Paragraph style={{ color: theme.colors.text }}>
              {wordOfDay.meanings[0]?.definitions[0]?.definition}
            </Paragraph>
            {wordOfDay.meanings[0]?.definitions[0]?.example && (
              <Paragraph style={[styles.example, { color: theme.colors.placeholder }]}>
                Example: "{wordOfDay.meanings[0]?.definitions[0]?.example}"
              </Paragraph>
            )}
            
            {/* Related Words */}
            {relatedWords.length > 0 && (
              <View style={styles.relatedWords}>
                <Title style={{ color: theme.colors.text, fontSize: 16 }}>Related Words:</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {relatedWords.map((word, index) => (
                    <Chip
                      key={index}
                      onPress={() => handleWordPress(word)}
                      style={[styles.relatedChip, { backgroundColor: theme.colors.primary }]}
                      textStyle={{ color: theme.colors.surface }}
                    >
                      {word}
                    </Chip>
                  ))}
                </ScrollView>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Difficulty Level Selection */}
      <View style={styles.difficultyContainer}>
        <Title style={{ color: theme.colors.text, marginLeft: 16 }}>Difficulty Level</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {difficultyLevels.map((level) => (
            <Chip
              key={level}
              selected={level === selectedDifficulty}
              onPress={() => setSelectedDifficulty(level)}
              style={[
                styles.categoryChip,
                { backgroundColor: level === selectedDifficulty ? theme.colors.primary : theme.colors.surface }
              ]}
              textStyle={{ color: level === selectedDifficulty ? theme.colors.surface : theme.colors.text }}
            >
              {level}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <Title style={{ color: theme.colors.text, marginLeft: 16 }}>Categories</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={category === selectedCategory}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryChip,
                { backgroundColor: category === selectedCategory ? theme.colors.primary : theme.colors.surface }
              ]}
              textStyle={{ color: category === selectedCategory ? theme.colors.surface : theme.colors.text }}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Category Words Section */}
      <View style={styles.wordsContainer}>
        <Title style={{ color: theme.colors.text, marginLeft: 16 }}>
          Words in {selectedCategory} ({selectedDifficulty})
        </Title>
        <View style={styles.wordsGrid}>
          {categoryWords.map((word) => (
            <TouchableOpacity
              key={word}
              onPress={() => handleWordPress(word)}
              style={[styles.wordCard, { backgroundColor: theme.colors.card }]}
            >
              <Text style={{ color: theme.colors.text }}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  example: {
    fontStyle: 'italic',
    marginTop: 8,
  },
  relatedWords: {
    marginTop: 16,
  },
  relatedChip: {
    marginRight: 8,
    marginTop: 8,
  },
  difficultyContainer: {
    marginVertical: 16,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  categoryChip: {
    marginRight: 8,
    marginVertical: 4,
  },
  wordsContainer: {
    marginVertical: 16,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  wordCard: {
    padding: 16,
    margin: 4,
    borderRadius: 8,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
});

export default DictionaryScreen;