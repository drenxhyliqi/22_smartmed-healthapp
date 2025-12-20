import React, { useMemo, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ArticleItem = React.memo(({ item }) => {
  return (
    <View style={styles.listItem}>
      <Image
        source={item.image}
        style={styles.listImage}
        contentFit="cover"
        transition={100}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={styles.listTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text style={styles.listDate} numberOfLines={1}>
          {item.date}
        </Text>
      </View>
    </View>
  );
});
const Homepage = () => {

  const articles = useMemo(() => ([
    {
      id: '1',
      title: 'The 25 Healthiest Fruits You Can Eat, According to a Nutritionist',
      image: require('../assets/images/l2.png'),
      date: 'Jun 11, 2023',
    },
    {
      id: '2',
      title: 'The Impact of COVID-19 on Healthcare Systems',
      image: require('../assets/images/l1.png'),
      date: 'Jun 10, 2023',
    },
    {
      id: '3',
      title: 'The 25 Healthiest Fruits You Can Eat, According to a Nutritionist',
      image: require('../assets/images/l2.png'),
      date: 'Jun 9, 2023',
    },
    {
      id: '4',
      title: 'The Impact of COVID-19 on Healthcare Systems',
      image: require('../assets/images/l1.png'),
      date: 'Jun 8, 2023',
    },
  ]), []);

  const renderArticle = useCallback(
    ({ item }) => <ArticleItem item={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#407CE2" />

      {/* Go back */}
      <Link href="/start" style={styles.goBack}>
        <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
      </Link>

      {/* Banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>
            Welcome to {"\n"}SmartMed!
          </Text>
          <Text style={styles.bannerSubtitle}>
            Your health, our priority
          </Text>
          <Text style={styles.bannerQuestion}>
            How is it going today?
          </Text>
        </View>

        <Image
          source={require('../assets/images/homepage-banner.png')}
          style={styles.bannerImage}
          contentFit="contain"
          transition={100}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Search */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, styles.inputWithIcon]}
            placeholder="Search doctor, drugs, articles..."
            placeholderTextColor="#666"
          />
        </View>

        {/* Quick actions */}
        <View style={styles.icons}>
          <View style={styles.iconItem}>
            <Ionicons name="people" size={25} color="#fff" style={styles.iconBg} />
            <Link href="/topdoctors">
              <Text style={styles.iconLabel}>Top Doctors</Text>
            </Link>
          </View>

          <View style={styles.iconItem}>
            <Ionicons name="medkit" size={25} color="#fff" style={styles.iconBg} />
            <Link href="/pharmacy">
              <Text style={styles.iconLabel}>Pharmacy</Text>
            </Link>
          </View>

          <View style={styles.iconItem}>
            <Ionicons name="business-outline" size={25} color="#fff" style={styles.iconBg} />
            <Link href="/hospitals">
              <Text style={styles.iconLabel}>Hospitals</Text>
            </Link>
          </View>
        </View>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health articles</Text>
          <Link href="/articles">
            <Text style={styles.seeAll}>See all</Text>
          </Link>
        </View>

        {/* Articles list */}
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={renderArticle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          initialNumToRender={4}
          windowSize={10}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default Homepage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#407CE2',
  },
  goBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    zIndex: 10,
  },
  banner: {
    height: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    marginTop: 10,
    color: '#fff',
  },
  bannerQuestion: {
    marginTop: 40,
    color: '#d7d7d7',
  },
  bannerImage: {
    width: 200,
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: '#407CE2',
    padding: 15,
    borderRadius: 30,
  },
  iconLabel: {
    marginTop: 10,
  },
  sectionHeader: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#005eff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    marginTop: 15,
    elevation: 2,
  },
  listImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  listDate: {
    color: '#777',
    marginTop: 4,
  },
});