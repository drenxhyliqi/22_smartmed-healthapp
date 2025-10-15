import React, { useEffect, useState, useRef } from "react";
import { View, Image, StyleSheet, Text, Animated, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/images/logo.png";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // animacion fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // pas 4 sekondash navigon në faqen onboard
    const timer = setTimeout(() => {
      setLoading(false);
      router.replace("/onboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Image source={Logo} style={styles.logo} />
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
    backgroundColor: "#ffffff",
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
    resizeMode: "contain",
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
