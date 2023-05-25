import { View, Text, Image } from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View>
      <Image source={require("../../assets/login.png")}
      style={{ width: 200, height: 200, alignSelf:'center', resizeMode: "center", marginTop: 250 }} />
    </View>
  )
}