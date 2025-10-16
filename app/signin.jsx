import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const Signin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <View>
        <View>
          <Ionicons
              style={styles.icon}
              name={'mail'}
              size={24}
              color={'#ddd'}/>
          <TextInput placeholder="Email" style={styles.placeholders}></TextInput>
        </View>
        <View>
          <Ionicons
              style={styles.icon}
              name={'lock-closed-sharp'}
              size={24}
              color={'#ddd'}/>
          <TextInput placeholder="Password" style={styles.placeholders}></TextInput>
        </View>
        <Text style={styles.forgotPass}>
          Forgot Password?
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: '#f9f9f9', fontSize: 19, fontWeight: '600'}}> Sign In</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 10, fontSize: 17}}>
        Don't have an account? <Text style={{ color: '#407CE2', fontWeight: '700' }}> Sign Up</Text>
      </Text>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <View>
        <TouchableOpacity style={styles.signinButtons}>
          <Ionicons
              style={{ position: 'absolute', left: 15, top: 8 }}
              name={'logo-google'}
              size={24}
              color={'#DB4437'}/>
          <Text style={{fontWeight: '500', fontSize: '16'}}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signinButtons}>
          <Ionicons
              style={{ position: 'absolute', left: 15, top: 8 }}
              name={'logo-facebook'}
              size={24}
              color={'#407CE2'}/>
          <Text style={{fontWeight: '500', fontSize: '16'}}>
            Sign in with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 22,
    fontWeight: '700',
    marginTop: 30,
    paddingVertical: 30
    
  },
  button: {
    backgroundColor: '#407CE2',
    paddingTop: 15,
    paddingBottom: 15,
    width: '70%',
    borderRadius: 40,
    alignItems: 'center',
    marginTop: '10%'
  },
  placeholders: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 15,
    width: 300,
    borderRadius: 30,
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
    marginRight: 15,
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
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    alignItems: 'left',
  }
});

export default Signin;
