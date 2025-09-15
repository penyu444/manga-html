import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ViewerScreen() {
  const { url } = useLocalSearchParams();
  const decodedUrl = decodeURIComponent(url as string);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: decodedUrl }}
        style={{ flex: 1 }}
        allowsInlineMediaPlayback
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
