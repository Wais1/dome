import { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from "react-native-elements"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"

function TutorialScreen({navigation}) {
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
        <Image source={{ uri: 'https://i.ibb.co/h24rt0k/Whats-App-Image-2023-05-22-at-13-07-36.jpg' }} style={{ width: 330, height: 415, marginBottom: 20 }} />

        <Text style={styles.title}>Create secret pin</Text>
        <Text style={styles.subtitle}>
        First, enter your private and secret pin that you'll use to access the chat screen ahead, and confirm it.
        </Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Button
          containerStyle={styles.button}
          buttonStyle={styles.registerButton}
          onPress={() => navigation.navigate('Tutorial2')}
          type="solid"
          title="Continue 1/3"

        />
      </View>
    </View>
  )
}
export default TutorialScreen


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
        fontSize: 25,
        textAlign: 'center',
        color: '#FF83A8',
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 19,
        textAlign: 'center',
        color: "gray",
        lineHeight: 28,
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
        borderRadius: 30,
        padding:15,
        marginBottom: 20,
        color: '#FF83A8',
    },
    loginButton: {
        padding: 15,
        backgroundColor: '#FF83A8'
    },
})