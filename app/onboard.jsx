import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const onboarding = () => {
  return (
    <View style={styles.container}>
          <Text style={styles.text}>Hello, World!</Text>
          <TouchableOpacity style={styles.nextButton}>
          <Text style={{ fontSize: 24, color: '#f9f9f9' }}>⮕</Text>
          </TouchableOpacity>
          <Link href="/">
            <Text style={{ color: "#111", fontSize: 16, marginTop:20 }}>Shko te Home</Text>
          </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#407CE2',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 40
  }
});

export default onboarding;
