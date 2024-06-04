import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './Components/LandingPage/Landing';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import Home from './Components/HomePage/Homepage';
import { StatusBar } from 'expo-status-bar'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <StatusBar backgroundColor="#FFFFFF" />
      <Stack.Navigator
      
        initialRouteName="landing"
        screenOptions={{
          animation: 'default',
          headerShown: false,
        }}>
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="home" component={Home} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
