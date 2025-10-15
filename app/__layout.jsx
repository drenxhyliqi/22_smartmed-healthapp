import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const RootLayout = () => {
  return (
    <SafeAreaView style={styles.RootLayout}>
      <Stack />
    </SafeAreaView>
  )
}

export default RootLayout

const styles = StyleSheet.create({
    RootLayout: {
        width: '100%',
        height: '100%'
    }
})