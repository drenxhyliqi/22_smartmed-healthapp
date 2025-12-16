import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const topDoctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, "doctors");

    // REAL-TIME LISTENER
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoctors(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ marginTop: 10, color: '#fff', fontSize: 18 }}>Loading doctors...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#407CE2" />

      <View style={styles.content}>

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Link href={'/homepage'} style={styles.goBack}>
            <Ionicons name="arrow-back-sharp" size={24} color="#000" />
          </Link>

          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top Doctors</Text>
        </View>

        {/* Doctors List */}
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image
                source={{ uri: item.image || "https://via.placeholder.com/60" }}
                style={styles.listImage}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.listPosition} numberOfLines={1}>
                  {item.position}
                </Text>
              </View>
            </View>
          )}
          initialNumToRender={5}        // sa item ngarkohen fillimisht
          windowSize={10}               // sa item të tjera ngarkohen gjatë scroll
          removeClippedSubviews={true}  // çaktivizon imazhet jashtë viewport
        />

      </View>
    </SafeAreaView>
  );
};

export default topDoctors;

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
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 15,
    elevation: 2,
  },
  listImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  listPosition: {
    fontSize: 14,
    color: '#555'
  },
  goBack: {
    backgroundColor: 'rgba(0,0,0,0.14)',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
});
