import { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ConfirmPinScreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerStyle: { backgroundColor: 'black' },
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',

      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 40,
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('VictimLogin')}>
            {/* <Ionicons name="options" size={29} color="#3164CE" /> */}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const [confirmedPin, setConfirmedPin] = useState('');
  const [error, setError] = useState('');

  const handleNumberPress = (number) => {
    if (confirmedPin.length < 4) {
      setConfirmedPin(confirmedPin + number);
    }
  };

  const handleDeletePress = () => {
    if (confirmedPin.length > 0) {
      setConfirmedPin(confirmedPin.slice(0, -1));
    }
  };

  const handleVerifyPin = async () => {
    const enteredPin = route.params.pin;
    if (confirmedPin === enteredPin) {
      // PIN is verified successfully
      console.log('PIN Verified');
      // Store the PIN in AsyncStorage
      try {
        await AsyncStorage.setItem('pin', enteredPin);
        console.log('PIN stored successfully');
      } catch (error) {
        console.log('Error storing PIN:', error);
      }
      // TODO: Navigate to the next screen or perform any other action
    //   navigation.navigate('Calculator');
        navigation.reset({
        index: 0,
        routes: [{ name: 'Calculator' }],
      });
    } else {
      // PIN verification failed
      console.log('PIN Verification Failed');
      setError('The pin does not match your entered one. Please try again.')
      // TODO: Show error message or perform any other action
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Confirm PIN</Text>
        <Text style={styles.subtitle}>Please confirm your PIN by re-entering it</Text>
        { error && (<Text style={styles.errorText}>{error}</Text>) }
        <View style={styles.pinContainer}>
          <View style={styles.pinInputContainer}>
            {confirmedPin.length >= 1 ? <Text style={styles.pinBullet} /> : null}
          </View>
          <View style={styles.pinInputContainer}>
            {confirmedPin.length >= 2 ? <Text style={styles.pinBullet} /> : null}
          </View>
          <View style={styles.pinInputContainer}>
            {confirmedPin.length >= 3 ? <Text style={styles.pinBullet} /> : null}
          </View>
          <View style={styles.pinInputContainer}>
            {confirmedPin.length >= 4 ? <Text style={styles.pinBullet} /> : null}
          </View>
        </View>
      </View>
      <View style={styles.numberPadContainer}>
        <View style={styles.numberRow}>
          <NumberButton number={1} onPress={handleNumberPress} />
          <NumberButton number={2} onPress={handleNumberPress} />
          <NumberButton number={3} onPress={handleNumberPress} />
        </View>
        <View style={styles.numberRow}>
          <NumberButton number={4} onPress={handleNumberPress} />
          <NumberButton number={5} onPress={handleNumberPress} />
          <NumberButton number={6} onPress={handleNumberPress} />
        </View>
        <View style={styles.numberRow}>
          <NumberButton number={7} onPress={handleNumberPress} />
          <NumberButton number={8} onPress={handleNumberPress} />
          <NumberButton number={9} onPress={handleNumberPress} />
        </View>
        <View style={styles.numberRow}>
          <View style={styles.emptyButton} />
          <NumberButton number={0} onPress={handleNumberPress} />
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
            <Ionicons name="ios-backspace" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Button
          containerStyle={styles.button}
          buttonStyle={styles.registerButton}
          onPress={handleVerifyPin}
          type="solid"
          title="Verify"
        />
      </View>
    </View>
  );
}

const NumberButton = ({ number, onPress }) => (
  <TouchableOpacity style={styles.numberButton} onPress={() => onPress(number)}>
    <Text style={styles.numberButtonText}>{number}</Text>
  </TouchableOpacity>
);

export default ConfirmPinScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 6,
      backgroundColor: 'white',
      height: '100%',
    },
    title: {
      marginTop: 10,
      fontSize: 28,
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
    pinContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    pinInputContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 100,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    pinBullet: {
      width: 15,
      height: 15,
      borderRadius: 20,
      backgroundColor: 'black',
    },
    numberPadContainer: {
      marginTop: 30,
    },
    numberRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    numberButton: {
      width: 80,
      height: 80,
      margin: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 40,
    },
    errorText: {
      color: 'red',
      textAlign: 'center'
    },
    numberButtonText: {
      fontSize: 24,
    },
    emptyButton: {
      width: 80,
      height: 80,
    },
    deleteButton: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 300,
      marginTop: 20,
    },
    registerButton: {
      borderRadius: 30,
      padding:15,
      marginBottom: 20,
      color: '#FF83A8',
    },
});
