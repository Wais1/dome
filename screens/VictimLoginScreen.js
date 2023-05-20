import React, { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const VictimLoginScreen = ({ navigation }) => {
  useEffect(() => {
    // If auth detected to be logged in, go to home.
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const signInAnonymously = () => {
    auth.signInAnonymously().catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{ uri: 'https://i.ibb.co/S3tsK11/dome-logo.png' }}
        style={{ width: 100, height: 75, marginBottom: 20 }}
      />
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={styles.loginButton}
          onPress={signInAnonymously}
          title="Login Anonymously"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default VictimLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: 300,
  },
  button: {
    marginTop: 10,
  },
  loginButton: {
    padding: 15,
    backgroundColor: '#FF83A8',
  },
});
