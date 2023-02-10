import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ImageBackground, ScrollView, Modal } from 'react-native';

const ToDo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [taskToEdit, setTaskToEdit] = useState('');

  const addTodo = () => {
    if (editIndex === -1) {
      setTodos([...todos, todo]);
    } else {
      let newTodos = [...todos];
      newTodos[editIndex] = todo;
      setTodos(newTodos);
      setEditIndex(-1);
      setTaskToEdit('');
    }
    setTodo('');
    setModalVisible(false);
  };

  const deleteTodo = index => {
    setTodos(todos.filter((t, i) => i !== index));
  };

  const editTodo = (index, task) => {
    setEditIndex(index);
    setTaskToEdit(task);
    setModalVisible(true);
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/06/94/b1/0694b1d20329a735180d724f5f94be89.jpg' }} style={styles.backgroundImage}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView>
          {todos.map((t, i) => (
            <View key={i} style={styles.todoContainer}>
              <Text>{t}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => editTodo(i, t)}>
                <Text style={styles.editText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(i)}>
                <Text style={styles.deleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              value={todo}
              onChangeText={text => setTodo(text)}
              placeholder="Ajouter une tâche"
            />
            <TouchableOpacity style={styles.button} onPress={addTodo}>
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  input: {
    height: 60,
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    minWidth: 300,
    maxWidth: 300,
    borderRadius: 30
  },
  button: {
    marginBottom: 30,
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
    minWidth: 300,
    maxWidth: 300,
    borderRadius: 30
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 300,
    maxWidth: 300,
    borderRadius: 30,
  },
  todoContainer: {
    marginTop: 30,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    minWidth: 300,
    maxWidth: 300,
    opacity: 0.8,
    borderRadius: 30

  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    marginLeft: 10,
    borderRadius: 30,
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 30
  },
  editButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    marginLeft: 10,
    borderRadius: 30,
    minWidth: 100,
  },
  editText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ToDo;
