import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContent}>
        <Image
          source={require('../assets/images/profile_pic.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ruchita</Text>

        <View style={styles.statsContainer}>
          <StatCard
            icon={<FontAwesome name="heart" size={22} color="#4F8EF7" />}
            value="215 bpm"
            label="Heart Rate"
          />
          <StatCard
            icon={<Ionicons name="flame" size={22} color="#4F8EF7" />}
            value="756 cal"
            label="Calories"
          />
          <StatCard
            icon={<FontAwesome name="balance-scale" size={22} color="#4F8EF7" />}
            value="103 lbs"
            label="Weight"
          />
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <MenuItem icon="heart-outline" label="My Saved" target="signin" />
          <MenuItem icon="calendar-outline" label="Appointment" target="signin"/>
          <MenuItem icon="card-outline" label="Payment Method"target="signin" />
          <MenuItem icon="help-circle-outline" label="FAQs" target="signin"/>
          <MenuItem icon="log-out-outline" label="Logout" target="signin"/>
        </ScrollView>
      </View>
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
});
