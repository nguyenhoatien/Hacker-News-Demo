import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {useNavigation} from '@react-navigation/native';
import {format} from '../../utils/dateFormatter.js';
import {withErrorResolver} from '../../utils/withErrorResolver.js';

function ArticleItem({item}) {
  const {by, kids = [], score, time, title, url = ''} = item;
  const [, , hostname] = url.split('/');
  const navigation = useNavigation();

  const openLink = withErrorResolver(async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          animated: true,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }, 'openLinkArticleItem');

  const renderComment = useCallback(() => {
    if (kids.length) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommentsScreen', {name: title, item});
          }}>
          <Text style={styles.linktext}>See full comment</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }, [item, kids.length, navigation, title]);

  return (
    <View style={[styles.container, styles.elementSpacing]}>
      <TouchableOpacity onPress={openLink} style={styles.elementSpacing}>
        <Text>
          <Text style={styles.text}>{title}</Text>
          {hostname && <Text style={styles.subtext}>{` (${hostname})`}</Text>}
        </Text>
        <Text style={styles.subtext}>
          {`${score} points by ${by} ${format(time)} | ${kids.length} comments`}
        </Text>
      </TouchableOpacity>
      {renderComment()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomColor: '#d1d5db',
    borderBottomWidth: 1,
  },
  elementSpacing: {
    gap: 5,
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
  },
  subtext: {
    color: '#828282',
    fontSize: 12,
  },
  linktext: {
    fontSize: 12,
  },
});

export default ArticleItem;
