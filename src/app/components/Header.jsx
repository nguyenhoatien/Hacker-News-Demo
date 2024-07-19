import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Hacker News</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    backgroundColor: 'black',
    padding: 10,
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Header;
