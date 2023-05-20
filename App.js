import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { initializeApp } from 'firebase/app'
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import HiddenScreen from './screens/HiddenScreen';
import VictimLoginScreen from './screens/VictimLoginScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import SetupPinScreen from './screens/SetupPinScreen';
import ConfirmPinScreen from './screens/ConfirmPinScreen';
import CalculatorScreen from './screens/CalculatorScreen';

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
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name={Platform.OS === "ios" ? 'Get Started' : 'GBV Login'} 
        component={Platform.OS === "ios" ? GetStartedScreen : LoginScreen} />
        {/* <Stack.Screen name={Platform.OS === "ios" ? 'HiddenScreen' : 'GBV Org Login Screen'} 
        component={Platform.OS === "ios" ? HiddenScreen : LoginScreen} /> */}
        <Stack.Screen name='SetupPin' component={SetupPinScreen} />
        <Stack.Screen name='ConfirmPin' component={ConfirmPinScreen} />
        <Stack.Screen name='Calculator' component={CalculatorScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='VictimLogin' component={VictimLoginScreen} />
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
