import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeProvider } from './src/context/ThemeContext';
import { WordProvider } from './src/context/WordContext';
import { AudioProvider } from './src/context/AudioContext';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';
import { ThemeContext } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Search':
              iconName = 'magnify';
              break;
            case 'History':
              iconName = 'history';
              break;
            case 'Dictionary':
              iconName = 'book-open-variant';
              break;
            case 'Bookmarks':
              iconName = 'bookmark';
              break;
            case 'Setting':
              iconName = 'cog';
              break;
          }

          return (
            <MaterialCommunityIcons
                  name={iconName}
                  color={focused ? theme.colors.primary : theme.colors.placeholder}
                  size={24}
                />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.placeholder,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          title: 'History',
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={FavoritesScreen}
        options={{
          title: 'Bookmarks',
        }}
      />
      <Tab.Screen 
        name="Dictionary" 
        component={DictionaryScreen}
        options={{
          title: 'Dictionary',
        }}
      />
      <Tab.Screen 
        name="Setting"
        component={SettingsScreen}
        options={{
          title: 'Setting',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <WordProvider>
        <AudioProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AudioProvider>
      </WordProvider>
    </ThemeProvider>
  );
};

export default App; 