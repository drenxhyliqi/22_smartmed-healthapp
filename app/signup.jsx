import { StyleSheet, Text, View,  } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput } from 'react-native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <View style={styles.container}>
          
      <Text style={{textAlign:'center', fontSize:24}} >Sign Up</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#666" style={{marginRight:5}} />
          <TextInput style={styles.textInput} 
          placeholder='Enter your name' 
          placeholderTextColor='#666'
          value={name}
          onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={{marginRight:5}} />
          <TextInput style={styles.textInput} 
          placeholder='Enter your email' 
          placeholderTextColor='#666'
          value={email}
          onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={{marginRight:5}} />
          <TextInput style={styles.textInput} 
          placeholder='Enter your password' 
          placeholderTextColor='#666'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        
        </View>
        <View>
          <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        </View>

        
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',  
   
  },
  formContainer:{
    margin:20,
    width:'80%',
  },
  inputContainer:{
    borderWidth:1,
    marginBottom:15,
    borderColor:'#ccc',
    borderRadius:1,
    paddingHorizontal:15,
    paddingVertical:10,
    flexDirection:'row',
    alignItems:'center',
    padding:2,
    backgroundColor:'#f9f9f9',
  },
  textInput:{
    flex:1,
    paddingHorizontal:10,
  },
  signupButton: {
    borderWidth: 1,
    borderColor:'#407CE2',
    paddingVertical: 12,
    backgroundColor: '#407CE2',
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#ffffffff',
    fontSize: 18,
    fontWeight:'bold',
  },
  
})