import { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image } from 'react-native-elements';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

function SetupPinScreen({ navigation }) {
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

  const [pin, setPin] = useState('');

  const handleNumberPress = (number) => {
    if (pin.length < 4) {
      setPin(pin + number);
    }
  };

  const handleDeletePress = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.pinContainer}>
        <View style={styles.pinInputContainer}>
          {pin.length >= 1 ? <Text style={styles.pinBullet} /> : null}
        </View>
        <View style={styles.pinInputContainer}>
          {pin.length >= 2 ? <Text style={styles.pinBullet} /> : null}
        </View>
        <View style={styles.pinInputContainer}>
          {pin.length >= 3 ? <Text style={styles.pinBullet} /> : null}
        </View>
        <View style={styles.pinInputContainer}>
          {pin.length >= 4 ? <Text style={styles.pinBullet} /> : null}
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
      <Button
        containerStyle={styles.button}
        buttonStyle={styles.registerButton}
        onPress={() => {
          if (pin.length === 4) {
            // Handle confirming the PIN
            console.log('PIN Confirmed');
            navigation.navigate('ConfirmPin', { pin });
          }
        }}
        type="solid"
        title="Confirm"
      />
    </View>
  );
}

const NumberButton = ({ number, onPress }) => (
  <TouchableOpacity style={styles.numberButton} onPress={() => onPress(number)}>
    <Text style={styles.numberButtonText}>{number}</Text>
  </TouchableOpacity>
);

export default SetupPinScreen;

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
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pinInputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pinBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 40,
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
    padding: 15,
    color: '#FF83A8',
  },
});
