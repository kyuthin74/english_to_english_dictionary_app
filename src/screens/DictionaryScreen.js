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
      
    let found = false;
    let attempts = 0;

    while (!found && attempts < 5) { // try 5 times max
      const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
      try {
        const result = await DictionaryService.getWordDefinition(randomWord);
        setWordOfDay(result);
        fetchRelatedWords(result.word);
        found = true;
      } catch (err) {
        attempts++;
        console.log(`Word "${randomWord}" not found, retrying...`);
      }
    }

    if (!found) {
      console.error('Could not fetch a valid Word of the Day after multiple attempts.');
    }
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
        Beginner: ['happy', 'sad', 'good', 'bad', 'beautiful', 'small', 'big', 'fast', 'slow', 'kind'],
        Intermediate: ['jubilant', 'melancholy', 'excellent', 'terrible', 'gorgeous', 'pleasant', 'foolish', 'anxious', 'generous', 'sincere'],
        Advanced: ['euphoric', 'despondent', 'exemplary', 'atrocious', 'resplendent', 'benevolent', 'nostalgic', 'audacious', 'serendipitous', 'pernicious'],
      },
      'Business': {
        Beginner: ['money', 'work', 'team', 'plan', 'goal', 'boss', 'sell', 'buy', 'office', 'job'],
        Intermediate: ['strategy', 'innovation', 'market', 'finance', 'leadership', 'revenue', 'profit', 'startup', 'meeting', 'growth'],
        Advanced: ['acquisition', 'diversification', 'paradigm', 'synergy', 'optimization', 'entrepreneurship', 'capitalization', 'benchmarking', 'globalization', 'sustainability'],
      },
      'Technology': {
        Beginner: ['computer', 'internet', 'phone', 'app', 'robot', 'game', 'screen', 'mouse', 'keyboard', 'camera'],
        Intermediate: ['software', 'hardware', 'database', 'network', 'algorithm', 'server', 'program', 'browser', 'download', 'upload'],
        Advanced: ['artificial intelligence', 'blockchain', 'quantum computing', 'cybersecurity', 'nanotechnology', 'machine learning', 'cryptography', 'virtual reality', 'augmented reality', 'biometrics'],
      },
      'Science': {
        Beginner: ['plant', 'animal', 'water', 'earth', 'star', 'sun', 'moon', 'tree', 'rock', 'cloud'],
        Intermediate: ['biology', 'chemistry', 'physics', 'genetics', 'astronomy', 'geology', 'zoology', 'botany', 'meteorology', 'ecology'],
        Advanced: ['photosynthesis', 'thermodynamics', 'evolution', 'relativity', 'microbiology', 'immunology', 'paleontology', 'neuroscience', 'biochemistry', 'quantum mechanics'],
      },
      'Arts': {
        Beginner: ['paint', 'song', 'dance', 'story', 'color', 'drum', 'violin', 'pen', 'chalk', 'canvas'],
        Intermediate: ['sculpture', 'poetry', 'theater', 'design', 'composition', 'portrait', 'mural', 'novel', 'opera', 'ballet'],
        Advanced: ['renaissance', 'expressionism', 'aesthetics', 'surrealism', 'choreography', 'impressionism', 'cubism', 'minimalism', 'abstract', 'baroque'],
      },
      'Nature': {
        Beginner: ['tree', 'river', 'mountain', 'flower', 'bird', 'leaf', 'stone', 'beach', 'rain', 'snow'],
        Intermediate: ['ecosystem', 'habitat', 'biodiversity', 'climate', 'wildlife', 'rainforest', 'volcano', 'savanna', 'desert', 'prairie'],
        Advanced: ['conservation', 'sustainability', 'reforestation', 'ecology', 'endangered species', 'deforestation', 'carbon footprint', 'pollination', 'biosphere', 'hydrosphere'],
      },
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>Dictionary</Text>
      </View>
      <ScrollView>
      {/* Word of the Day Section */}
      {wordOfDay && (
        <Card style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={{ color: theme.colors.text, fontSize:20, fontWeight:'bold' }}>Word of the Day</Text>
            </View>
            <View style={styles.wordAudioContainer}>
  <Title style={[styles.wordText, { color: theme.colors.text }]}>
    {wordOfDay.word}
  </Title>
  <AudioButton word={wordOfDay.word} color={theme.colors.primary}/>
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
        <Text style={{ color: theme.colors.text, marginLeft: 16, fontSize:18, fontWeight: 'bold'}}>Difficulty Level</Text>
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
        <Text style={{ color: theme.colors.text, marginLeft: 16, fontSize:16, fontWeight: 'bold' }}>Categories</Text>
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
        <Text style={{ color: theme.colors.text, marginLeft: 16,fontSize:16, fontWeight: 'bold' }}>
          Words in {selectedCategory} ({selectedDifficulty})
        </Text>
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
  card: {
    margin: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wordAudioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
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
    justifyContent: 'space-evenly',
    padding: 16,
  },
  wordCard: {
    padding: 10,
    margin: 4,
    borderRadius: 5,
    elevation: 2,
    width: '40%',
    alignItems: 'center',
  },
});

export default DictionaryScreen;