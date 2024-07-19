import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {format} from '../../utils/dateFormatter.js';
import {getItemById} from '../../queries/index.js';
import Loading from './Loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {withErrorResolver} from '../../utils/withErrorResolver.js';

function Comment({item, level = 0}) {
  const {by, deleted, kids = [], time, text} = item;
  const [kidsData, setKidsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const limit = useMemo(
    () => ({
      0: 2,
      1: 1,
    }),
    [],
  );

  useEffect(() => {
    const fetchKidsData = withErrorResolver(async () => {
      setLoading(true);
      const response = await Promise.all(
        kids.slice(0, limit[level] - 1).map(id => getItemById(id)),
      );
      setKidsData(response);
      setLoading(false);
    }, 'fetchKidsDataComment');

    if (kids.length && level <= 1) {
      fetchKidsData();
    }
  }, [kids, level, limit]);

  const renderKidsItem = useCallback(() => {
    if (loading) {
      return <Loading />;
    }
    if (kidsData.length) {
      return (
        <>
          {kidsData.map(kitem => (
            <Comment
              item={kitem}
              level={level + 1}
              key={kitem.id?.toString()}
            />
          ))}
          {kids.length > limit[level] && (
            <TouchableOpacity
              onPress={() => {
                navigation.push('CommentsScreen', {name: text, item});
              }}>
              <Text style={styles.viewmore}>View more</Text>
            </TouchableOpacity>
          )}
        </>
      );
    }
    return null;
  }, [item, kids.length, kidsData, level, limit, loading, navigation, text]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtext}>{`${by} • ${format(time)}`}</Text>
      <Text>{deleted ? '[deleted]' : text}</Text>
      <View style={styles.kidsContainer}>{renderKidsItem()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    padding: 10,
    paddingBottom: 0,
  },
  kidsContainer: {
    paddingLeft: 10,
  },
  subtext: {
    color: '#828282',
    fontSize: 12,
  },
  viewmore: {
    color: '#828282',
    paddingLeft: 10,
  },
});

export default Comment;
