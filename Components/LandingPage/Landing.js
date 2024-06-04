import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation(); // Retrieve the navigation object

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        navigation.navigate('login');
      }, 1500);
    }
  }, [fontsLoaded, navigation]);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textCon}>
        <Text style={styles.text}>Hub</Text>
        <Text style={styles.text1}>IT</Text>
      </View>
      <Image source={require('../../assets/Images/dumbell.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  textCon: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 80,
    color: '#303030',
  },
  text1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 80,
    color: '#FF891D',
  },
  logo: {
    width: 104,
    height: 104,
    position: 'relative',
    top: -50,
  },
});

export default Landing;
