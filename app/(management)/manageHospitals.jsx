import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    Modal,
    Alert,
    Image
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../firebase";
import { useRouter } from "expo-router";

const HospitalCRUDScreen = () => {
    const router = useRouter();

    const [hospitals, setHospitals] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentHospital, setCurrentHospital] = useState(null);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [pickedImage, setPickedImage] = useState(null);

    const hospitalsRef = collection(db, "hospitals");

    const fetchHospitals = async () => {
        const snapshot = await getDocs(hospitalsRef);
        const arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setHospitals(arr);
    };

    useEffect(() => { fetchHospitals(); }, []);

    const editHospital = (hospital) => {
        setCurrentHospital(hospital);
        setName(hospital.name);
        setLocation(hospital.location);
        setImage(hospital.image);
        setPickedImage(null);
        setModalVisible(true);
    };

    const chooseImageSource = () => {
        Alert.alert(
            "Select Image",
            "Choose image source",
            [
                { text: "Camera", onPress: openCamera },
                { text: "Gallery", onPress: pickFromGallery },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const pickFromGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission required", "Gallery access is required.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7
        });
        if (!result.canceled) setPickedImage(result.assets[0].uri);
    };

    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission required", "Camera access is required.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7
        });
        if (!result.canceled) setPickedImage(result.assets[0].uri);
    };

    const uploadImageAsync = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageRef = ref(storage, `hospitals/${Date.now()}.jpg`);
        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
    };

    const saveHospital = async () => {
        if (!name.trim() || !location.trim()) {
            Alert.alert("Validation Error", "Please fill all the fields.");
            return;
        }

        try {
            let imageUrl = image || null;
            if (pickedImage) {
                imageUrl = await uploadImageAsync(pickedImage);
            }

            if (currentHospital) {
                await updateDoc(doc(db, "hospitals", currentHospital.id), { name, location, image: imageUrl });
                Alert.alert("Success", "Hospital updated successfully!");
            } else {
                await addDoc(hospitalsRef, { name, location, image: imageUrl });
                Alert.alert("Success", "Hospital added successfully!");
            }

            setName(""); setLocation(""); setImage(""); setPickedImage(null); setCurrentHospital(null);
            setModalVisible(false);
            fetchHospitals();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const removeHospital = (hospital) => {
        Alert.alert(
            "Delete Hospital",
            `Are you sure you want to delete ${hospital.name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "hospitals", hospital.id));
                        fetchHospitals();
                    }
                }
            ]
        );
    };

    const renderHospital = ({ item }) => (
        <View style={styles.card}>
            {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
            <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.location}</Text>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => editHospital(item)}>
                    <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => removeHospital(item)}>
                    <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={styles.topButtons}>
                <TouchableOpacity
                    style={styles.goBack}
                    onPress={() => router.push("/myprofile")}
                >
                    <Ionicons name="arrow-back-sharp" size={20} color="#407CE2" />
                    <Text style={styles.goBackText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setModalVisible(true);
                        setName(""); setLocation(""); setImage(""); setPickedImage(null); setCurrentHospital(null);
                    }}
                >
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Add Hospital</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={hospitals}
                keyExtractor={(item) => item.id}
                renderItem={renderHospital}
                contentContainerStyle={styles.listContent}
            />

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setCurrentHospital(null);
                    setName(""); setLocation(""); setImage(""); setPickedImage(null);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <Text style={styles.modalHeading}>
                            {currentHospital ? "Edit Hospital" : "Add Hospital"}
                        </Text>

                        {/* Image Picker */}
                        <TouchableOpacity style={styles.imagePicker} onPress={chooseImageSource}>
                            {(pickedImage || image) ? (
                                <Image source={{ uri: pickedImage || image }} style={styles.previewImage} />
                            ) : (
                                <Text style={{ color: "#333" }}>Select Image</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="business" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Hospital Name"
                                placeholderTextColor="#555"
                                value={name}
                                onChangeText={setName}
                                style={styles.inputInner}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="location" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Location"
                                placeholderTextColor="#555"
                                value={location}
                                onChangeText={setLocation}
                                style={styles.inputInner}
                            />
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveBtn} onPress={saveHospital}>
                                <Text style={styles.btnText}>{currentHospital ? "Update" : "Save"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => {
                                    setModalVisible(false);
                                    setCurrentHospital(null);
                                    setName(""); setLocation(""); setImage(""); setPickedImage(null);
                                }}
                            >
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default HospitalCRUDScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f2f5", padding: 15 },
    listContent: { paddingBottom: 50 },

    topButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    goBack: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e6f0ff",
        paddingVertical: 14,
        borderRadius: 25,
        marginRight: 10,
        elevation: 3
    },
    goBackText: {
        marginLeft: 6,
        color: "#407CE2",
        fontSize: 16,
        fontWeight: "600",
    },

    addButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#407CE2",
        paddingVertical: 14,
        borderRadius: 25,
        elevation: 3
    },
    addButtonText: {
        marginLeft: 6,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12
    },
    cardText: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
    cardSubtitle: { fontSize: 14, color: "#555", marginTop: 2 },

    cardActions: { flexDirection: "row" },
    editBtn: {
        backgroundColor: "#FFD700",
        padding: 10,
        borderRadius: 8,
        marginRight: 8
    },
    deleteBtn: {
        backgroundColor: "#FF4C4C",
        padding: 10,
        borderRadius: 8
    },
    btnText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 15
    },
    modalHeading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center"
    },

    imagePicker: {
        height: 140,
        backgroundColor: "#eee",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        overflow: "hidden"
    },
    previewImage: { width: "100%", height: "100%" },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 15,
        elevation: 2
    },
    inputIcon: { marginRight: 10 },
    inputInner: {
        flex: 1,
        height: 50,
        color: "#333"
    },

    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    saveBtn: {
        flex: 1,
        backgroundColor: "#407CE2",
        padding: 14,
        borderRadius: 10,
        marginRight: 8
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: "#aaa",
        padding: 14,
        borderRadius: 10
    },
});
