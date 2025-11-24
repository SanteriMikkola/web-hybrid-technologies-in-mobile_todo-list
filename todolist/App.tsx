import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Pressable } from 'react-native';
import TaskButton from "./components/task";
import ClearButton from './components/clear';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'SECRET_TODO_LIST';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTasks(JSON.parse(json));
      } catch (e) {
        console.error("Failed to load tasks.", e);
      }
    })();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(e => {
      console.error("Failed to save tasks.", e);
    });
  }, [tasks]);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add task"
        />
        <Pressable style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={[...tasks].reverse()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskButton
            id={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={toggleTask}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <ClearButton
        visible={tasks.length > 0}
        onPress={clearTasks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 96,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: "#11da06ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  rowFront: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  taskItem: {
    backgroundColor: '#ffffff',
  },
})
