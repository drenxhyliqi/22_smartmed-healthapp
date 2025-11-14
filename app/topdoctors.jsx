import { FlatList, StyleSheet, Text, TextInput, View, ScrollView, Touchable, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = () => {

    const articles = [
        { id: '1', title: 'Dr. Rishi', image: require('../assets/images/l2.png'), position: 'Jun 11, 20223' },
        { id: '2', title: 'Dr. Vamana', image: require('../assets/images/l1.png'), position: 'Jun 10, 20223' },
        { id: '3', title: 'Dr. Nallarasi', image: require('../assets/images/l2.png'), position: 'Jun 9, 20223' },
        { id: '4', title: 'Dr. Nihal', image: require('../assets/images/l1.png'), position: 'Jun 8, 20223' },
        { id: '5', title: 'Dr. Rishita', image: require('../assets/images/l1.png'), position: 'Jun 8, 20223' },
    ]

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />
            <View style={styles.content}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Link href={'/homepage'} style={styles.goBack}>
                            <Ionicons
                                name={'arrow-back-sharp'}
                                size={24}
                                color={'#000000ff'} />
                        </Link>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top doctors</Text>
                    </View>
                </View>

                {/* FIXED LIST */}
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Image source={item.image} style={styles.listImage} />

                            {/* Text Column */}
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={styles.listTitle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    style={styles.listPosition}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.position}
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
    banner: {
        height: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingStart: 25,
        paddingEnd: 20,
    },
    image: {
        paddingTop: 30,
        width: 200,
        height: '100%',
        resizeMode: 'contain',
    },
    content: {
        padding: 20,
        backgroundColor: '#ffffffff',
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
    listImage: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 12,
        resizeMode: 'cover'
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4
    },
    listPosition: {
        fontSize: 14,
        color: '#555'
    },
    goBack: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
        marginEnd: 10,
        padding: 8,
        borderRadius: 8,
    }
})
