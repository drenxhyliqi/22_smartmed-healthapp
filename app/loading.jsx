import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, ImageBackground, Image, StyleSheet, Text, Animated } from "react-native";
import Background from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const router = useRouter(); 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/home"); 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ImageBackground source={Background} style={styles.background}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>Healthcare</Text>
          <Text style={styles.subtitle}>Medical App</Text>
        </Animated.View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#223A6A",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#223A6A",
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#223A6A",
    marginBottom: 10,
    textAlign: "center",
  },
  mainSubtitle: {
    fontSize: 18,
    color: "#223A6A",
    textAlign: "center",
  },
});
