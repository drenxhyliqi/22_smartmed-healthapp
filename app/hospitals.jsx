import { FlatList, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = () => {

    const hospitals = [
        { id: '1', name: 'City Care Hospital', address: 'MG Road, Bangalore' },
        { id: '2', name: 'Apollo Medical Center', address: 'Anna Nagar, Chennai' },
        { id: '3', name: 'Global Life Hospital', address: 'Salt Lake, Kolkata' },
        { id: '4', name: 'Sunrise Health Clinic', address: 'Jubilee Hills, Hyderabad' },
        { id: '5', name: 'National Hospital', address: 'Connaught Place, Delhi' },
        { id: '6', name: 'Green Valley Hospital', address: 'Vyttila, Kochi' },
        { id: '7', name: 'St. Joseph Medical', address: 'Panaji, Goa' },
        { id: '8', name: 'Metro Plus Hospital', address: 'Bandra, Mumbai' },
        { id: '9', name: 'LifeAid Hospital', address: 'Civil Lines, Jaipur' },
        { id: '10', name: 'Prime Healthcare', address: 'Sector 17, Chandigarh' },
    ];

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
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hospitals</Text>
                </View>

                {/* Hospitals List */}
                <FlatList
                    data={hospitals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>

                            {/* ICON instead of image */}
                            <View style={styles.iconWrap}>
                                <Ionicons name="medkit" size={34} color="#407CE2" />
                            </View>

                            {/* TEXT column */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listTitle} numberOfLines={1}>
                                    {item.name}
                                </Text>

                                <Text style={styles.listPosition} numberOfLines={2}>
                                    {item.address}
                                </Text>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
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
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginTop: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    iconWrap: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#e8f0fe',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginEnd: 10,
        padding: 8,
        borderRadius: 8,
    },
})
