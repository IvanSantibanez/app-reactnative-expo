import { COLORS } from "@/constants/colors";
import { Task } from "@/constants/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  task: Task,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
};

export default function TaskItem({ task, onToggle, onDelete }: ItemProps) {

  return (
    <View style={styles.container}>

      {/* CONTENEDOR DE CHECK Y TÍTULO */}
      <View style={styles.leftContent}>
        <TouchableOpacity
          style={[styles.circle, task.completed && styles.circleDone]}
          onPress={() => onToggle(task.id)}>
          <FontAwesome
            name="check"
            size={20}
            color="green"
            style={!task.completed && styles.iconDone}
          />
        </TouchableOpacity>

        {/*  IMAGEN DE LA TAREA (BASE64) */}
        {task.photoUri && (
          <Image
            source={{ uri: task.photoUri }} // La cadena Base64 se usa directamente como URI
            style={styles.taskImage}
          />
        )}

        {/* Título de la tarea */}
        <Text
          style={[styles.title, task.completed && styles.done]}
          numberOfLines={1} // Evita que el título sea muy largo
        >
          {task.title}
        </Text>
      </View>

      {/* 3. BOTÓN DE ELIMINAR */}
      <FontAwesome
        size={24}
        name="trash"
        color="red"
        onPress={() => onDelete(task.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Para centrar verticalmente la imagen con el texto
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray
  },
  leftContent: {
    flex: 1, // Permite que el contenido tome el espacio restante
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Espaciado entre elementos
    marginRight: 10,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleDone: {
    borderColor: 'green'
  },
  taskImage: { //  Estilo para mostrar la miniatura de la foto
    width: 40,
    height: 40,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  title: {
    flex: 1, // Asegura que el texto no empuje los demás elementos si es largo
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: COLORS.gray
  },
  iconDone: {
    display: 'none'
  }
})