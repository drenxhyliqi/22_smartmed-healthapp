import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootLayout = () => {
    return (
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen name="homepage" options={{ title: 'Homepage'}} />
        <Tabs.Screen name="index" options={{ title: 'Index', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
        <Tabs.Screen name="onboard" options={{ title: 'Onboard', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
        <Tabs.Screen name="secondOnBoard" options={{ title: 'Second Onboard', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
        <Tabs.Screen name="start" options={{ title: 'Start', tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
      </Tabs>
  );
};

export default RootLayout;