import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';

const ExerciseModal = ({ exercises, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Text style={styles.closeText}>&times;</Text>
          </TouchableOpacity>
          <View style={styles.modalBody}>
            {exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                {exercise.details.map((detail, idx) => (
                  <Text key={idx} style={styles.exerciseDetail}>
                    {detail}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#aaa',
  },
  modalBody: {
    paddingBottom: 20,
  },

  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ExerciseModal;
