import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      const savedHistory = await AsyncStorage.getItem('history');
      
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const addToFavorites = async (word) => {
    if (!favorites.some(fav => fav.word === word.word)) {
      const newFavorites = [...favorites, word];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = async (word) => {
    const newFavorites = favorites.filter(fav => fav.word !== word);
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const addToHistory = async (word) => {
    const timestamp = new Date().toISOString();
    const newHistory = [
      { word, timestamp },
      ...history.filter(item => item.word.word !== word.word)
    ].slice(0, 50); // Keep only the last 50 searches
    
    setHistory(newHistory);
    await saveHistory(newHistory);
  };

  const clearHistory = async () => {
    setHistory([]);
    await saveHistory([]);
  };
  const removeFromHistory = async (timestamp) => {
    const newHistory = history.filter(item => item.timestamp !== timestamp);
    setHistory(newHistory);
    await saveHistory(newHistory);
  };
  

  return (
    <WordContext.Provider
  value={{
    favorites,
    history,
    addToFavorites,
    removeFromFavorites,
    addToHistory,
    clearHistory,
    removeFromHistory,
  }}
>

      {children}
    </WordContext.Provider>
  );
}; 