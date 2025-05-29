// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const PdfWebView = ({ source }) => {
//   console.log(source);

//   return (
//     <View style={styles.container}>
//       <WebView source={{ uri: source }} style={styles.webview} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   webview: {
//     flex: 1,
//   },
// });

// export default PdfWebView;

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

export default function PdfWebView({ source }) {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const downloadPdf = async () => {
      const fileUri = `${FileSystem.cacheDirectory}temp.pdf`;
      const { uri } = await FileSystem.downloadAsync(source, fileUri);
      setLocalUri(uri);
    };

    downloadPdf();
  }, [source]);

  if (!localUri) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: localUri }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});