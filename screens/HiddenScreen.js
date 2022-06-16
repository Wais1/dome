import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"


const HiddenScreen = ({navigation}) => {
    const [reminders, setReminders] = useState([0])
    
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
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Ionicons name="options" size={29} color="#3164CE" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])


    const addReminder = () => {

    }
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>
      {/* List */}
      {/* <TouchableOpacity style={styles.hiddenButton}>
          <Text style={{color:'white', marginTop:10, borderBottomWidth: 2, borderBottomColor:'white'}}>Resolve</Text>
          <TextInput style={styles.textInput}>Go to the gym</TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.hiddenButton}>
          <Text style={{color:'white', marginTop:10, borderBottomWidth: 2, borderBottomColor:'white'}}>Resolve</Text>
          <TextInput style={styles.textInput}>Pick up groceries</TextInput>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.addReminder}>
            <FontAwesome style={{ marginRight: 10}} name="plus" size={20} color='#F36332' />
          <Text style={{color:'#F36332', fontWeight:'bold', marginTop:3, borderBottomWidth: 2, borderBottomColor:'white'}}>New Reminder</Text>
      </TouchableOpacity>
      
    </View>
  )
}
export default HiddenScreen
const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingTop:6,
        backgroundColor:'black',
        height: '100%',
    },
    title: {
        fontSize: 29,
        color: '#F36332',
        fontWeight: 'bold',
    },
    addReminder: {
        flex:1,
        flexDirection:'row',
        position: 'absolute',
        bottom: 100,
        left: 30,
    },
    hiddenButton: {
        flexDirection:'row',
    },
    textInput: {
        marginLeft:10,
        marginTop:9,
        color:'white',
        borderColor:'white',
        borderBottomColor:'gray',
        width:'100%',
    }
})