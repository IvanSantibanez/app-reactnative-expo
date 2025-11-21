import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
// Asegúrate de que esta ruta sea correcta para encontrar el archivo de tipos
import { Task } from '@/constants/types';
// 🚨 RUTA CRUCIAL: Necesita la notación '../' porque storage está fuera de la carpeta 'context'
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/storage';
// Importamos el hook de autenticación que está en la misma carpeta
import { useAuth } from './auth-context';

// 1. Definir el Tipo del Contexto
interface TasksContextType {
    tasks: Task[];
    loading: boolean;
    addTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
    toggleTask: (taskId: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

// 2. Componente Proveedor (Provider)
export const TasksProvider = ({ children }: { children: ReactNode }) => {
    // Estado que contiene TODAS las tareas (de todos los usuarios)
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Obtenemos el usuario autenticado

    // --- EFECTO 1: Cargar tareas al iniciar (LOAD) ---
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const storedTasks = await loadTasksFromStorage();
                setAllTasks(storedTasks);
            } catch (e) {
                console.error("Error cargando tareas iniciales:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    // --- EFECTO 2: Guardar tareas cada vez que cambia allTasks (SAVE) ---
    // Este efecto garantiza la persistencia en AsyncStorage
    useEffect(() => {
        // Solo guardamos si ya terminamos de cargar
        if (!loading) {
            saveTasksToStorage(allTasks);
        }
    }, [allTasks, loading]);

    // --- FUNCIONES CRUD (usando useCallback para evitar el error de useMemo) ---

    // 🚨 Función para agregar una nueva tarea
    const addTask = useCallback((task: Task) => {
        setAllTasks((prevTasks) => [...prevTasks, task]);
    }, []); // Dependencias vacías: solo se crea una vez

    // 🚨 Función para eliminar una tarea
    const deleteTask = useCallback((taskId: string) => {
        setAllTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    }, []); // Dependencias vacías

    // 🚨 Función para alternar el estado (completado/no completado)
    const toggleTask = useCallback((taskId: string) => {
        setAllTasks((prevTasks) =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    }, []); // Dependencias vacías

    // 3. Filtrar Tareas: Solo las del usuario logueado (useMemo para eficiencia)
    const userTasks = useMemo(() => {
        // Si no hay usuario, devuelve un array vacío
        if (!user) return [];
        // Filtra todas las tareas por el ID del usuario actual
        return allTasks.filter(task => task.userId === user.id);
    }, [allTasks, user]); // Se recalcula solo si cambian TODAS las tareas o el USUARIO.


    const contextValue = useMemo(() => ({
        tasks: userTasks, // Exponemos la lista FILTRADA
        loading,
        addTask,
        deleteTask,
        toggleTask,
        // Depende de userTasks (la lista filtrada) y loading. Las funciones son estables.
    }), [userTasks, loading]);

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    );
};

// 4. Hook personalizado para usar el contexto (useTasks)
export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks debe ser usado dentro de un TasksProvider');
    }
    return context;
};