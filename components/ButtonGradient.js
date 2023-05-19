import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
export default function ButtonGradient() {
  return (
    <TouchableOpacity style={styles.container} >
      <LinearGradient
        colors={["#FFB200","#FF6100", "#FE0C0C"]}
        start={{x:1, y:0}}
        end={{x:0, y:1}}
        style={styles.button}
        >
        <Text style={styles.text}> Iniciar sesión</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  container: {
    flex: 1, 
    alignItems: 'center',
    width: 200,
    marginTop: 60
  }

});