import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Picker,
  ToastAndroid,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getAbonados } from "../../api/abonados";
import { SignatureView } from "react-native-signature-capture-view";
import { postDatos } from "../../api/revista";
import * as Yup from "yup";
import { useFormik } from "formik";
import * as Location from 'expo-location';



const data = [];
const datos = async () => {
  const abonados = await getAbonados();
  for await (const abonadoItem of abonados.abonados) {
    let abonado = {
      label: abonadoItem.aliasAbonado + "-" + abonadoItem.ciudadAbonado,
      value: abonadoItem._id,
    };

    data.push(abonado);
  }
};

export default function HomeScreen(props) {
  const { authe, state } = useContext(AuthContext);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState("");
  const [textSuper, setTextSuper] = useState("");

  const [location, setLocation] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [latitud, setLatitud] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Seleccione un puesto
        </Text>
      );
    }
    return null;
  };

  const foto = () => {
    navigation.navigate("Foto");
  };
  useEffect(async () => {
   const ubicacion = async() => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLongitud(location.coords.longitude);
      setLatitud(location.coords.latitude);
      setLocation(location.coords);
    }
    ubicacion();
    datos();
  }, []);

  let loct = 'Waiting..';
  if (errorMsg) {
    loct = errorMsg;
  } else if (location) {
    loct = JSON.stringify(location);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValues, {resetForm}) => {
  
      let foto = "data:image/png;base64,"+this.foto
      let datas = {
        firmaCliente: text,
        firmaSuper: textSuper,
        foto: foto,
        nombreEmpleado: formValues.nombreEmpleado,
        usuario: this.usuario,
        comentario: formValues.comentario,
        abonado: value,
        latitud: latitud,
        longitud: longitud
      };
      try {
        const response = await postDatos(datas);
        if (response.ok === true) {
          ToastAndroid.show(
            "Se guardo el reporte correctamente",
            ToastAndroid.SHORT
          );
          setTimeout(() => {
      resetForm({values: {comentario: "",
      nombreEmpleado: "",}})
      setValue("")
      signatureRef.current.clearSignature();
      signatureRefSuper.current.clearSignature();
      setLocation("");
    }, 1000);
        } else {
        }
      } catch (error) {}
    },
  });

  const signatureRef = useRef(null);
  const signatureRefSuper = useRef(null);
  return (
    <ScrollView>
       <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Seleccione un puesto" : "..."}
        searchPlaceholder="Buscar..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
      <Text>{"\n"}</Text>
      <Button
        style={styles.boton}
        onPress={foto}
        title="Tomar foto del puesto"
      />
      <TextInput
        placeholder="Escriba el reporte"
        style={styles.input}
        value={formik.values.comentario}
        onChangeText={(text) => formik.setFieldValue("comentario", text)}
      ></TextInput>
      <TextInput
        placeholder="Escriba el nombre del empleado"
        style={styles.input}
        value={formik.values.nombreEmpleado}
        onChangeText={(text) => formik.setFieldValue("nombreEmpleado", text)}
      ></TextInput>
      <Text
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        Firma del cliente
      </Text>

      <SignatureView
        style={{
          borderWidth: 2,
          height: 130,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        ref={signatureRef}
        // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
        onSave={(val) => {
          setText(val);
        }}
        onClear={() => {
          setText("");
        }}
      />

      <Text
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        Firma del supervisor
      </Text>

      <SignatureView
        style={{
          borderWidth: 2,
          height: 130,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        ref={signatureRefSuper}
        // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
        onSave={(val) => {
          setTextSuper(val);
        }}
        onClear={() => {
          setTextSuper("");
        }}
      />
      <Text>{"\n"}</Text>
      <Button onPress={formik.handleSubmit} title="Guardar reporte" />
    </View>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    padding: 10,
    width: "80%",
    height: 50,
    paddingStart: 30,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  boton: {
    marginTop: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  modalToggle: {
    alignItems: "flex-end",
    marginBottom: 10,
    marginLeft: 50,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});

function initialValues() {
  return {
    comentario: "",
    nombreEmpleado: "",
  };
}

function validationSchema() {
  return {
    comentario: Yup.string().required("El reporte es obligatorio"),
    nombreEmpleado: Yup.string().required("El nombre del empleado es obligatorio"),
  };
}