import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserProvider } from '../context/userContext'; // KJO ESHTE E RREGULLT
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const RootLayout = () => {

   useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
          <Tabs.Screen name="hospitals" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/manageDoctors" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/manageDrugs" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/manageHospitals" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="(management)/menuList" options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
        </Tabs>
      </SafeAreaView>
    </UserProvider>
  );
};

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push notification permissions!');
    return;
  }

  // ANDROID 
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#407CE2',
    });
  }
}
export default RootLayout;
