import { Task } from "@/constants/types";
import { User } from "@/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const SESSION_STORAGE_KEY = '@SESSION';


export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('error al obtener la data. ', e);
    Alert.alert('Ocurrió un error al obtener las tareas');
  }
}

export const storeData = async (key: string, value: Task[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error al guardar la data. ', e);
    Alert.alert('Ocurrió un error al guardar la tarea. Vuelva a intentarlo');

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