import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useNavigation, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


const Signin = () => {
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <Link href={'/start'} style={styles.goBack}>
                  <Ionicons
                    name={'arrow-back-sharp'}
                    size={24}
                    color={'#407CE2'}
                    />
      </Link>
      <Text style={styles.text}>Sign In</Text>
      <View>
        <View>
          <Ionicons
              style={styles.icon}
              name={'mail'}
              size={24}
              color={'#ddd'}/>
          <TextInput placeholder="Email" style={styles.placeholders} placeholderTextColor="#999"></TextInput>
        </View>
        <View>
          <Ionicons
            style={styles.icon}
            name={'lock-closed-sharp'}
            size={24}
            color={'#ddd'}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={styles.placeholders}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={secure ? 'eye-off' : 'eye'}
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotPass}>
          Forgot Password?
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('homepage')}>
        <Text style={{ color: '#f9f9f9', fontSize: 19, fontWeight: '600'}}> Sign In</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
        <Text style={{ fontSize: 17 }}>Don't have an account?</Text>
        <Text
          onPress={() => navigation.navigate('signup')}
          style={{ color: '#407CE2', fontWeight: '700', fontSize: 17, marginLeft: 8 }}>
          Sign Up
        </Text>
      </View>

      
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <View>
        <TouchableOpacity style={styles.signinButtons}>
          <Ionicons
              style={{ position: 'absolute', left: 25, top: 8 }}
              name={'logo-google'}
              size={24}
              color={'#DB4437'}/>
          <Text style={{fontWeight: '500', fontSize: '16'}}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signinButtons}>
          <Ionicons
              style={{ position: 'absolute', left: 25, top: 8 }}
              name={'logo-facebook'}
              size={24}
              color={'#407CE2'}/>
          <Text style={{fontWeight: '500', fontSize: '16'}}>
            Sign in with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 30,
    paddingVertical: 30,
    
  },
  button: {
    backgroundColor: '#407CE2',
    paddingTop: 15,
    paddingBottom: 15,
    width: '70%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '10%'
  },
  placeholders: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 15,
    width: 300,
    borderRadius: 10,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 50
  },
  icon: {
    position: 'absolute',
    top: 42,
    left: 15,
    zIndex: 10,
  },
  forgotPass: {
    textAlign: 'right',
    marginTop: 15,
    marginRight: 4,
    color: '#407CE2',
    fontWeight: '600'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '70%',
    marginTop: '10%'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    color: '#999',
    fontWeight: '600',
    marginHorizontal: 30,
  },
  signinButtons: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 40,
    zIndex: 10,
    padding: 4,
  },
  goBack: {
    position: 'absolute',
    top: 25,
    left: 35,
    backgroundColor: 'rgba(10, 25, 25, 0.06)',
    padding: 8,
    borderRadius: 10,
  }
});

export default Signin;
