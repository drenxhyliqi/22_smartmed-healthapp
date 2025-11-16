import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Modal, Alert, Image
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
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

    const pharmacyRef = collection(db, "pharmacy");

    const fetchItems = async () => {
        const snapshot = await getDocs(pharmacyRef);
        const docsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(docsArray);
    };

    useEffect(() => { fetchItems(); }, []);

    // ✅ FIXED: Missing edit function
    const editItem = (item) => {
        setCurrentItem(item);
        setTitle(item.title);
        setPrice(item.price);
        setQty(item.qty);
        setImage(item.image);
        setModalVisible(true);
    };

    const saveItem = async () => {
        if (!title.trim() || !price.trim() || !qty.trim() || !image.trim()) {
            Alert.alert("Validation Error", "Please fill all fields.");
            return;
        }

        try {
            if (currentItem) {
                // UPDATE
                const itemDoc = doc(db, "pharmacy", currentItem.id);
                await updateDoc(itemDoc, { title, price, qty, image });
                Alert.alert("Success", "Item updated!");
            } else {
                // ADD NEW
                await addDoc(pharmacyRef, { title, price, qty, image });
                Alert.alert("Success", "Item added!");
            }

            // Reset
            setTitle(""); setPrice(""); setQty(""); setImage("");
            setCurrentItem(null);
            setModalVisible(false);

            fetchItems();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    // ✅ FIXED DELETE ALERT FORMAT
    const removeItem = (item) => {
        Alert.alert(
            "Delete Item",
            `Are you sure you want to delete ${item.title}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "pharmacy", item.id));
                        fetchItems();
                    }
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.cardImage} /> : null}

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
            {/* Top Buttons */}
            <View style={styles.topButtons}>
                <TouchableOpacity style={styles.goBack} onPress={() => router.push('/(management)/menuList')}>                   
                
                    <Ionicons name={'arrow-back-sharp'} size={20} color={'#407CE2'} />
                    <Text style={styles.goBackText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setCurrentItem(null);
                    setTitle(""); setPrice(""); setQty(""); setImage("");
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>{currentItem ? "Edit Item" : "Add Item"}</Text>

                        {/* Title */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="bag" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Title"
                                placeholderTextColor="#000"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Price */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="pricetag" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Price"
                                placeholderTextColor="#000"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>

                        {/* Qty */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="cube" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Quantity"
                                placeholderTextColor="#000"
                                keyboardType="numeric"
                                value={qty}
                                onChangeText={setQty}
                            />
                        </View>

                        {/* Image URL */}
                        <View style={styles.inputWrapper}>
                            <Ionicons name="image" size={20} color="#555" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputInner}
                                placeholder="Image URL"
                                placeholderTextColor="#000"
                                value={image}
                                onChangeText={setImage}
                            />
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveBtn} onPress={saveItem}>
                                <Text style={styles.btnText}>{currentItem ? "Update" : "Save"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                                setModalVisible(false);
                                setCurrentItem(null);
                                setTitle(""); setPrice(""); setQty(""); setImage("");
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
        borderRadius: 10,
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
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    inputIcon: { marginRight: 10 },
    inputInner: { flex: 1, height: 50, color: "#333" },

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
