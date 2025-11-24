import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type TaskProps = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
};

const TaskButton: React.FC<TaskProps> = ({ id, text, completed, onToggle }) => {

  return (
    <TouchableOpacity
      style={[styles.button, completed && styles.buttonDone]}
      onPress={() => onToggle(id)}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, completed && styles.textDone]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(17, 113, 177, 0.53)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  buttonDone: {
    backgroundColor: "rgba(83, 85, 85, 0.18)",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
});

export default TaskButton;