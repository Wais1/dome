import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { Avatar } from "react-native-elements"
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreenVictim = ({ navigation }) => {
  const [chats, setChats] = useState([])

  const goToCalculator = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Calculator' }],
      });
  };


  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  const refreshChats = async () => {
    const organizationsSnapshot = await db.collection('organizations').get();
    const chatsSnapshot = await db.collection('chats').get();
  
    organizationsSnapshot.docs.forEach(async (organizationDoc) => {
      const organizationData = organizationDoc.data();
  
      const chatExists = chatsSnapshot.docs.some(chatDoc => {
        const chatData = chatDoc.data();
        // Add a check to make sure participants and id are not undefined
        return chatData && chatData.participants && organizationData && organizationData.id &&
          Array.isArray(chatData.participants) && chatData.participants.includes(organizationData.id) && 
          chatData.participants.includes(auth.currentUser.uid);
      });
  
      if (!chatExists) {
        const chatData = {
          participants: [auth.currentUser.uid, organizationData.id],
          chatName: organizationData.name,
          createdAt: new Date(),
        };
  
        // Add the new chat to the chats collection
        await db.collection('chats').add(chatData);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .where('participants', 'array-contains', auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dome",
      headerStyle: { backgroundColor: '#FF83A8' },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          {/* {Platform.OS !== 'ios' && Platform.OS !== 'android' ? (
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
          ) : null} */}
            <TouchableOpacity onPress={refreshChats} activeOpacity={0.5}>
              <Text style={{ color: 'white', fontWeight:'600' }}>Refresh</Text>
            </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 80,
          marginRight: 20,
        }}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      )
    })

  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id: id,
      chatName: chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>

        <TouchableOpacity 
          style={styles.safeExitButton} 
          onPress={goToCalculator}
          activeOpacity={0.5}
        >
          <Text style={{ color: 'white', fontSize: 20}}>Safe Exit</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreenVictim

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  safeExitButton: {
    backgroundColor: '#FF83A8',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
