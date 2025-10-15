<<<<<<< HEAD
import React from 'react';
import { View, Text, Image ,StyleSheet,TouchableOpacity } from 'react-native';
import Logo from '../assets/images/logo.png';
import Background from '../assets/images/background.png';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={Background} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Content */}
      <View style={styles.content}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Healthcare</Text>
        <Text style={styles.subtitle}>Medical app</Text>
        <Link href="/onboard" asChild>
          <Text style={{ color: "#111", fontSize: 16 }}>Shko te Onboard</Text>
      </Link>

       <Link href="/start" asChild>
          <Text style={{ color: "#111", fontSize: 16 }}>Shko te Start</Text>
      </Link>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  title: {
    fontSize: 30, 
    color: "#223A6A", 
    fontWeight: 'bold', 
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18, 
    color: "#223A6A"
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain'
  }
});

export default Index;
=======
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
    }, 4000);

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
>>>>>>> 19e98b4b042783cd921ff2b7534886bf12145b6e
