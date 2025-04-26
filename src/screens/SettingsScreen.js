import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Switch, List, Divider } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleDarkMode, updateFontSize } = useContext(ThemeContext);

  const fontSizes = [22, 20, 18, 16, 14];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.headerTitle}>Settings</Text>
            </View>
      <List.Section>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
  <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold' }}>
    Appearance
  </Text>
</View>

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
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
  <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold' }}>
    Font Size
  </Text>
</View>

{fontSizes.map((size) => (
  <List.Item
    key={size}
    title={`${size}px`}
    onPress={() => updateFontSize(size)}
    titleStyle={{
      color: theme.colors.text,
      fontSize: size, 
      fontWeight: size === theme.fontSize ? 'bold' : 'normal',
    }}
    right={() =>
      size === theme.fontSize ? (
        <List.Icon icon="check" color={theme.colors.primary} />
      ) : null
    }
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
});

export default SettingsScreen; 