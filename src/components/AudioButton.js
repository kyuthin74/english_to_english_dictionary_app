import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AudioContext } from '../context/AudioContext';
import { ThemeContext } from '../context/ThemeContext';

const AudioButton = ({ word }) => {
  const { theme } = useContext(ThemeContext);
  const { isPlaying, currentWord, playAudio, stopAudio } = useContext(AudioContext);

  const handlePress = () => {
    if (isPlaying && currentWord === word) {
      stopAudio();
    } else {
      playAudio(word);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name={isPlaying && currentWord === word ? 'volume-high' : 'volume-medium'}
            size={24}
            color={theme.colors.primary}
          />
        )}
        size={24}
        style={styles.button}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 0,
    padding: 0,
  },
});

export default AudioButton; 