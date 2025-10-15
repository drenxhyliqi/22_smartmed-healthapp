import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Image } from 'expo-image';

const Onboarding = () => {
    const navigation = useNavigation();
  return (
      <View style={styles.container}>
          <Link href={'/start'} style={styles.skipText}>
              <Text>Skip</Text>
          </Link>
          

         <Image
            source={require('../assets/images/femaledoctor.png')}
            style={{ width: 450, height: 450 }}
            contentFit="contain"
            transition={100}
            />
          
          <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 50, marginTop: 40}}>
            <Link href="/">
            <Text style={styles.content}>
            Find a lot of specialist {"\n"} doctors in one place
            </Text>
          </Link>
          </View>
          
          <View style={{
            width: '100%', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingHorizontal: 30, 
            marginTop: 85
          }}>
            <Image
            source={require('../assets/images/firstFrame.png')}
            style={{ width: 30, height: 30, resizeMode: 'contain', marginLeft: 20 }}
            />
            {/* Butoni */}
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('secondOnBoard')}>
            <Text style={{ fontSize: 24, color: '#f9f9f9' }}>⮕</Text>
          </TouchableOpacity>
          </View>
          
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
      fontSize: 16,
      color: '#555',
      position: 'absolute',
      top: 25,
      right: 30
    },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#407CE2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
      bottom: 0,
    right: 30
    },
    content: {
        fontSize: 28,
        fontWeight: '700',
    }
});

export default Onboarding;
