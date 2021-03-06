import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements"
import { color } from 'react-native-elements/dist/helpers'
import { auth } from '../firebase'
// import logo from '../assets/dome-logo.png';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const domeLogo = Image.resolveAssetSource(logo).uri : '';

    useEffect(() => {
        // If auth detected to be logged in, go to home.
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if(authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe;
    },[])

    // Handles sign in
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />
        <Image source = {{uri: 'https://i.ibb.co/S3tsK11/dome-logo.png'}}
            style={{ width: 100, height: 75, marginBottom: 20 }}
            />
        <View style={styles.inputContainer}>
            <Input   leftIcon={{ type: 'font-awesome', name: 'envelope', color:'#FF83A8', marginRight: 8}} 
            placeholderTextColor={'lightgray'}
            inputContainerStyle={styles.input} 
            inputStyle={styles.input}
            placeholder='Email' 
            autoFocus type="email"
            value={email}
            onChangeText={(text) => setEmail(text)} />
            <Input 
            placeholderTextColor={'lightgray'}
            inputContainerStyle={styles.input} 
            inputStyle={styles.input} leftIcon={{ type: 'font-awesome', name: 'key', color:'#FF83A8', marginRight: 8}} 
            placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} 
            onSubmitEditing={signIn}/>
        </View>

        <Button containerStyle={styles.button} buttonStyle={styles.loginButton} onPress={signIn} title='Login' />
        <Button containerStyle={styles.button} buttonStyle={styles.registerButton} onPress={() => navigation.navigate('Register')} type="clear" titleStyle={{color:'#FF83A8'}} title='or Register' />
        <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 300,
        marginTop: 10,
    },
    loginButton: {
        padding: 15,
        backgroundColor: '#FF83A8'
    },
    registerButton: {
        padding:15,
        color: '#FF83A8',
    },
    input: {
        color: '#757575',
        borderColor: '#FF83A8',
    },
})