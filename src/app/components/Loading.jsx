import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Loading;
