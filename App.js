// Hooks de React
import {useEffect, useReducer, useMemo} from 'react';
import { Image } from "react-native";
// Utilidades de React Navigation
//@react-navigation/native - Librería incluida cuando se crea el proyecto
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from '@expo/vector-icons/MaterialIcons';


//const AuthContext = React.createContext();

import {AuthContext} from './components/AuthContext';



// Pantalla de Inicio o Bienvenida
import SplashScreen from './screen/main/SplashScreen';

// Pantallas de acceso a la App
import LoginScreen from './screen/access/LoginScreen';



// Pantallas para la navegación principal
import HomeScreen from './screen/main/HomeScreen';
import ModalCamera from './components/ModalCamera';


const usuario = ""
// Navegador Stack - Main
const StackMain = createStackNavigator();
function NavStack (){
  return(
    <StackMain.Navigator>
      <StackMain.Screen
        name='Splash'
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
    </StackMain.Navigator>
  );
}

// Navegador Stack - Home
const HomeAccess = createStackNavigator();
function HomeNav (){
  return(
    <HomeAccess.Navigator>
      <HomeAccess.Screen
        name='Inicio'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />  
      <HomeAccess.Screen
      name='Foto'
      component={ModalCamera}
      options={{
        headerShown: false,
      }}
      />
    </HomeAccess.Navigator>
  );
}

function renderLogo() {
  return (
    <Image
      source={require("./assets/logo.png")}
      style={{ width: 70, height: 70, top: -15 }}
    />
  );
}


// Navegador Stack - Access
const StackAccess = createStackNavigator();
function AccessNav (){
  return(
    <StackAccess.Navigator>
      <StackAccess.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />  
    </StackAccess.Navigator>
  );
}
 

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();
function BottomTab() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home" 
        component={HomeNav}
        options={{ 
          headerShown: false,
          headerTintColor: '#fff',
          tabBarLabel: "",
            tabBarIcon: () => renderLogo(),
            headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
}

 

//Componente principal
export default function App() {

  //appIsReady: Variable para indicar si la aplciación ya esta lista
  //setAppIsReady: Función para actualizar la variable appIsReady
  //const [appIsReady, setAppIsReady] = useState(false);


  //Estado inicial
  const initialState = {
      appIsReady: false,
      userToken: null,
  }

  //Función donde se realiza la actualización del estado/valor de las variables.
  //A través de la función "dispatch" automáticamente se recibiran los parámetros:
  //state: estado actual del las variables
  //action: 
  //      - "action.type": tipo de acción que se ejecutará
  //      - "action.otro_parametro": valor con el que se puede actualizar una variable
  //                                 ej: action.token, action.name, action.phoe, etc.
  const reducer = (state, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...state,
            userToken: action.userToken,
            appIsReady: action.appIsReady,
          };
        case 'SIGN_IN':
          return {
            ...state,
            userToken: action.userToken,
          };
        case 'SIGN_OUT':
          return {
            ...state,
            userToken: null,
          };
      }
  }


  //El hook "useReducer" proporciona un array como variable, 
  //1er. elemento es el "estado" de cada uno de los elementos de la variable "initialState".
  //2do. elemento es un "dispatch", una función que podemos usar dentro 
  //     de este "componente principal" para actualizar el estado de cada uno de los
  //     elelentos que se encuentran en la variable "initialState".
  //También, para trabajar con él debemos proporciionarle dos argumentos:
  //El 1er. argumento es la función a través de la cual "dispatch" actualzará los estados
  //El 2do. argumento, es el nuevo estado de la o las variables
  const [state, dispatch] = useReducer(reducer, initialState);



  //useEffect: Hoook que de forma predeterminada, se ejecuta después del primer renderizado 
  //y después de cada actualización
  useEffect(() => {

    async function inicia() {

      let userToken;
      
      try {
        // Retrazar el lanzamiento de aplicación por 5 segundos
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //Proceso para obtención de Información del usuario u
        //obtención de parámetros para iniciar la App
        
        userToken = null;

      } catch (e) {
        //Mostrar Error en caso de existir
        console.console(e);
      } finally {

        // After restoring token, we may need to validate it in production apps

        // Reacuerda que solo se pasan parámetros dentro del argumento "action"
        // El argumento "state", el Hook useReducer se hace cargo de él.
        dispatch({ type: 'RESTORE_TOKEN', userToken: userToken, appIsReady: true });

      }
    }

    inicia();

  },[]);


  /*
    useMemo, es un Hook que sirve para memoizar el valor que devuelve una función. 
    Acepta dos argumentos y retorna un valor. 
    - El 1er. argumento es la función que se ejecuta durante el renderizado y utilizaremos
    para actualizar los valores de nuestras varaibles, y 
    - Un 2do. argumento que es una variable a vigilar, de manera que 
    no se generará un nuevo valor mientras esa variable no cambie.
  */
  const authe = useMemo(
    () => ({

      //signIn: async (data) => {
      signIn: (userData) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
      
        // Solo se pasan parámetros del argumento "action"
        dispatch({ type: 'SIGN_IN', userToken: userData._id });
      },
      signOut: () => {

        // Solo se pasan parámetros del argumento "action"
        dispatch({ type: 'SIGN_OUT' })

      },
      
    }),
    []
  );



  return (

    //console.log('appIsReady: '+state.appIsReady),
    <AuthContext.Provider value={{authe, state}}>
      <NavigationContainer>
        {state.appIsReady?
          state.userToken == null ?
            <AccessNav/>
            :
            <BottomTab/>
          :
          <NavStack/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
    
  );

}
