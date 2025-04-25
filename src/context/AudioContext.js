import React, { createContext, useState, useEffect } from 'react';
import Tts from 'react-native-tts';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);

  useEffect(() => {
    // Initialize TTS
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.0);

    // Add event listeners
    Tts.addEventListener('tts-start', () => setIsPlaying(true));
    Tts.addEventListener('tts-finish', () => {
      setIsPlaying(false);
      setCurrentWord(null);
    });
    Tts.addEventListener('tts-cancel', () => {
      setIsPlaying(false);
      setCurrentWord(null);
    });

    return () => {
      Tts.removeAllListeners();
      Tts.stop();
    };
  }, []);

  const playAudio = async (word) => {
    try {
      if (isPlaying) {
        // Stop current playback if any
        await Tts.stop();
        setIsPlaying(false);
        setCurrentWord(null);
      }

      // Set the current word and start playing
      setCurrentWord(word);
      await Tts.speak(word);

    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setCurrentWord(null);
    }
  };

  const stopAudio = async () => {
    try {
      await Tts.stop();
      setIsPlaying(false);
      setCurrentWord(null);
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentWord,
        playAudio,
        stopAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}; 