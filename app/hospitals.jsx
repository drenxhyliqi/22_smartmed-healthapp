import { FlatList, StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Homepage = () => {

    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = collection(db, "hospitals");

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setHospitals(list);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ marginTop: 10, color: '#fff', fontSize: 18 }}>Loading hospitals...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />

            <View style={styles.content}>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <Link href={'/homepage'} style={styles.goBack}>
                        <Ionicons
                            name={'arrow-back-sharp'}
                            size={24}
                            color={'#000'} />
                    </Link>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hospitals</Text>
                </View>

                {/* Hospitals List */}
                <FlatList
                    data={hospitals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>

                            {/* Image */}
                            <Image
                                source={{
                                    uri: item.image || "https://via.placeholder.com/100"
                                }}
                                style={styles.listImage}
                            />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.listTitle} numberOfLines={1}>
                                    {item.name}
                                </Text>

                                <Text style={styles.listPosition} numberOfLines={2}>
                                    {item.location}
                                </Text>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={5}        // sa item ngarkohen fillimisht
                    windowSize={10}               // sa item të tjera ngarkohen gjatë scroll
                    removeClippedSubviews={true}  // çaktivizon imazhet jashtë viewport
                    contentContainerStyle={{ paddingBottom: 50 }}
                />

            </View>
        </SafeAreaView>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#407CE2',
        flex: 1,
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginTop: 15,
        elevation: 2,
    },

    listImage: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: "#f0f0f0",
    },

    listTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000',
    },

    listPosition: {
        fontSize: 14,
        color: '#555',
    },

    goBack: {
        backgroundColor: 'rgba(0,0,0,0.14)',
        padding: 8,
        borderRadius: 8,
        marginRight: 10,
    },
});
