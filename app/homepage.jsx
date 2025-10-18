import { FlatList, StyleSheet, Text, TextInput, View, ScrollView, Touchable, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image' 
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = () => {

    const articles = [
        { id: '1', title: 'The 25 Healthiest Fruits You Can Eat, According to a Nutritionist', image: require('../assets/images/l2.png'), date: 'Jun 11, 20223' },
        { id: '2', title: 'The Impact of COVID-19 on Healthcare Systems', image: require('../assets/images/l1.png'), date: 'Jun 10, 20223' },
        { id: '3', title: 'The 25 Healthiest Fruits You Can Eat, According to a Nutritionist', image: require('../assets/images/l2.png'), date: 'Jun 9, 20223' },
        { id: '4', title: 'The Impact of COVID-19 on Healthcare Systems', image: require('../assets/images/l1.png'), date: 'Jun 8, 20223' },
    ]
    return (
        <SafeAreaView style={styles.container} edges={[]}>           
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />
            <Link href={'/start'} style={styles.goBack}>
                  <Ionicons
                    name={'arrow-back-sharp'}
                    size={24}
                    color={'#f9f9f9'}/>
            </Link>
            <View style={styles.banner}>
                <View>
                    <Text style={{ fontSize: 24, color: '#ffffffff', fontWeight: 'bold' }}>Welcome to {"\n"}SmartMed!</Text>
                    <Text style={{ marginTop: 10, color: '#ffffffff' }}>Your health, our priority</Text>
                    <Text style={{ marginTop: 40, color: '#d7d7d7ff' }}>How is it going today?</Text>
                </View>
                <View>
                   <Image
                    source={require('../assets/images/homepage-banner.png')}
                    style={{ width: 200, height: '100%' }}
                    contentFit="contain"
                    transition={100}
                    />
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="search" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput style={[styles.input, styles.inputWithIcon]} placeholder="Search doctor, drugs, articles..." placeholderTextColor="#666" />
                </View>

                <View style={styles.icons}>
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name="people" size={25} color="#ffffffff" style={styles.topDoctors} />
                        <Text style={{ marginTop: 10 }}>Top Doctors</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name="medkit" size={25} color="#ffffffff" style={styles.pharmacy}/>
                        <Text style={{ marginTop: 10 }}>Pharmacy</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name="bus" size={25} color="#ffffffff" style={styles.ambulance}/>
                        <Text style={{ marginTop: 10 }}>Ambulance</Text>
                    </View>
                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Health article</Text>
                    </View>
                    <View>
                        <Link href="">
                            <Text style={{ color: '#005effff' }}>See all</Text>
                        </Link>
                    </View>
                </View>

                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Image source={item.image} style={styles.listImage} />
                            <Text style={styles.listTitle} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                            <Text numberOfLines={1}>{item.date}</Text>
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
    inputWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    inputIcon: {
        position: 'absolute',
        left: 14,
        top: 14,
        zIndex: 10,
    },
    inputWithIcon: {
        paddingLeft: 44,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    topDoctors : {
        backgroundColor: '#407CE2',
        padding: 15,
        borderRadius: 30
    },
    pharmacy : {
        backgroundColor: '#407CE2',
        padding: 15,
        borderRadius: 30
    },
    ambulance : {
        backgroundColor: '#407CE2',
        padding: 15,
        borderRadius: 30
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
        flexShrink: 1
    },
    goBack: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
    }
})