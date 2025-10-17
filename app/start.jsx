import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';

export default function Start() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
            source={require('../assets/images/healthcare2.png')}
            style={styles.image}
            contentFit="contain"
            transition={100}
            />

      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.subtitle}>Login to Stay healthy and fit</Text>
      
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('signin')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
    
  },
  image: {
    width: 184,
    height: 151,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    borderWidth: 1,
    backgroundColor: '#407CE2', 
    borderColor: '#407CE2',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderColor: '#407CE2',
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  signupText: {
    color: '#407CE2',
    fontSize: 18,
    fontWeight:'bold',
  },
  
});
