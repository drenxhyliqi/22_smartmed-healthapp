import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const RootLayout = () => {
  return (
    <SafeAreaView>
      <Text>RootLayout</Text>
      <Stack />
    </SafeAreaView>
  )
}

export default RootLayout

const styles = StyleSheet.create({})