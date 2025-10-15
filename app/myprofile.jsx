import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}>
      {/* Avatar */}
      <Image
        source={require('../assets/images/profile_pic.png')} 
        style={styles.profileImage}
        resizeMode="cover"
      />
      <Text style={styles.name}>Ruchita</Text>

      <View style={styles.statsContainer}>
        <StatCard icon={<FontAwesome name="heart" size={24} color="#4F8EF7" />} value="215 bpm" label="Heart Rate" />
        <StatCard icon={<Ionicons name="flame" size={24} color="#4F8EF7" />} value="756 cal" label="Calories" />
        <StatCard icon={<FontAwesome name="balance-scale" size={24} color="#4F8EF7" />} value="103 lbs" label="Weight" />
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon="heart-outline" label="My Saved" />
        <MenuItem icon="calendar-outline" label="Appointment" />
        <MenuItem icon="card-outline" label="Payment Method" />
        <MenuItem icon="help-circle-outline" label="FAQs" />
        <MenuItem icon="log-out-outline" label="Logout" />
      </View>
    </ScrollView>
  );
}

// StatCard komponenti
const StatCard = ({ icon, value, label }) => (
  <View style={styles.statCard}>
    {icon}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// MenuItem komponenti me ikonë rrethore dhe mbishkrim stili
const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={22} color="#4F8EF7"/>
    </View>
    <Text style={[styles.menuText, { fontWeight: 'bold' }]}>
      {label}
    </Text>
    <Ionicons name="chevron-forward-outline" size={20} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#223A6A',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
  menuContainer: {
    width: '100%',
    paddingHorizontal:10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  }
});
