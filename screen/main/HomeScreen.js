import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../components/AuthContext'


export default function HomeScreen() {

    const {authe, state} = useContext(AuthContext);

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={ authe.signOut }>
        <Text>Salir</Text>
      </TouchableOpacity>
    </View>
  )
}