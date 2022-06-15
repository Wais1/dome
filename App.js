import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { initializeApp } from 'firebase/app'
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import HiddenScreen from './screens/HiddenScreen';

const Stack = createNativeStackNavigator();

// Styles applied to each page,
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#FF83A8'},
  headerTitleStyle: { color: 'white'},
  headerTintColor: 'white'
}

export default function App() {
  return (
    <NavigationContainer>
      {/* Screen options apply to each page */}
      <Stack.Navigator  screenOptions={globalScreenOptions}>
        <Stack.Screen name='HiddenScreen' component={HiddenScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChatScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
