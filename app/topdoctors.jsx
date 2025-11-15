import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const doctorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoctors(doctorsList);
    } catch (err) {
      console.log("Error loading doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#407CE2" />
      <View style={styles.content}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Link href={'/homepage'} style={styles.goBack}>
              <Ionicons
                name={'arrow-back-sharp'}
                size={24}
                color={'#000000ff'} />
            </Link>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top doctors</Text>
          </View>
        </View>

        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image source={{ uri: item.image }} style={styles.listImage} />

              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle} numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={styles.listPosition} numberOfLines={1} ellipsizeMode="tail">
                  {item.position || ''}
                </Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />

      </View>
    </SafeAreaView>
  )
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#407CE2',
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: 'cover'
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  listPosition: {
    fontSize: 14,
    color: '#555'
  },
  goBack: {
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    marginEnd: 10,
    padding: 8,
    borderRadius: 8,
  }
});
