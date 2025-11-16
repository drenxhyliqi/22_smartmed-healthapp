import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Modal, Alert, Image
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "expo-router";

const DoctorCRUDScreen = () => {
    const router = useRouter();

    const [doctors, setDoctors] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [image, setImage] = useState("");

    const doctorsRef = collection(db, "doctors");

    const fetchDoctors = async () => {
        const snapshot = await getDocs(doctorsRef);
        const docsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(docsArray);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const saveDoctor = async () => {
        if (!name.trim() || !position.trim() || !image.trim()) {
            Alert.alert("Validation Error", "Please fill all fields before saving.");
            return;
        }

        try {
            if (currentDoctor) {
                const doctorDoc = doc(db, "doctors", currentDoctor.id);
                await updateDoc(doctorDoc, { name, position, image });
                Alert.alert("Success", "Doctor updated successfully!");
            } else {
                await addDoc(doctorsRef, { name, position, image });
                Alert.alert("Success", "Doctor added successfully!");
            }

            setName(""); setPosition(""); setImage(""); setCurrentDoctor(null); setModalVisible(false);
            fetchDoctors();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const editDoctor = (doctor) => {
        setCurrentDoctor(doctor);
        setName(doctor.name);
        setPosition(doctor.position);
        setImage(doctor.image);
        setModalVisible(true);
    };

    const removeDoctor = (doctor) => {
        Alert.alert(
            "Delete Doctor",
            `Are you sure you want to delete ${doctor.name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        await deleteDoc(doc(db, "doctors", doctor.id));
                        fetchDoctors();
                    }
                },
            ]
        );
    };

    const renderDoctor = ({ item }) => (
        <View style={styles.card}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.cardImage} /> : null}
            <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.position}</Text>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => editDoctor(item)}>
                    <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => removeDoctor(item)}>
                    <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Buttons */}
            <View style={styles.topButtons}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.goBack}
                    onPress={() => router.push('/(management)/menuList')}
                >
                    <Ionicons name={'arrow-back-sharp'} size={20} color={'#407CE2'} />
                    <Text style={styles.goBackText}>Back</Text>
                </TouchableOpacity>

                {/* Add Doctor Button */}
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Add Doctor</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id}
                renderItem={renderDoctor}
                contentContainerStyle={styles.listContent}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false); setCurrentDoctor(null); setName(""); setPosition(""); setImage("");
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>{currentDoctor ? "Edit Doctor" : "Add Doctor"}</Text>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="person" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Name"
                                placeholderTextColor="#555"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="medkit" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Position"
                                placeholderTextColor="#555"
                                value={position}
                                onChangeText={setPosition}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="image" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Image URL"
                                placeholderTextColor="#555"
                                value={image}
                                onChangeText={setImage}
                            />
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveBtn} onPress={saveDoctor}>
                                <Text style={styles.btnText}>{currentDoctor ? "Update" : "Save"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                                setModalVisible(false); setCurrentDoctor(null); setName(""); setPosition(""); setImage("");
                            }}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DoctorCRUDScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f2f5", padding: 15 },
    listContent: { paddingBottom: 50 },

    topButtons: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between',
    },

    goBack: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#e6f0ff',
        paddingVertical: 14,
        borderRadius: 25,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
    goBackText: {
        color: '#407CE2',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 6,
    },

    addButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#407CE2",
        paddingVertical: 14,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 6
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12
    },
    cardText: {
        flex: 1
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333"
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 2
    },
    cardActions: {
        flexDirection: "row"
    },
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
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },

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
        marginBottom: 20,
        textAlign: "center",
        color: "#333"
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fdfdfd",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    inputIcon: {
        marginRight: 10
    },
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
        backgroundColor: "#407CE2",
        padding: 14,
        borderRadius: 10,
        flex: 1,
        marginRight: 8
    },
    cancelBtn: {
        backgroundColor: "#aaa",
        padding: 14,
        borderRadius: 10,
        flex: 1
    },
});
