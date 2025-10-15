import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const SecondOnBoard = () => {
    const navigation = useNavigation();
  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Link href={'/onboard'}>
                  <Ionicons
                    name={'arrow-back-sharp'}
                    size={24}
                    color={'#407CE2'}
                    />
              </Link>
            
            {/* Butoni */}
            <Link href={'/start'} style={styles.skipText}>
              <Text>Skip</Text>
            </Link>
          </View>

          <Image
            source={require('../assets/images/femaledoctor.png')}
            style={{ width: 450, height: 450 }}
            contentFit="contain"
            transition={100}
            />
          
          <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 50, marginTop: 40}}>
            <Text style={styles.content}>
            Get advice only from a{"\n"} doctor you believe in
            </Text>
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
            source={require('../assets/images/secondFrame.png')}
            style={{ width: 30, height: 30, resizeMode: 'contain', marginLeft: 20 }}
            />
            {/* Butoni */}
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('start')}>
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
    backgroundColor: '#ffff'
  },
  skipText: {
      fontSize: 17,
      color: '#555',
      position: 'absolute',
      right: 30,
      top: 5,
      fontWeight: '600'
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
    },
        header: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingBottom: 60,
    }
});

export default SecondOnBoard;
