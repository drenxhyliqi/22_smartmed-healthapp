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

const PharmacyCRUDScreen = () => {
    const router = useRouter();

    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [image, setImage] = useState("");
    const [pickedImage, setPickedImage] = useState(null);

    const pharmacyRef = collection(db, "pharmacy");

    // Fetch items
    const fetchItems = async () => {
        const snapshot = await getDocs(pharmacyRef);
        const docsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(docsArray);
    };

    useEffect(() => { fetchItems(); }, []);

    // Edit item
    const editItem = (item) => {
        setCurrentItem(item);
        setTitle(item.title);
        setPrice(item.price);
        setQty(item.qty);
        setImage(item.image);
        setPickedImage(null);
        setModalVisible(true);
    };

    // Image picker
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
        const imageRef = ref(storage, `pharmacy/${Date.now()}.jpg`);
        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
    };

    const saveItem = async () => {
        if (!title.trim() || !price.trim() || !qty.trim()) {
            Alert.alert("Validation Error", "Please fill all fields.");
            return;
        }

        try {
            let imageUrl = image || null;
            if (pickedImage) {
                imageUrl = await uploadImageAsync(pickedImage);
            }

            if (currentItem) {
                await updateDoc(doc(db, "pharmacy", currentItem.id), { title, price, qty, image: imageUrl });
                Alert.alert("Success", "Item updated!");
            } else {
                await addDoc(pharmacyRef, { title, price, qty, image: imageUrl });
                Alert.alert("Success", "Item added!");
            }

            setTitle(""); setPrice(""); setQty(""); setImage(""); setPickedImage(null);
            setCurrentItem(null);
            setModalVisible(false);
            fetchItems();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const removeItem = (item) => {
        Alert.alert(
            "Delete Item",
            `Are you sure you want to delete ${item.title}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        await deleteDoc(doc(db, "pharmacy", item.id));
                        fetchItems();
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {(item.image) && <Image source={{ uri: item.image }} style={styles.cardImage} />}
            <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>Price: ${item.price}</Text>
                <Text style={styles.cardSubtitle}>Qty: {item.qty}</Text>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => editItem(item)}>
                    <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item)}>
                    <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topButtons}>
                <TouchableOpacity style={styles.goBack} onPress={() => router.push('/(management)/menuList')}>
                    <Ionicons name="arrow-back-sharp" size={20} color="#407CE2" />
                    <Text style={styles.goBackText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={() => {
                    setModalVisible(true);
                    setTitle(""); setPrice(""); setQty(""); setImage(""); setPickedImage(null); setCurrentItem(null);
                }}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                initialNumToRender={5}        // sa item ngarkohen fillimisht
                windowSize={10}               // sa item të tjera ngarkohen gjatë scroll
                removeClippedSubviews={true}  // çaktivizon imazhet jashtë viewport
                contentContainerStyle={styles.listContent}
            />

            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>{currentItem ? "Edit Item" : "Add Item"}</Text>

                        {/* Image picker */}
                        <TouchableOpacity style={styles.imagePicker} onPress={chooseImageSource}>
                            {(pickedImage || image) ? (
                                <Image source={{ uri: pickedImage || image }} style={styles.previewImage} />
                            ) : (
                                <Text style={{ color: "#333" }}>Select Image</Text>
                            )}
                        </TouchableOpacity>

                        {/* Title */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="bag" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="Title"
                                placeholderTextColor="#333"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Price */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="pricetag" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="Price"
                                placeholderTextColor="#333"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>

                        {/* Qty */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="cube" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="Quantity"
                                placeholderTextColor="#333"
                                keyboardType="numeric"
                                value={qty}
                                onChangeText={setQty}
                            />
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveBtn} onPress={saveItem}>
                                <Text style={styles.btnText}>{currentItem ? "Update" : "Save"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                                setModalVisible(false);
                                setCurrentItem(null);
                                setTitle(""); setPrice(""); setQty(""); setImage(""); setPickedImage(null);
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

export default PharmacyCRUDScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f2f5", padding: 15 },
    listContent: { paddingBottom: 50 },

    topButtons: { flexDirection: "row", marginBottom: 15 },

    goBack: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e6f0ff",
        padding: 14,
        borderRadius: 25,
        marginRight: 10
    },
    goBackText: { color: "#407CE2", marginLeft: 6, fontWeight: "600" },

    addButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#407CE2",
        padding: 14,
        borderRadius: 25
    },
    addButtonText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    cardImage: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
    cardText: { flex: 1 },
    cardTitle: { fontWeight: "bold", fontSize: 16 },
    cardSubtitle: { color: "#555" },

    cardActions: { flexDirection: "row" },
    editBtn: { backgroundColor: "#FFD700", padding: 10, borderRadius: 8, marginRight: 8 },
    deleteBtn: { backgroundColor: "#FF4C4C", padding: 10, borderRadius: 8 },

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "#fff",
        width: "90%",
        padding: 20,
        borderRadius: 15
    },
    modalHeading: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },

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
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 10
    },
    inputIcon: { marginRight: 8 },
    inputWithIcon: { flex: 1, paddingVertical: 12 },

    modalButtons: { flexDirection: "row" },
    saveBtn: { flex: 1, backgroundColor: "#407CE2", padding: 14, borderRadius: 10, marginRight: 8 },
    cancelBtn: { flex: 1, backgroundColor: "#aaa", padding: 14, borderRadius: 10 },
    btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" }
});
