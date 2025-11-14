import { FlatList, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = () => {

    const pharmacies = [
        { id: '1', title: 'Paracetamol', price: '$25', qty: '10 tablets', image: require('../assets/images/l1.png') },
        { id: '2', title: 'Vitamin C', price: '$40', qty: '20 tablets', image: require('../assets/images/l2.png') },
        { id: '3', title: 'Cough Syrup', price: '$120', qty: '100ml', image: require('../assets/images/l1.png') },
        { id: '4', title: 'Pain Relief Gel', price: '$85', qty: '50g', image: require('../assets/images/l2.png') },
        { id: '5', title: 'Bandage Roll', price: '$30', qty: '1 piece', image: require('../assets/images/l2.png') },
        { id: '6', title: 'Antibiotic Cream', price: '$90', qty: '20g', image: require('../assets/images/l1.png') },
    ]

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />
            <View style={styles.content}>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <Link href={'/homepage'} style={styles.goBack}>
                        <Ionicons
                            name={'arrow-back-sharp'}
                            size={24}
                            color={'#000000ff'} />
                    </Link>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pharmacy</Text>
                </View>

                {/* Grid List */}
                <FlatList
                    data={pharmacies}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} />

                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {item.title}
                            </Text>

                            <Text style={styles.cardPrice}>
                                Price: {item.price}
                            </Text>

                            <Text style={styles.cardQty}>
                                Qty: {item.qty}
                            </Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50, marginTop: 10 }}
                />

            </View>
        </SafeAreaView>
    )
}

export default Homepage

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
        resizeMode: 'contain',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 4,
    },
    cardPrice: {
        fontSize: 14,
        color: '#1A73E8',
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 2,
    },
    cardQty: {
        fontSize: 13,
        color: '#555',
        textAlign: 'left',
    },
    goBack: {
        backgroundColor: 'rgba(0,0,0,0.14)',
        marginEnd: 10,
        padding: 8,
        borderRadius: 8,
    },
})
