import { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from "react-native-elements"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"

function GetStartedScreen({navigation}) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",

            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 40,
                    marginRight: 20,
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('VictimLogin')}>
                        {/* <Ionicons name="options" size={29} color="#3164CE" /> */}
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
  return (

    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
        <Image source={{ uri: 'https://i.ibb.co/S3tsK11/dome-logo.png' }} style={{ width: 150, height: 115, marginBottom: 20 }} />
        <Text style={styles.title}>Dome</Text>
        <Text style={styles.subtitle}>
          Dome is committed to providing you a safe experience
        </Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Button
          containerStyle={styles.button}
          buttonStyle={styles.registerButton}
          onPress={() => navigation.navigate('SetupPin')}
          type="solid"
          title="Get Started"
        />
      </View>
    </View>
  )
}
export default GetStartedScreen


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:30,
        paddingRight:30,
        paddingTop:6,
        backgroundColor:'white',
        height: '100%',
    },
    title: {
        marginTop: 10,
        fontSize: 35,
        textAlign: 'center',
        color: '#F36332',
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: 20,
        fontSize: 19,
    },
    textInput: {
        marginLeft:10,
        marginTop:9,
        color:'white',
        borderColor:'white',
        borderBottomColor:'gray',
        width:'100%',
    },
    button: {
        width: 300,
        marginTop: 10,
    },
    registerButton: {
        padding:15,
        color: '#FF83A8',
    },
    loginButton: {
        padding: 15,
        backgroundColor: '#FF83A8'
    },
})