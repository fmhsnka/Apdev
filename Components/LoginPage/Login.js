import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';

const Login = () =>{
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterPress = () => {
        navigation.navigate('register');
    };

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/Fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/Fonts/Poppins-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
            return null;
    }

    const handleLoginPress = () => {
        // Check if email or password is empty
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('home');
                // Reset email and password fields
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                    
                // Check if the error is due to user not found or wrong password
                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                    // Display a message indicating invalid credentials
                    alert('Invalid email or password. Please try again.');
                } else {
                    // Handle other errors
                    alert('An error occurred. Please try again later.');
                }
            });
        };

return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Image source={require('../../assets/Images/dumbell.png')} style={styles.logo} />
            <Text style={styles.text}>Hub</Text>
            <Text style={styles.text1}>IT</Text>
        </View>

        <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.RegContainer}>
            <Text style={styles.RegText1}>Need an account? </Text>

            <TouchableOpacity onPress={handleRegisterPress}>
                <Text style={styles.RegText2}>Register here.</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
    },
    title: {
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 64,
        color: '#303030',
    },
    text1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 64,
        color: '#FF891D',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    logo: {
        width: 104,
        height: 104,
    },
    forgotPasswordLink: {
        alignSelf: 'flex-end',
        position: 'relative',
        paddingTop: 1,
    },
    forgotPasswordText: {
        color: '#7B7A7A',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF891D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 55,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    RegContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        position: 'relative',
        top: 150,
    },

    RegText1: {
        color: '#7B7A7A',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
    },
    RegText2: {
        color: '#FF891D',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default Login;
