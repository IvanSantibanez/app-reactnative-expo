// utils/storage.ts

import { Task } from "@/constants/types";
import { User } from "@/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const SESSION_STORAGE_KEY = '@SESSION';
// CLAVE ESPECÍFICA PARA TODAS LAS TAREAS 
const TASKS_STORAGE_KEY = '@MyApp:Tasks';


// 1. LÓGICA ESPECÍFICA PARA TAREAS (Refactorización de storeData/getData) //


/**
 * Carga el array completo de tareas desde AsyncStorage.
 */
export const loadTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    // Retorna el array de Task o un array vacío si no hay datos
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error al cargar tareas (loadTasksFromStorage): ', e);
    // Si hay un error grave, podemos alertar, pero mejor solo loguear para no interrumpir el inicio
    return [];
  }
}

/**
 * Guarda el array completo de tareas en la persistencia local.
 */
export const saveTasksToStorage = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error al guardar tareas (saveTasksToStorage): ', e);
    Alert.alert('Ocurrió un error al guardar las tareas.');
  }
};




export const saveSessionToStorage = async (sessionData: User) => {
  try {
    const stringSession = JSON.stringify(sessionData);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, stringSession);
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
  }
}

export const loadSessionFromStorage = async (): Promise<User | null> => {
  try {
    const sessionString = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    return sessionString ? JSON.parse(sessionString) : null;
  } catch (error) {
    console.error('Error al cargar la sesión:', error);
    return null;
  }
}

export const clearSessionFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Error al eliminar la sesión:', error);
  }
}
