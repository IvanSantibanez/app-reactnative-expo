import { COLORS } from "@/constants/colors";
import { Task } from "@/constants/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  task: Task,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
};

export default function TaskItem({ task, onToggle, onDelete }: ItemProps) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.circleDone]}
        onPress={() => onToggle(task.id)}>
        <FontAwesome name="check" size={20} color="green" style={!task.completed && styles.iconDone}/>
      </TouchableOpacity>
      <Text style={[task.completed && styles.done]}>{task.title}</Text>
      <FontAwesome
        size={24}
        name="trash"
        color="red"
        onPress={() => onDelete(task.id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray
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
  done: {
    textDecorationLine: 'line-through',
    color: COLORS.gray
  },
  iconDone: {
    display: 'none'
  }
})