import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../contexts/UserContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const router = useRouter();
  const { setUserId, setUserData } = useContext(UserContext);

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Gabim', 'Ju lutem plotësoni të gjitha fushat');
      return;
    }

    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email.trim()),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        setUserId(userDoc.id);
        setUserData(userData);

        console.log("Të dhënat e përdoruesit:", userData);

        router.replace('/homepage');
      } else {
        Alert.alert("Gabim", "Email ose password i gabuar!");
      }
    } catch (error) {
      Alert.alert("Gabim gjatë hyrjes", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <Link href={'/start'} style={styles.goBack}>
        <Ionicons name={'arrow-back-sharp'} size={24} color={'#407CE2'} />
      </Link>

      <Text style={styles.text}>Sign In</Text>

      <View>
        <View>
          <Ionicons style={styles.icon} name={'mail'} size={24} color={'#ddd'} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.placeholders}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Ionicons style={styles.icon} name={'lock-closed-sharp'} size={24} color={'#ddd'} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.placeholders}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.eyeButton}>
            <Ionicons name={secure ? 'eye-off' : 'eye'} size={22} color="#777" />
          </TouchableOpacity>
        </View>

        <Text style={styles.forgotPass}>Forgot Password?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={{ color: '#f9f9f9', fontSize: 19, fontWeight: '600' }}>Sign In</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
        <Text style={{ fontSize: 17 }}>Don't have an account?</Text>
        <Text
          onPress={() => router.push('/signup')}
          style={{ color: '#407CE2', fontWeight: '700', fontSize: 17, marginLeft: 8 }}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 28, fontWeight: '700', marginTop: 30, paddingVertical: 30 },
  button: { backgroundColor: '#407CE2', paddingTop: 15, paddingBottom: 15, width: '70%', borderRadius: 10, alignItems: 'center', marginTop: '10%' },
  placeholders: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#f9f9f9', padding: 15, width: 300, borderRadius: 10, marginTop: 30, fontSize: 16, paddingLeft: 50 },
  icon: { position: 'absolute', top: 42, left: 15, zIndex: 10 },
  forgotPass: { textAlign: 'right', marginTop: 15, marginRight: 4, color: '#407CE2', fontWeight: '600' },
  eyeButton: { position: 'absolute', right: 15, top: 40, zIndex: 10, padding: 4 },
  goBack: { position: 'absolute', top: 25, left: 35, backgroundColor: 'rgba(10, 25, 25, 0.06)', padding: 8, borderRadius: 10 },
});

export default Signin;
