import React from 'react';
import { View, Text, Image ,StyleSheet,TouchableOpacity } from 'react-native';
import Logo from '../assets/images/logo.png';
import Background from '../assets/images/background.png';

const Index = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={Background} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Content */}
      <View style={styles.content}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Healthcare</Text>
        <Text style={styles.subtitle}>Medical app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  title: {
    fontSize: 30, 
    color: "#223A6A", 
    fontWeight: 'bold', 
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18, 
    color: "#223A6A"
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain'
  }
});

export default Index;
