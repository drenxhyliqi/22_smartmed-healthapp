import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../context/userContext';

export default function MyProfile() {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext); 

  if (!userData) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.noDataText}>Ju lutem logohuni për të parë profilin</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <StatusBar barStyle="light-content" />
      <Header userData={userData} />

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <MenuItem icon="heart-outline" label="My Saved" target="signin" />
          <MenuItem icon="people-outline" label="Doctors" target="/(management)/manageDoctors" />
          <MenuItem icon="calendar-outline" label="Appointment" target="signin" />
          <MenuItem icon="card-outline" label="Payment Method" target="signin" />
          <MenuItem icon="help-circle-outline" label="FAQs" target="signin" />
          <MenuItem icon="log-out-outline" label="Logout" target="signin" />
          <MenuItem icon="calendar-outline" label="Appointment" target="signin"/>
          <MenuItem icon="card-outline" label="Payment Method"target="signin" />
          <MenuItem icon="help-circle-outline" label="FAQs" target="signin"/>
          <MenuItem icon="log-out-outline" label="Logout" target="signin"/>
          
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <TouchableOpacity 
              style={styles.managementCard} 
              onPress={() => router.push("/(management)/manageDoctors")}
            >
              <Ionicons name="people-outline" size={28} color="#fff" style={styles.cardIcon} />
              <View style={styles.cardTextWrapper}>
                <Text style={styles.managementTitle}>Management</Text>
                <Text style={styles.managementSubtitle}>Manage Doctors</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <TouchableOpacity 
              style={styles.managementCard} 
              onPress={() => router.push("/(management)/manageDrugs")}
            >
              <Ionicons name="medkit-outline" size={28} color="#fff" style={styles.cardIcon} />
              <View style={styles.cardTextWrapper}>
                <Text style={styles.managementTitle}>Management</Text>
                <Text style={styles.managementSubtitle}>Manage Drugs</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{ marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity 
              style={styles.managementCard} 
              onPress={() => router.push("/(management)/manageHospitals")}
            >
              <Ionicons name="people-outline" size={28} color="#fff" style={styles.cardIcon} />
              <View style={styles.cardTextWrapper}>
                <Text style={styles.managementTitle}>Management</Text>
                <Text style={styles.managementSubtitle}>Manage Hospitals</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Header = ({ userData }) => (
  <View style={styles.headerContent}>
    <Image source={require('../assets/images/person-icon.jpg')} style={styles.profileImage} />
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

const MenuItem = ({ icon, label, target }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(target)}>
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
  headerGradient: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingVertical: 40,
    alignItems: 'center',
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
  managementCard: {
    width: '90%',
    backgroundColor: '#407CE2',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextWrapper: {
    flex: 1,
  },
  managementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  managementSubtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'left',
    marginTop: 3,
  },

});
