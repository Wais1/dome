import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { Avatar } from "react-native-elements"
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])
  console.log(auth.currentUser.uid)

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

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
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Dome for Organizations (${auth.currentUser.email})` ,
      headerStyle: { backgroundColor: '#FF83A8' },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          {Platform.OS !== 'ios' && Platform.OS !== 'android' ? (
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 80,
          marginRight: 20,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
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
          <CustomListItem key={id} id={id} chatName={"Anon Support Chat"} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})
