import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app'; 
import { firebaseConfig } from '../../firebase-config';
import ExerciseModal from '../Modal/ExerciseModal';

const Homepage = () => {
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState('Training');
    const [theme, setTheme] = useState('light'); // Step 1: Define state for theme
    const [username, setUsername] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]); // State to store selected exercises
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [customWorkouts, setCustomWorkouts] = useState([]);
    const [currentWorkout, setCurrentWorkout] = useState(null);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light'); // Step 3: Toggle between light and dark modes
    };

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
        // You can navigate to the corresponding screen here if needed
    };

    const handleLogout = () => {
        StatusBar.setBackgroundColor('#FFFFFF');
        signOut(auth)
        .then(() => {
        // Sign-out successful.
        navigation.navigate('login');
    })
        .catch((error) => {
        // An error happened.
        console.error(error);
    });
    };

    useEffect(() => {
        StatusBar.setBackgroundColor(theme === 'light' ? '#FFFFFF' : '#525151' );

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUsername(user.displayName); // Get the username from the authentication data
            } else {
                // User is signed out
                setUsername(''); // Clear the username if the user is signed out
            }
            });
        
            // Clean up the listener when the component unmounts
            return () => unsubscribe();
    }, [theme]);

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/Fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/Fonts/Poppins-SemiBold.ttf'),
        'Poppins-ExtraBold': require('../../assets/Fonts/Poppins-ExtraBold.ttf'),
    });
    
    if (!fontsLoaded) {
            return null;
    }

    const styles = theme === 'light' ? lightStyles : darkStyles;
    
    // Function to handle opening the modal
    const handleOpenModal = (exercisesData) => {
        setSelectedExercises(exercisesData); // Set selected exercises
        setModalVisible(true); // Set modal visibility to true
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setModalVisible(false); // Set modal visibility to false
    };

    const handleCreateWorkout = () => {
        setCurrentWorkout({ name: '', exercises: [] });
    };

    // Function to save the current workout
    const handleSaveWorkout = () => {
        if (currentWorkout.name && currentWorkout.exercises.length > 0) {
            setCustomWorkouts([...customWorkouts, currentWorkout]);
            setCurrentWorkout(null);
        }
    };

    // Function to delete a workout
    const handleDeleteWorkout = (index) => {
        const updatedWorkouts = customWorkouts.filter((_, i) => i !== index);
        setCustomWorkouts(updatedWorkouts);
    };

    // Function to update a workout
    const handleUpdateWorkout = (index) => {
        const workout = customWorkouts[index];
        setCurrentWorkout(workout);
    };

    // Function to handle exercise change
    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...currentWorkout.exercises];
        updatedExercises[index][field] = value;
        setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises });
    };

    // Function to add a new exercise
    const handleAddExercise = () => {
        setCurrentWorkout({ ...currentWorkout, exercises: [...currentWorkout.exercises, { name: '', sets: '', reps: '' }] });
    };

    // Function to remove an exercise
    const handleRemoveExercise = (index) => {
        const updatedExercises = currentWorkout.exercises.filter((_, i) => i !== index);
        setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises });
    };

    const fullBodyExercises = [
        {
          title: 'Full Body Workout',
          details: ['Farmer’s Carry: 3x20m', 'Deadlift: 3x10', 'Bench Press: 3x15', 'Push-Up: 3x15', 'Pull-Up: 3x8', 'Lunge: 3x12', 'Plank: 3x60s']
        },
        // Add more exercises as needed
      ];

      const chest = [
        {
          title: 'Chest Workout',
          details: ['Incline Bench Press: 3x10', 'Bench Press: 3x10', 'Standing Chest Fly: 3x12', 'Cable Crossover: 3x12', 'Push-Up: 3x15']
        },
        // Add more exercises as needed
      ];

      const back = [
        {
          title: 'Back Workout',
          details: ['Bent-over Row: 3x10', 'Lat Pulldown: 3x10', 'Deadlift: 3x10', 'Seated Row: 3x12', 'Pull-Up: 3x8']
        },
        // Add more exercises as needed
      ];

      const arm = [
        {
          title: 'Arm Workout',
          details: ['Bicep Curl: 3x12', 'Triceps Pushdown: 3x12', 'Reverse Curl: 3x12', 'Skull Crusher: 3x12', 'Concentration Curl: 3x12', 'Hammer Curl: 3x12']
        },
        // Add more exercises as needed
      ];

      const shoulder = [
        {
          title: 'Shoulder Workout',
          details: ['Overhead Press: 3x10', 'Lateral Raise: 3x12', 'Bent-over Reverse Fly: 3x12', 'Front Raise: 3x12', 'Arnold Press: 3x10']
        },
        // Add more exercises as needed
      ];

      const lowerbody = [
        {
          title: 'Lower Body Workout',
          details: ['Squat: 3x12', 'Glute Ham Raise: 3x12', 'Bulgarian Split Squat: 3x12', 'Lunge: 3x12', 'Leg Press: 3x12', 'Deadlift: 3x10', 'Calf Raise: 3x15']
        },
        // Add more exercises as needed
      ];

      const upperbody = [
        {
          title: 'Upper Body Workout',
          details: ['Push-ups', 'Pull-ups', 'Shoulder Press', 'Bent-over Rows', 'Bicep Curls', 'Tricep Dips', 'Dumbbell Flyes']        
        },
        // Add more exercises as needed
      ];

      const butt = [
        {
          title: 'Butt Workout',
          details: ['Hip Thrusts', 'Sumo Deadlifts', 'Walking Lunges', 'Glute Bridges', 'Donkey Kicks', 'Fire Hydrants', 'Squats']
        },
        // Add more exercises as needed
      ];

      const abs = [
        {
          title: 'Abs Workout',
          details: ['Crunches', 'Planks', 'Russian Twists', 'Leg Raises', 'Mountain Climbers', 'Bicycle Crunches']
        },
        // Add more exercises as needed
      ];
return (
    <View style={styles.container}>
            <View style={styles.title}>
                <Image source={require('../../assets/Images/dumbell.png')} style={styles.logo} />
                <Text style={styles.text}>Hub</Text>
                <Text style={styles.text1}>IT</Text>
            </View>

            <View style={styles.content}>
            {/* Render corresponding content based on activeTab */}
            {activeTab === 'Profile' && (
                <View style={styles.tabUser}>
                    <Text style={styles.topText}>PROFILE</Text>

                    <View style={styles.userContent}>
                        <View style={styles.profCon}>
                            <View style={styles.profContent}>
                                <Image source={require('../../assets/Images/img.png')} style={styles.profImg}/>
                                <Text style={styles.textName}>{username}</Text>
                            </View>

                            <View style={styles.basicInfo}>
                                <View style={styles.infoCon}>
                                    <Text style={styles.infoLabel}>Gender</Text>
                                    <Text style={styles.infoText}>Male</Text>
                                </View>

                                <View style={styles.infoCon}>
                                    <Text style={styles.infoLabel}>Current Weight</Text>
                                    <Text style={styles.infoText}>52</Text>
                                </View>

                                <View style={styles.infoCon}>
                                    <Text style={styles.infoLabel}>Target Weight</Text>
                                    <Text style={styles.infoText}>60</Text>
                                </View>

                                <View style={styles.infoCon}>
                                    <Text style={styles.infoLabel}>Height</Text>
                                    <Text style={styles.infoText}>159</Text>
                                </View>
                            </View>

                        
                            <TouchableOpacity style={styles.EditBtn}>
                                <Text style={styles.buttonText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>

                        
                    </View>
                </View>
            )}

            {activeTab === 'Training' && (
                <View style={styles.tabTraining}>
                    <Text style={styles.topText}>TRAINING</Text>

                    <ScrollView style={styles.scrollCardCon}>
                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(fullBodyExercises)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Full Body Workout</Text>
                                    <Text style={styles.cardDescription1}>7 exercises</Text>
                                    <Text style={styles.cardDescription2}>Farmer’s Carry</Text>
                                    <Text style={styles.cardDescription2}>Deadlift</Text>
                                    <Text style={styles.cardDescription2}>Bench Press</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/body.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity   TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(chest)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Chest Workout</Text>
                                    <Text style={styles.cardDescription1}>5 exercises</Text>
                                    <Text style={styles.cardDescription2}>Incline Bench Press</Text>
                                    <Text style={styles.cardDescription2}>Bench Press</Text>
                                    <Text style={styles.cardDescription2}>Standing Chest Fly</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/chest.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(back)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Back Workout</Text>
                                    <Text style={styles.cardDescription1}>5 exercises</Text>
                                    <Text style={styles.cardDescription2}>Bent-over Row</Text>
                                    <Text style={styles.cardDescription2}>Lat Pulldown</Text>
                                    <Text style={styles.cardDescription2}>Deadlift</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/back.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(arm)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Arm Workout</Text>
                                    <Text style={styles.cardDescription1}>6 exercises</Text>
                                    <Text style={styles.cardDescription2}>Bicep Curl</Text>
                                    <Text style={styles.cardDescription2}>Triceps Pushdown</Text>
                                    <Text style={styles.cardDescription2}>Reverse Curl</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/arm.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(shoulder)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Shoulders Workout</Text>
                                    <Text style={styles.cardDescription1}>5 exercises</Text>
                                    <Text style={styles.cardDescription2}>Overhead Press</Text>
                                    <Text style={styles.cardDescription2}>Lateral Raise</Text>
                                    <Text style={styles.cardDescription2}>Bent-over Reverse Fly</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/shoulder.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(lowerbody)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Lower Body Workout</Text>
                                    <Text style={styles.cardDescription1}>7 exercises</Text>
                                    <Text style={styles.cardDescription2}>Squat</Text>
                                    <Text style={styles.cardDescription2}>Glute Ham Raise</Text>
                                    <Text style={styles.cardDescription2}>Bulgarian Split Squat</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/leg.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(upperbody)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Upper Body Workout</Text>
                                    <Text style={styles.cardDescription1}>6 exercises</Text>
                                    <Text style={styles.cardDescription2}>Reverse Crunch</Text>
                                    <Text style={styles.cardDescription2}>Hanging Leg Raise Twist</Text>
                                    <Text style={styles.cardDescription2}>Standing Side Bend</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/upper-body.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(butt)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Butt Workout</Text>
                                    <Text style={styles.cardDescription1}>7 exercises</Text>
                                    <Text style={styles.cardDescription2}>Hip Thrust</Text>
                                    <Text style={styles.cardDescription2}>Sumo Deadlift</Text>
                                    <Text style={styles.cardDescription2}>Standing Glute Kickback</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/butt.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardCon}>
                            <TouchableOpacity style={styles.trainingCard} onPress={() => handleOpenModal(abs)}>
                                <View style={styles.left}>
                                    <Text style={styles.cardTitle}>Abs Workout</Text>
                                    <Text style={styles.cardDescription1}>6 exercises</Text>
                                    <Text style={styles.cardDescription2}>Reverse Crunch</Text>
                                    <Text style={styles.cardDescription2}>Hanging Leg Raise Twist</Text>
                                    <Text style={styles.cardDescription2}>Standing Side Bend</Text>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.imgCon}>
                                        <Image source={require('../../assets/Images/abs2.png')} style={styles.cardImg}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}

            {activeTab === 'Custom' && (
                    <View style={styles.tabCustom}>
                        <Text style={styles.topText}>CUSTOM</Text>
                        <View style={styles.CustomContentCon}>
                            <View style={styles.CusContent}>
                                <View style={styles.customImgCon}>
                                    <Image source={require('../../assets/Images/gym-machine.png')} style={styles.cusImg}/>
                                </View>
                                <Text style={styles.customText1}>Create your first custom workout</Text>
                                <Text style={styles.customText2}>Set up your own unique routine</Text>
                                <TouchableOpacity style={styles.starBtn} onPress={handleCreateWorkout}>
                                    <Text style={styles.buttonText}>+ Custom Workout</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.customWorkoutList}>
                                {customWorkouts.map((workout, index) => (
                                    <View key={index} style={styles.workoutCard}>
                                        <Text style={styles.workoutName}>{workout.name}</Text>
                                        {workout.exercises.map((exercise, exIndex) => (
                                            <Text key={exIndex} style={styles.exerciseText}>
                                                {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
                                            </Text>
                                        ))}
                                        <View style={styles.workoutActions}>
                                            <TouchableOpacity onPress={() => handleUpdateWorkout(index)}>
                                                <Text style={styles.actionText}>Update</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDeleteWorkout(index)}>
                                                <Text style={styles.actionText}>Delete</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('Video', { workout })}>
                                                <Text style={styles.actionText}>View Video</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        {currentWorkout && (
                            <Modal visible={true} onRequestClose={() => setCurrentWorkout(null)}>
                                <View style={styles.modalContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Workout Name"
                                        value={currentWorkout.name}
                                        onChangeText={(text) => setCurrentWorkout({ ...currentWorkout, name: text })}
                                    />
                                    <ScrollView>
                                        {currentWorkout.exercises.map((exercise, index) => (
                                            <View key={index} style={styles.exerciseInputContainer}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Exercise Name"
                                                    value={exercise.name}
                                                    onChangeText={(text) => handleExerciseChange(index, 'name', text)}
                                                />
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Sets"
                                                    value={exercise.sets}
                                                    onChangeText={(text) => handleExerciseChange(index, 'sets', text)}
                                                />
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Reps"
                                                    value={exercise.reps}
                                                    onChangeText={(text) => handleExerciseChange(index, 'reps', text)}
                                                />
                                                <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
                                                    <Text style={styles.removeText}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </ScrollView>
                                    <TouchableOpacity onPress={handleAddExercise}>
                                        <Text style={styles.addText}>+ Add Exercise</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleSaveWorkout}>
                                        <Text style={styles.saveText}>Save Workout</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        )}
                    </View>
                )}

            {activeTab === 'Settings' && (
                <View style={styles.tabSetting}>
                    <Text style={styles.topText}>SETTINGS</Text>
                    <View style={styles.SettingContentCon}>
                        <Text style={styles.aboveText}>Theme</Text>
                        <View style={styles.themeSwitcher}>
                            <View style={styles.ThemeBtn}>
                                <TouchableOpacity style={[styles.themeButton, theme === 'light' && styles.activeThemeButton]} onPress={toggleTheme} />
                                <Text style={styles.themeText}>Light Mode</Text>
                            </View>

                            <View style={styles.ThemeBtn}>
                                <TouchableOpacity style={[styles.themeButton, theme === 'dark' && styles.activeThemeButton]} onPress={toggleTheme} />
                                <Text style={styles.themeText}>Dark Mode</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            </View>

            <ExerciseModal exercises={selectedExercises} visible={modalVisible} onClose={handleCloseModal} />

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
                    onPress={() => handleTabPress('Profile')}>
                    <Image source={require('../../assets/Images/user.png')} style={styles.tabImg} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Training' && styles.activeTab]}
                    onPress={() => handleTabPress('Training')}>
                    <Image source={require('../../assets/Images/dumbell2.png')} style={styles.tabImg} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Custom' && styles.activeTab]}
                    onPress={() => handleTabPress('Custom')}>
                    <Image source={require('../../assets/Images/pen.png')} style={styles.tabImg} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Settings' && styles.activeTab]}
                    onPress={() => handleTabPress('Settings')}>
                    <Image source={require('../../assets/Images/setting.png')} style={styles.tabImg} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    title: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'relative',
        top: 40,
        
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#303030',
    },
    text1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#FF891D',
    },
    logo: {
        width: 50,
        height: 50,
    },
    content: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF891D',
    },
    tabImg:{
        width: 25,
        height: 25,
    },
    tabUser: {
        flex: 1,
    },
    userContent:{
        alignSelf: 'center',
        backgroundColor: '#FBF9F9',
        width: 373,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.50,
        elevation: 2,
    },
    scrollCardCon:{
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
    },
    tabTraining: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    cardCon: {
        alignSelf: 'center',
    },
    trainingCard: {
        backgroundColor: '#fff',
        width: 380,
        height: 180,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    cardTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#303030',
        marginBottom: 3,
    },
    cardDescription1: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#7B7A7A',
        marginBottom: 10,
    },
    cardDescription2: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#7B7A7A',
    },
    imgCon: {
        width: 120,
        height: 130,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        
    },
    cardImg: {
        width: 85,
        height: 85,    
    },
    right: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabCustom: {
        flex: 1,
    },
    CustomContentCon: {
        alignSelf: 'center',
        backgroundColor: '#FBF9F9',
        width: 373,
        height: 650,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.50,
        elevation: 2,
    },
    CusContent: {
        height: 650,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    customImgCon:  {
        width: 205,
        height: 205,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    cusImg: {
        width: 105,
        height: 105,
    },
    tabSetting: {
        flex: 1,
    },
    customText1: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 18,
        color: '#303030',
        paddingTop: 10,
    },
    customText2: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#303030',
    },
    starBtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
        top: 20,
    },
    topText: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 25,
        color: '#303030',
        paddingLeft: 20,
        marginTop: 40,
    },
    profCon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    profContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 345,
        height: 65,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.50,
        elevation: 1,  
        marginBottom: 10,      
    },
    profImg: {
        width: 50,
        height: 50,

    },
    textName:   {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        paddingLeft: 10,
        color: '#fff',
        
    },
    basicInfo: {
        alignItems: 'center',
    },
    infoCon: {
        width: 345,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.50,
        elevation: 1,
        marginBottom: 10,
    },
    infoLabel: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#7B7A7A',
        paddingLeft: 10,
        paddingTop: 5,
    },
    infoText:   {
        fontFamily: 'Poppins-SemiBold',
        color: '#313030',
        fontSize: 18,
        paddingLeft: 10,
    },

    EditBtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 195,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    SettingContentCon: {
        alignSelf: 'center',
        backgroundColor: '#FBF9F9',
        width: 373,
        height: 650,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.50,
        elevation: 2,
    },
    logoutButton: {
        alignSelf: 'center',
        width: '90%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 430,
    },

    darkBackground: {
        backgroundColor: '#303030', // Change background color for dark mode
    },
    aboveText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#7B7A7A',
        paddingLeft: 15,
        marginTop: 20,
    },

    // Theme Switcher styles
    themeSwitcher: {
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        width: 345,
        height: 75,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.50,
        elevation: 1,
        marginBottom: 10,
    },
    themeText: {
        flexDirection: 'row',
        fontFamily: 'Poppins-SemiBold',
        color: '#7B7A7A',
        fontSize: 15,
    },
    themeButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 15,
    },
    activeThemeButton: {
        backgroundColor: '#FF891D', // Change active button color for dark mode
    },
    ThemeBtn: {
        flexDirection: 'row',
    },
});

  // Define styles for dark theme
const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#525151',
        flexDirection: 'column',
    },
    title: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'relative',
        top: 40,
        
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#fff',
    },
    text1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#FF891D',
    },
    logo: {
        width: 50,
        height: 50,
        tintColor: '#fff'
    },
    content: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF891D',
    },
    tabImg:{
        width: 25,
        height: 25,
    },
    tabUser: {
        flex: 1,
    },
    userContent:{
        alignSelf: 'center',
        backgroundColor: '#B2B2B2',
        width: 373,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.50,
        elevation: 2,
    },
    scrollCardCon:{
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#525151',
    },
    tabTraining: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    cardCon: {
        alignSelf: 'center',
    },
    trainingCard: {
        backgroundColor: '#fff',
        width: 380,
        height: 180,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    cardTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#303030',
        marginBottom: 3,
    },
    cardDescription1: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#7B7A7A',
        marginBottom: 10,
    },
    cardDescription2: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#7B7A7A',
    },
    imgCon: {
        width: 120,
        height: 130,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        
    },
    cardImg: {
        width: 85,
        height: 85,    
    },
    right: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabCustom: {
        flex: 1,
    },
    CustomContentCon: {
        alignSelf: 'center',
        backgroundColor: '#B2B2B2',
        width: 373,
        height: 650,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.50,
        elevation: 2,
    },
    CusContent: {
        height: 650,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    customImgCon:  {
        width: 205,
        height: 205,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    cusImg: {
        width: 105,
        height: 105,
    },
    customText1: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 18,
        color: '#fff',
        paddingTop: 10,
    },
    customText2: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#fff',
    },
    starBtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
        top: 20,
    },
    tabSetting: {
        flex: 1,
    },
    topText: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 25,
        color: '#fff',
        paddingLeft: 20,
        marginTop: 40,
    },
    profCon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    profContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 345,
        height: 65,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.50,
        elevation: 1,
        marginBottom: 10,           
    },
    profImg: {
        width: 50,
        height: 50,

    },
    textName:   {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        paddingLeft: 10,
        color: '#fff',
        
    },
    basicInfo: {
        alignItems: 'center',
    },
    infoCon: {
        width: 345,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#BDBDBD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.50,
        elevation: 1,
        marginBottom: 10,
    },
    infoLabel: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#fff',
        paddingLeft: 10,
        paddingTop: 5,
    },
    infoText:   {
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        fontSize: 18,
        paddingLeft: 10,
    },

    EditBtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 195,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    SettingContentCon: {
        alignSelf: 'center',
        backgroundColor: '#B2B2B2',
        width: 373,
        height: 650,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.50,
        elevation: 2,
    },
    logoutButton: {
        alignSelf: 'center',
        width: '90%',
        height: 50,
        backgroundColor: '#FF891D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 430,
    },

    darkBackground: {
        backgroundColor: '#303030', // Change background color for dark mode
    },
    aboveText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#fff',
        paddingLeft: 15,
        marginTop: 20,
    },

    // Theme Switcher styles
    themeSwitcher: {
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        width: 345,
        height: 75,
        borderRadius: 10,
        backgroundColor: '#BDBDBD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3.50,
        elevation: 1,
        marginBottom: 10,
    },
    themeText: {
        flexDirection: 'row',
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
        fontSize: 15,
    },
    themeButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginHorizontal: 15,
    },
    activeThemeButton: {
        backgroundColor: '#FF891D', // Change active button color for dark mode
    },
    ThemeBtn: {
        flexDirection: 'row',
    },
});

export default Homepage;
