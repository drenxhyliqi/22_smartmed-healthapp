import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../context/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function MyProfile() {
  const { userData, logout } = useContext(UserContext);   // 🔵 ADD logout

  // Nëse userData nuk ekziston → user nuk është loguar
  if (!userData) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.noDataText}>Ju lutem logohuni për të parë profilin</Text>
      </View>
    );
  }

  // 🔵 Funksioni i Logout-it
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase Auth signOut
      logout();            // Pastro context
      Alert.alert("Dalje", "U çkyçët me sukses!");
    } catch (error) {
      Alert.alert("Gabim", "Nuk mund të çkyçeni tani!");
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <StatusBar barStyle="light-content" />
      <Header userData={userData} />

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.menuContainer}>

          {userData.role === "admin" && (
            <MenuItem 
              icon="settings-outline" 
              label="Management Panel" 
              onPress={() => router.push("/(management)/menuList")}
            />
          )}

          <MenuItem icon="heart-outline" label="My Saved" onPress={() => router.push("/homepage")} />
          <MenuItem icon="people-outline" label="Doctors" onPress={() => router.push("/(management)/manageDoctors")} />
          <MenuItem icon="calendar-outline" label="Appointment" onPress={() => router.push("/homepage")} />
          <MenuItem icon="card-outline" label="Payment Method" onPress={() => router.push("/homepage")} />
          <MenuItem icon="help-circle-outline" label="FAQs" onPress={() => router.push("/homepage")} />

          {/* 🔴 LOGOUT ITEM ME FUNKSION */}
          <MenuItem 
            icon="log-out-outline" 
            label="Logout" 
            onPress={handleLogout}       // 🔵 ADD
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Header = ({ userData }) => (
  <View style={styles.headerContent}>
    <Image source={require('../assets/images/userimg.jpg')} style={styles.profileImage} />
    <Text style={styles.name}>{userData.username}</Text>
    <View style={styles.statsContainer}>
      <StatCard icon={<FontAwesome name="heart" size={22} color="#4F8EF7" />} value={`${userData.heart_rate} bpm`} label="Heart Rate" />
      <StatCard icon={<Ionicons name="flame" size={22} color="#4F8EF7" />} value={`${userData.calories} cal`} label="Calories" />
      <StatCard icon={<FontAwesome name="balance-scale" size={22} color="#4F8EF7" />} value={`${userData.weight} lbs`} label="Weight" />
    </View>
  </View>
);

const StatCard = ({ icon, value, label }) => (
  <View style={styles.statCard}>
    {icon}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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
    marginBottom: 20,
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
