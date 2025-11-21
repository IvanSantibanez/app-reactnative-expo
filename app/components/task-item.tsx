import { COLORS } from "@/constants/colors";
import { Task } from "@/constants/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// 🚨 Importamos Alert para mostrar la ubicación
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  task: Task,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
};

export default function TaskItem({ task, onToggle, onDelete }: ItemProps) {

  // 🚨 FUNCIÓN PARA MOSTRAR LA UBICACIÓN (ÚLTIMO REQUISITO FUNCIONAL)
  const handleShowLocation = () => {
    if (task.location) {
      Alert.alert(
        'Ubicación de Creación',
        // Formateamos las coordenadas a 4 decimales para que se vea limpio
        `Latitud: ${task.location.latitude.toFixed(4)}\nLongitud: ${task.location.longitude.toFixed(4)}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Error', 'No se encontraron datos de ubicación.');
    }
  };

  return (
    <View style={styles.container}>

      {/* CONTENEDOR PRINCIPAL: CHECK, IMAGEN Y TÍTULO */}
      <View style={styles.leftContent}>

        {/* 1. BOTÓN DE COMPLETADO (TOGGLE) */}
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

        {/* 2. IMAGEN DE LA TAREA (BASE64) */}
        {task.photoUri && (
          <Image
            source={{ uri: task.photoUri }}
            style={styles.taskImage}
          />
        )}

        {/* CONTENEDOR DE TÍTULO Y BOTÓN DE UBICACIÓN */}
        <View style={styles.textWrapper}>
          {/* Título de la tarea */}
          <Text
            style={[styles.title, task.completed && styles.done]}
            numberOfLines={1}
          >
            {task.title}
          </Text>

          {/* 🚨 MOSTRAR UBICACIÓN */}
          {task.location && (
            <TouchableOpacity onPress={handleShowLocation} style={styles.locationButton}>
              <FontAwesome name="map-marker" size={14} color={COLORS.primaryAction} />
              <Text style={styles.locationText}>Ver Ubicación</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>

      {/* 3. BOTÓN DE ELIMINAR */}
      <FontAwesome
        size={24}
        name="trash"
        color="#ff3b30"
        onPress={() => onDelete(task.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginVertical: 4
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 3,
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
  taskImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  done: {
    textDecorationLine: 'line-through',
    color: COLORS.gray
  },
  iconDone: {
    display: 'none'
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'flex-start',
    backgroundColor: "#7b8285ff",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  locationText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  }
})