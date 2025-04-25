import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Switch, List, Divider } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleDarkMode, updateFontSize } = useContext(ThemeContext);

  const fontSizes = [14, 16, 18, 20];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <List.Section>
        <List.Subheader style={{ color: theme.colors.text }}>
          Appearance
        </List.Subheader>
        <List.Item
          title="Dark Mode"
          right={() => (
            <Switch
              value={theme.isDarkMode}
              onValueChange={toggleDarkMode}
              color={theme.colors.primary}
            />
          )}
          titleStyle={{ color: theme.colors.text }}
        />
        <Divider />
        <List.Subheader style={{ color: theme.colors.text }}>
          Font Size
        </List.Subheader>
        {fontSizes.map((size) => (
          <List.Item
            key={size}
            title={`${size}px`}
            onPress={() => updateFontSize(size)}
            right={() =>
              size === theme.fontSize ? (
                <List.Icon icon="check" color={theme.colors.primary} />
              ) : null
            }
            titleStyle={{ color: theme.colors.text }}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen; 