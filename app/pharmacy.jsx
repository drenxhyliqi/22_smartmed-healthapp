import { FlatList, StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const PharmacyHomepage = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = collection(db, "pharmacy");

        // REAL-TIME FIRESTORE LISTENER
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: "#fff", marginTop: 10 }}>Loading pharmacy items...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />

            <View style={styles.content}>

                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <Link href={'/homepage'} style={styles.goBack}>
                        <Ionicons name={'arrow-back-sharp'} size={24} color={'#000'} />
                    </Link>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pharmacy</Text>
                </View>

                {/* Grid List */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: 50, marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.image || "https://via.placeholder.com/100" }}
                                style={styles.cardImage}
                            />

                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {item.title}
                            </Text>

                            <Text style={styles.cardPrice}>
                                Price: ${item.price}
                            </Text>

                            <Text style={styles.cardQty}>
                                Qty: {item.qty}
                            </Text>
                        </View>
                    )}
                />

            </View>
        </SafeAreaView>
    );
}

export default PharmacyHomepage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#407CE2',
        flex: 1,
    },
    content: {
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 90,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    cardPrice: {
        fontSize: 14,
        color: '#1A73E8',
        fontWeight: '600',
        marginBottom: 2,
    },
    cardQty: {
        fontSize: 13,
        color: '#555',
    },
    goBack: {
        backgroundColor: 'rgba(0,0,0,0.14)',
        marginEnd: 10,
        padding: 8,
        borderRadius: 8,
    },
});
