import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'react-native' 
import { Ionicons } from '@expo/vector-icons'

const Homepage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to {"\n"}SmartMed!</Text>
                    <Text style={{ marginTop: 10 }}>Your health, our priority</Text>
                    <Text style={{ marginTop: 40 , fontWeight: 'lighter' }}>How is it going today?</Text>
                </View>
                <View>
                    <Image source={require('../assets/images/homepage-banner.png')} style={styles.image} />
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

                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Health article</Text>
                    </View>
                    <View>
                        <Link href="">
                            <Text style={{ color: '#005effff' }}>See all</Text>
                        </Link>
                    </View>
                </View>

                <FlatList>
                    
                </FlatList>
            </View>
        </View>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ace8ffff',
        height: '100%',
        width: '100%'
    },
    banner: {
        height: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingStart: 25,
        paddingEnd: 20,
        paddingEnd: 20
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
        height: '100%',
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
        justifyContent: 'space-between',
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
    }
})