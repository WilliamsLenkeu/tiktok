import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const loadTodos = async () => {
    const savedTodos = await AsyncStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const saveTodos = async (newTodos: TodoItem[]) => {
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const addTodo = () => {
    if (inputText.trim() === '') {
      Alert.alert('Erreur', 'Le texte de la tâche ne peut pas être vide.');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputText,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setInputText('');
    saveTodos(updatedTodos);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)}>
        <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <Button title="Supprimer" onPress={() => deleteTodo(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste de Tâches</Text>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une nouvelle tâche"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Ajouter" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  todoText: {
    fontSize: 18,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TodoList;
