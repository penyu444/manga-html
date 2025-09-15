// Sidebar drawer using expo-router drawer layout

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import comicList from '../data/comics.json';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-250));

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  const filtered = comicList.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openSidebar} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/viewer',
                params: { url: encodeURIComponent(item.url) },
              })
            }
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
      />

      <Modal
        transparent
        visible={sidebarVisible}
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <TouchableOpacity
          style={styles.sidebarOverlay}
          activeOpacity={1}
          onPress={closeSidebar}
        >
          <Animated.View style={[styles.sidebar, { left: slideAnim }]}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity onPress={closeSidebar}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Search Comics</Text>
            <TextInput
              style={styles.search}
              placeholder="Search..."
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
  },
  thumb: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    marginTop: 10,
  },
  search: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    height: '100%',
    backgroundColor: '#111',
    padding: 20,
    paddingTop: 40,
    position: 'absolute',
  },
  sidebarTitle: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});
