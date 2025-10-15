import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Animated, Dimensions, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { Image } from 'expo-image';
import Background from "../assets/images/background.png";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setLoading(false);
      router.replace("/onboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
  return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/background.png')}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={100}
        />
        
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            contentFit="contain"
            transition={100}
          />
          <Text style={styles.title}>Healthcare</Text>
          <Text style={styles.subtitle}>Medical App</Text>
        </Animated.View>
      </View>
    );
  }

  return null; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.4
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#223A6A",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#223A6A",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});