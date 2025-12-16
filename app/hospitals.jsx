import {
    FlatList,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ActivityIndicator,
    Animated,
} from 'react-native';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const SkeletonItem = () => {
    return (
        <View style={styles.skeletonItem}>
            <View style={styles.skeletonImage} />
            <View style={{ flex: 1 }}>
                <View style={styles.skeletonLine} />
                <View style={[styles.skeletonLine, { width: '60%' }]} />
            </View>
        </View>
    );
};

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    // animacion fade-in per listen
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // useMemo per vlere qe nuk llogaritet ne cdo render
    const hospitalCount = useMemo(() => hospitals.length, [hospitals]);

    // useCallback per renderItem qe mos te rikrijohet cdo here
    const renderHospitalItem = useCallback(({ item }) => (
        <View style={styles.listItem}>
            <Image
                source={{ uri: item.image || 'https://via.placeholder.com/100' }}
                style={styles.listImage}
                contentFit="cover"
                transition={300} // animacion i lehte kur ngarkohet imazhi
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
    ), []);

    useEffect(() => {
        const ref = collection(db, 'hospitals');

        const unsubscribe = onSnapshot(ref, snapshot => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setHospitals(list);
            setLoading(false);

            // starton animacionin pasi te mbaroje loading
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        });

        return unsubscribe;
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />

            {loading ? (
                <View style={styles.content}>
                    {/* skeleton loading */}
                    {[1, 2, 3, 4, 5].map(item => (
                        <SkeletonItem key={item} />
                    ))}
                </View>
            ) : (
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                        <Link href="/homepage" style={styles.goBack}>
                            <Ionicons name="arrow-back-sharp" size={24} color="#000" />
                        </Link>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hospitals</Text>
                    </View>

                    <FlatList
                        data={hospitals}
                        keyExtractor={item => item.id}
                        renderItem={renderHospitalItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={5}   // lazy render i item-eve
                        windowSize={10}
                        removeClippedSubviews
                        contentContainerStyle={{ paddingBottom: 50 }}
                    />

                    <Text style={[styles.available]}>{hospitalCount} hospitals available</Text>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

export default Hospitals;

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
        backgroundColor: '#f0f0f0',
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

    // styles per skeleton loading
    skeletonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#f2f2f2',
        marginTop: 15,
    },
    skeletonImage: {
        width: 64,
        height: 64,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        marginRight: 12,
    },
    skeletonLine: {
        height: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
        marginBottom: 8,
        width: '80%',
    },
    available: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    color: '#407CE2',
    fontSize: 14,
    fontWeight: '600',
}
});
