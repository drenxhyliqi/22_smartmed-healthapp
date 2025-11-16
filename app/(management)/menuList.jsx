import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { UserContext } from "../../context/userContext";

export default function MenuList() {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text style={styles.noAccess}>Ju lutem logohuni</Text>
      </View>
    );
  }

  if (userData.role !== "admin") {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.noAccess}>Nuk keni qasje në këtë faqe</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/myprofile")} style={styles.goBack}>
          <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Management Panel</Text>
      </View>
      <ScrollView contentContainerStyle={styles.wrapper}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("(management)/manageDoctors")}
        >
          <Ionicons name="people-outline" size={28} color="#fff" />
          <Text style={styles.cardText}>Manage Doctors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("(management)/manageDrugs")}
        >
          <Ionicons name="medkit-outline" size={28} color="#fff" />
          <Text style={styles.cardText}>Manage Drugs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("(management)/manageHospitals")}
        >
          <Ionicons name="business-outline" size={28} color="#fff" />
          <Text style={styles.cardText}>Manage Hospitals</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noAccess: {
    fontSize: 18,
    fontWeight: "600",
    color: "red",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: 100,
    backgroundColor: "#407CE2",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 15,
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  marginTop: -30,
  marginBottom: 20,
  },
  goBack: {
    padding: 10,
    backgroundColor: "#407CE2",
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e1e1e",
    marginLeft: 35,
  },

});
