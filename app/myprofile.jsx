import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const { email } = route.params; 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        } else {
          console.log('Nuk u gjet përdoruesi me këtë email');
        }
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Nuk ka të dhëna për përdoruesin</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <StatusBar barStyle="light-content" />
  
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        userData && (
          <>
            <View style={styles.headerContent}>
              <Image
                source={require('../assets/images/profile_pic.png')}
                style={styles.profileImage}
              />
              {/* Shfaq username */}
              <Text style={styles.name}>{userData.username}</Text>
  
              <View style={styles.statsContainer}>
                <StatCard
                  icon={<FontAwesome name="heart" size={22} color="#4F8EF7" />}
                  value={`${userData.heart_rate} bpm`}   // heart_rate nga DB
                  label="Heart Rate"
                />
                <StatCard
                  icon={<Ionicons name="flame" size={22} color="#4F8EF7" />}
                  value={`${userData.calories} cal`}      // calories nga DB
                  label="Calories"
                />
                <StatCard
                  icon={<FontAwesome name="balance-scale" size={22} color="#4F8EF7" />}
                  value={`${userData.weight} lbs`}       // weight nga DB
                  label="Weight"
                />
              </View>
            </View>
          </>
        )
      )}
    </SafeAreaView>
  );
}

const StatCard = ({ icon, value, label }) => (
  <View style={styles.statCard}>
    {icon}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, label, target }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(target)}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={22} color="#4F8EF7" />
      </View>
      <Text style={[styles.menuText, { fontWeight: 'bold' }]}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#407CE2',
  },
  headerContent: {
    alignItems: 'center',
    marginTop:50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
    contentFit: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: 100,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#223A6A',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
    marginTop: 30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#223A6A',
    flex: 1,
    marginLeft: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});
