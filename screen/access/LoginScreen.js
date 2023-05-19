import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ButtonGradient from '../../components/ButtonGradient';

export default function LoginScreen() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


  return (
    <View style={styles.container}>
      <View style={styles.contender}>
        <Image style={styles.imagen} source={require("../../assets/login.png")} r/>
      </View>
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subTitle}>Ingrese con su cuenta</Text>
      <TextInput style={styles.input} placeholder="Ingrese su correo" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Ingrese su contraseña" value={password} onChangeText={setPassword} />
      <ButtonGradient />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2C3961",
      alignItems: "center",
      justifyContent: "center",
    },
    contender:{
      width: width,
      justifyContent: 'flex-start',
      alignItems:'center'
    },
    titulo: {
      fontSize: 50,
      color: "white",
      fontWeight: "bold",
    },
    imagen: {
      resizeMode: "center"
    },
    subTitle: {
      fontSize: 20,
      color: "gray",
    },
    input: {
      padding: 10,
      width: "80%",
      height: 50,
      paddingStart: 30,
      marginTop: 20,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "white",
      backgroundColor: "#2C3961",
    },
  });