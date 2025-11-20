import { COLORS } from "@/constants/colors";
import { Task } from "@/constants/types";
import { useAuth } from "@/context/auth-context";
import { getData, storeData } from "@/utils/storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddTaskView from "../components/add-task";
import TaskItem from "../components/task-item";


export default function TodoView() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);
  const storageKey = `@TODOS_${user?.email}`;

  // useEffects para cargar y guardar los todos desde AsyncStorage
  useEffect(() => {
    getData(storageKey).then((loadedTodos) => {
      setTodos(loadedTodos);
    });
  }, [storageKey])

    useEffect(() => {
    storeData(storageKey, todos)
  }, [todos, storageKey])

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    )
  }

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  const addTodo = (newTodo: Task) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  if (creatingNew) {
    return (
      <View style={styles.container}>
        <AddTaskView onClose={() => setCreatingNew(false)} onAddTask={addTodo} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>
      <ScrollView>
        {todos.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTodo}
            onDelete={removeTodo} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.btnNewTask} onPress={() => setCreatingNew(true)}>
        <FontAwesome name="plus-circle" size={50} color="green" />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 10
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 24,
    color: COLORS.textPrimary,
    textAlign: 'center'
  },
  btnNewTask: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  btnAddTask: {
    backgroundColor: COLORS.primaryAction,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 14
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 2
  },

})