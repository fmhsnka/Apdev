import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { getFirestore, setDoc, doc} from 'firebase/firestore';

const Register = () => {
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleBackpress = () => {
        navigation.navigate('login');
    };

    const handleRegisterPress = () => {
        if (password !== confirmPassword) {
            // Handle password mismatch error
            setErrorMessage('The password and confirm password fields must match.');
            return;
        }
    
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Send email verification
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent
                        // You may want to navigate to a page indicating that verification email has been sent
                        console.log("Verification email sent");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
    
                // Set the username in the authentication profile
                updateProfile(auth.currentUser, {
                    displayName: username // Set the username provided during registration
                }).then(() => {
                    // Username set successfully
                    setUsername(username); // Set the username in the state
    
                    // Add more user information to Firestore if needed
                    const user = userCredential.user;
                    const userRef = doc(db, "users", user.uid);
                    setDoc(userRef, {
                        email: user.email,
                        username: username, // Also store the username in Firestore
                        // Add more user information if needed
                    });
    
                    // Navigate to main page after successful registration and username update
                    navigation.navigate('home');
                }).catch((error) => {
                    console.error("Error setting username:", error);
                });
    
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                // Set error message state
                setErrorMessage(errorMessage);
            });
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackpress} style={styles.backBtnCon}>
                    <Image source={require('../../assets/Images/back-button.png')} style={styles.backButton} />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Image source={require('../../assets/Images/dumbell.png')} style={styles.logo} />
                    <Text style={styles.text}>Hub</Text>
                    <Text style={styles.text1}>IT</Text>
                </View>
            </View>

            {errorMessage !== '' && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <View style={styles.info}>
                <Text style={styles.textInfo}>Information</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Gender"
                onChangeText={(text) => setGender(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Current Weight"
                keyboardType="numeric"
                Text="kg"
                onChangeText={(text) => setWeight(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Target Weight"
                keyboardType="numeric"
                onChangeText={(text) => setTargetWeight(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Height"
                keyboardType="numeric"
                onChangeText={(text) => setHeight(text)}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
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
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    backBtnCon: {
        position: 'absolute',
        top: -20,
        left: -45,
    },
    backButton: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
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
    logo: {
        width: 104,
        height: 104,
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
    info: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    textInfo: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#7B7A7A',
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    errorContainer: {
        width: '100%',
        backgroundColor: '#FFCDCD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
});

export default Register;
