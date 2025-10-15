import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootLayout = () => {
    return (
      <SafeAreaView style={{ flex: 1}} edges={['top']}>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="homepage" options={{ title: 'Homepage', tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#a90000ff' : '#999'}
            />
            ),
          }} />
          <Tabs.Screen name="myprofile" options={{ title: 'My Profile', tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#a90000ff' : '#999'}
            />
            ),
          }} />
          <Tabs.Screen name="index" options={{ title: 'Index', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="onboard" options={{ title: 'Onboard', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="secondOnBoard" options={{ title: 'Second Onboard', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
          <Tabs.Screen name="start" options={{ title: 'Start', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
        </Tabs>
      </SafeAreaView>
  );
};

export default RootLayout;