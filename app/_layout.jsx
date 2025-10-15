import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme, StatusBar } from 'react-native';

const RootLayout = () => {
    return (
        <>
            <StatusBar value="auto"></StatusBar>
        <Stack screenOptions={{ //Shtohet ne te gjitha screenat
          headerStyle: { backgroundColor: '#407CE2' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
            }}>
                <Stack.Screen name="index" options={{ title: 'Home' }}></Stack.Screen>
                <Stack.Screen name="onboard" options={{ title: 'Onboard' }}></Stack.Screen>
                <Stack.Screen name="secondOnBoard" options={{title: 'Onboard'}}></Stack.Screen>
                </Stack>
        </>
  );
};

export default RootLayout;