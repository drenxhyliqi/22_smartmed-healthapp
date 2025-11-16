import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserProvider } from '../context/userContext'; // KJO ESHTE E RREGULLT

const RootLayout = () => {
  return (
    <UserProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#407CE2' }} edges={['top']}>
        <StatusBar barStyle="light-content" />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 70 },
          }}
        >
          <Tabs.Screen
            name="homepage"
            options={{
              title: 'Homepage',
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={30}
                  color={focused ? '#407CE2' : '#999'}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="myprofile"
            options={{
              title: 'My Profile',
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'people-circle' : 'people-circle-outline'}
                  size={30}
                  color={focused ? '#407CE2' : '#999'}
                />
              ),
            }}
          />
          
          <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="onboard" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="secondOnBoard" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="start" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="signin" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="signup" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="topdoctors" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="pharmacy" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="ambulance" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/manageDoctors" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/manageDrugs" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/manageHospitals" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/menuList" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
        </Tabs>
      </SafeAreaView>
    </UserProvider>
  );
};
export default RootLayout;
