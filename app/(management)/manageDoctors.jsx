import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AddDoctorScreen = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");

  const addDoctor = async () => {
    if (!name || !position || !image) {
      Alert.alert("Missing fields", "Please fill all fields");
      return;
    }

    try {
      // ✅ Correct: just pass collection reference
      const doctorsRef = collection(db, "doctors");

      await addDoc(doctorsRef, {
        name,
        position,
        image,   // must be an image URL
      });

      Alert.alert("Success", "Doctor added successfully!");

      // clear form
      setName("");
      setPosition("");
      setImage("");

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Add New Doctor</Text>

      <TextInput
        style={styles.input}
        placeholder="Doctor Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Position (ex: Cardiologist)"
        value={position}
        onChangeText={setPosition}
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={addDoctor}>
        <Text style={styles.buttonText}>Add Doctor</Text>
      </TouchableOpacity>

    </View>
  );
};

export default AddDoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#f4f4f4",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#407CE2",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
