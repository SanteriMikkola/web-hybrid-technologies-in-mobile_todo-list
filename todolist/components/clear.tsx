import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type ClearButtonProps = {
  visible: boolean;
  onPress: () => void;
};

const ClearButton: React.FC<ClearButtonProps> = ({ visible, onPress }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Clear all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.97)",
    borderTopWidth: 1,
    height: 110,
    borderColor: "#ddd",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#fbff04ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ClearButton;
