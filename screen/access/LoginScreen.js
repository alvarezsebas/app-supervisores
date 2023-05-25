import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../components/AuthContext";
import { postLogin } from "../../api/auth";
const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const { authe, state } = useContext(AuthContext);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setError("");
      const { username, password } = formValue;
      
     const response = await postLogin(formValue.username, formValue.password)
      if (response.ok === true) {
       
       await authe.signIn(response.usuario);
       this.usuario = response.usuario._id
        
      } else {
        ToastAndroid.show('El usuario o contraseña son incorrectos', ToastAndroid.SHORT);
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contender}>
        <Image
          style={styles.imagen}
          source={require("../../assets/login.png")}
          
        />
      </View>
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subTitle}>Ingrese con su cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <TouchableOpacity style={styles.contenedor} 
      onPress={formik.handleSubmit}>
        <LinearGradient
          colors={["#FFB200", "#FF6100", "#FE0C0C"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.text}> Iniciar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3961",
    alignItems: "center",
    justifyContent: "center",
  },
  contender: {
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  imagen: {
    resizeMode: "center",
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
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  contenedor: {
    flex: 1,
    alignItems: "center",
    width: 200,
    marginTop: 60,
  },
});
