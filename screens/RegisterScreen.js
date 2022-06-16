import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from "react-native-elements"
import React, { useLayoutEffect, useState } from 'react'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        }).catch(error => alert(error.message))
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
    <StatusBar style="light" />
      <Text h3 style={{color:'#FF83A8', marginBottom: 30 }}>
        Create a Dome account
        </Text>

        <View style={styles.inputContainer}>
            <Input leftIcon={{ type: 'font-awesome', name: 'user', color:'#FF83A8', marginRight: 8}} placeholder='Full Name' autofocus type='text' value={name} onChangeText={(text) => setName(text)}/>
            <Input leftIcon={{ type: 'font-awesome', name: 'envelope', color:'#FF83A8', marginRight: 8}}  placeholder='Email'  type='email' value={email} onChangeText={(text) => setEmail(text)}/>
            <Input leftIcon={{ type: 'font-awesome', name: 'key', color:'#FF83A8', marginRight: 8}}  placeholder='Password'  type='password' secureTextEntry value={password} onChangeText={(text) => setPassword(text)}/>
            <Input placeholder='Profile Pic URL (optional)'  type='text' value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
        </View>

        <Button 
            buttonStyle={styles.registerButton}
            containerStyle={styles.button}
            raised
            onPress={register}
            title='Register'
         />
         <View style={{ height:100 }} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 300,
        marginTop: 10,
    },
    registerButton: {
        padding: 15,
        backgroundColor: '#FF83A8'
    },
    inputContainer: {
        width: 300,
    },
    
})