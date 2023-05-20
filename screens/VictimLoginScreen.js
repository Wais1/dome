import React, { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';


const VictimLoginScreen = ({ navigation }) => {
  useEffect(() => {
    // If auth detected to be logged in, go to home.
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace('HomeVictim');
      }
    });

    return unsubscribe;
  }, []);

  const signInAnonymously = () => {
    auth
    .signInAnonymously()
    .then((userCredential) => {
      const user = userCredential.user;
      createChatsWithOrganizations(user);
    })
    .catch((error) => alert(error));  
};

const createChatsWithOrganizations = async (user) => {
    const organizationsSnapshot = await db.collection('organizations').get();
  
    organizationsSnapshot.docs.forEach(async (doc) => {
      const organizationData = doc.data();
      const chatData = {
        participants: [user.uid, organizationData.id],
        chatName: organizationData.name,
        createdAt: new Date(),
      };
  
      // Add the new chat to the chats collection
      await db.collection('chats').add(chatData);
    });
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
