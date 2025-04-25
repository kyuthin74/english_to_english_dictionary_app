import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        const { isDarkMode: savedDarkMode, fontSize: savedFontSize } = JSON.parse(settings);
        setIsDarkMode(savedDarkMode);
        setFontSize(savedFontSize);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    await saveSettings({ isDarkMode: newDarkMode, fontSize });
  };

  const updateFontSize = async (newSize) => {
    setFontSize(newSize);
    await saveSettings({ isDarkMode, fontSize: newSize });
  };

  const theme = {
    isDarkMode,
    fontSize,
    colors: {
      primary: isDarkMode ? '#DC2626' : '#B91C1C',
      secondary: isDarkMode ? '#F87171' : '#EF4444',
      background: isDarkMode ? '#1F2937' : '#FEE2E2',
      card: isDarkMode ? '#111827' : '#FFFFFF',
      text: isDarkMode ? '#F3F4F6' : '#1F2937',
      border: isDarkMode ? '#374151' : '#FECACA',
      notification: '#DC2626',
      placeholder: isDarkMode ? '#6B7280' : '#9CA3AF',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#DC2626',
      info: '#3B82F6',
      surface: isDarkMode ? '#111827' : '#FEE2E2',
      onSurface: isDarkMode ? '#F3F4F6' : '#1F2937',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
    typography: {
      h1: {
        fontSize: fontSize * 2,
        fontWeight: 'bold',
      },
      h2: {
        fontSize: fontSize * 1.5,
        fontWeight: 'bold',
      },
      body: {
        fontSize: fontSize,
      },
      caption: {
        fontSize: fontSize * 0.875,
      },
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleDarkMode,
        updateFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 