import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Link, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; 



const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!name.trim()) {
      setErrorMessage("Name field is required.");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (!checked) {
      setErrorMessage("You must agree to Terms & Privacy.");
      return;
    }

    setErrorMessage(""); 
    try {
    // Krijohet user-in në Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = userCredential.user;

    // Ruajtja në Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name.trim(),
      email: email.trim(),
      password: password,
      createdAt: new Date(),
    });

    console.log("User created:", user.uid);

    navigation.navigate("signin");

  } catch (error) {
    setErrorMessage(error.message);
  }
  };
  return (
    <SafeAreaView style={styles.container} edges={[]}>
        <Link href={'/start'} style={styles.goBack}>
          <Ionicons name={'arrow-back-sharp'} size={24} color={'#407CE2'} />
        </Link>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={24} color="#ddd" style={{ marginRight: 5 }} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#ddd" style={{ marginRight: 5 }} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#ddd" style={{ marginRight: 5 }} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
            onPress={() => setChecked(!checked)}
          >
            <Ionicons
              name={checked ? 'checkbox' : 'square-outline'}
              size={24}
              color={checked ? '#407CE2' : '#aaa'}
            />
            <Text style={{ marginLeft: 8, flexShrink: 1 }}>
              I agree to the healthcare
              <Text style={{ color: '#407CE2', fontWeight: 'bold' }}> Terms of Service </Text>
              and
              <Text style={{ color: '#407CE2', fontWeight: 'bold' }}> Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
            {errorMessage ? (
              <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
            {errorMessage}
              </Text>
                ) : null}

        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}
>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{fontSize: 17}}>Already have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('signin')}>
            <Text style={{ color: '#407CE2', fontWeight: 'bold', fontSize: 17}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 60,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerRow: {
    alignItems: 'center',
    width: '25%',
    marginBottom: 20,
    marginTop: '15'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom:10  },
    formContainer: {
    width: '85%',
  },
  inputContainer: {
    borderWidth: 1,
    marginBottom: 20,
    borderColor: '#ccc',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    width: '85%',
    alignItems: 'center',
    marginBottom: 25,
  },
  signupButton: {
    backgroundColor: '#407CE2',
    paddingTop: 15,
    paddingBottom: 15,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
