import React, {useRef} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import Comment from '../components/Comment';
import Loading from '../components/Loading';
import {useCommentsScreen} from '../../hooks/useCommentsScreen';

function CommentsScreen({route}) {
  const {
    item: {kids = []},
  } = route.params;
  const [data, loadMoreData, refreshData] = useCommentsScreen(kids);
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  const renderFooter = () => {
    if (data.loading) {
      return <Loading />;
    }
    return null;
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data.list}
      renderItem={({item}) => <Comment item={item} />}
      keyExtractor={item => item.id?.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={data.refreshing} onRefresh={refreshData} />
      }
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

export default CommentsScreen;
