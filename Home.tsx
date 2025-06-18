import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function Home({ navigation }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      navigation.navigate('City', { city });
    } else {
      Alert.alert('Please Enter city');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search City Here ...</Text>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#888"
          style={styles.input}
          value={city}
          onChangeText={text => setCity(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginTop: 100,
  },
  searchRow: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
    width: 200,
  },
  button: {
    height: 40,
    marginLeft: 10,
    paddingHorizontal: 16,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Home;
