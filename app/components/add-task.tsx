import { COLORS } from '@/constants/colors';
import { Task } from '@/constants/types';
import { useAuth } from '@/context/auth-context';
import generateRandomId from '@/utils/generate-random-id';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddTaskProps {
  onClose: () => void;
  onAddTask: (newTodo: Task) => void;
}

export default function AddTaskView({ onClose, onAddTask }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const { user } = useAuth();


  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título de la tarea no puede estar vacío.');
      return;
    };

    const newTodo: Task = {
      id: generateRandomId(),
      title: title.trim(),
      completed: false,
      userId: user ? user.id : ''
    }

    onAddTask(newTodo);
    setTitle('');
    onClose();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Agregar Nueva Tarea</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.photoBox}>

        <View style={styles.placeholder}>
          <FontAwesome name="camera" size={40} color={COLORS.white} />
          <Text style={styles.placeholderText}>Sin imagen</Text>
        </View>

      </View>

      <TouchableOpacity style={styles.actionButton}>
        <FontAwesome name="camera" size={20} color={COLORS.white} />
        <Text style={styles.buttonText}>Tomar Fotografía</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnAddTask} onPress={handleAdd}>
        <FontAwesome name="plus" size={16} color={COLORS.white} />
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnBack} onPress={onClose}>
        <FontAwesome name="arrow-circle-left" size={50} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'poppins-bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  btnAddTask: {
    backgroundColor: COLORS.sendAction,
    paddingVertical: 10,
    borderRadius: 8,
    width: 200,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 2
  },
  btnBack: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primaryAction,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  photoBox: {
    width: '100%',
    height: 180,
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.backgroundAccent,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: COLORS.white,
    fontSize: 14,
  },
});
