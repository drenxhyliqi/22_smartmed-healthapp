import { FlatList, StyleSheet, Text, View, StatusBar, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState , useRef} from 'react';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { scheduleReminderAtDate } from '../app/utils/notifications';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { Animated } from 'react-native';



const PharmacyHomepage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date'); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successText, setSuccessText] = useState('');
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Notifications.requestPermissionsAsync();},
        []);



    const handleSetReminder = (medication) => {
        setSelectedMedication(medication);
        setPickerMode('date');
        setSelectedDate(new Date()); 
        setShowPicker(true);
    };

    const onDateChange = (event, date) => {
    if (!date) return;

    const newDate = new Date(selectedDate);
    newDate.setFullYear(date.getFullYear());
    newDate.setMonth(date.getMonth());
    newDate.setDate(date.getDate());

    setSelectedDate(newDate);
};


const onTimeChange = (event, time) => {
    if (!time) return;

    const newDate = new Date(selectedDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(0);

    setSelectedDate(newDate);
    };
    
    const confirmReminder = async () => {
    const now = new Date();

    if (selectedDate <= now) {
        Alert.alert(
            'Invalid time',
            'Please choose a future date and time'
        );
        return;
    }

    setShowPicker(false);
    setPickerMode('date');
        
    await scheduleReminderAtDate(selectedDate, selectedMedication);
        playSuccessAnimation();
    };
    const playSuccessAnimation = () => {
    setShowSuccess(true);

    scaleAnim.setValue(0.5);
    opacityAnim.setValue(0);

    Animated.parallel([
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }),
    ]).start();

    setTimeout(() => {
        setShowSuccess(false);
    }, 1500);
};




    useEffect(() => {
        const ref = collection(db, 'pharmacy');

        //  REAL-TIME FIRESTORE LISTENER
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setItems(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: '#fff', marginTop: 10 }}>
                    Loading pharmacy items...
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#407CE2" />

            <View style={styles.content}>
                {/* 🔙 HEADER */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <Link href="/homepage" style={styles.goBack}>
                        <Ionicons name="arrow-back-sharp" size={24} color="#000" />
                    </Link>

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pharmacy</Text>
                </View>

                {/*  GRID LIST */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: 50, marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={6}
                    windowSize={10}
                    removeClippedSubviews={true}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.image || 'https://via.placeholder.com/100' }}
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

                            {/*  REMINDER BUTTON */}
                            <TouchableOpacity
                                style={styles.reminderButton}
                                onPress={() => handleSetReminder(item.title)}
                            >
                                <Ionicons name="notifications-outline" size={20} color="#fff" />
                                <Text style={styles.reminderText}>Set Reminder</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            {showPicker && (
    <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>
            {pickerMode === 'date' ? 'Select Date' : 'Select Time'}
        </Text>

        <DateTimePicker
            value={selectedDate}
            mode={pickerMode}
            display="spinner"
            minimumDate={new Date()}
            onChange={pickerMode === 'date' ? onDateChange : onTimeChange}
        />

        <View style={styles.buttonRow}>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                    setShowPicker(false);
                    setPickerMode('date');
                }}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            {pickerMode === 'date' ? (
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => setPickerMode('time')}
                >
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={confirmReminder}
                >
                    <Text style={styles.continueText}>Set Reminder</Text>
                </TouchableOpacity>
            )}
        </View>
                </View>)}
            {showSuccess && (
    <View style={styles.successOverlay}>
        <Animated.View
            style={[
                styles.successBox,
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <Ionicons name="checkmark-circle" size={80} color="#407CE2" />
            <Text style={styles.successText}>Reminder Set</Text>
        </Animated.View>
    </View>
)}

        </SafeAreaView>
    );
};

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
        shadowOpacity: 0.1,
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

    reminderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#407CE2',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
        justifyContent: 'center',
    },

    reminderText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: '600',
    },

    /* 🔽 PICKER BOTTOM SHEET */
    pickerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 12,
    },

    pickerTitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },

    /* BUTTON ROW */
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#407CE2',
        alignItems: 'center',
        marginRight: 10,
    },

    cancelText: {
        color: '#407CE2',
        fontWeight: '600',
    },

    continueButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#407CE2',
        alignItems: 'center',
        marginLeft: 10,
    },

    continueText: {
        color: '#fff',
        fontWeight: '600',
    },
    successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
},

successBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
},

successText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#407ce3',
},

});
