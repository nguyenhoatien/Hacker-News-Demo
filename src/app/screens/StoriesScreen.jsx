import React, {useRef} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {useStoriesScreen} from '../../hooks/useStoriesScreen';
import ArticleItem from '../components/ArticleItem';
import Loading from '../components/Loading';

function StoriesScreen({route}) {
  const {type} = route.params;
  const [data, loadMoreData, refreshData] = useStoriesScreen(type);
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
      renderItem={({item}) => <ArticleItem item={item} />}
      keyExtractor={item => item.id?.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={1}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={data.refreshing} onRefresh={refreshData} />
      }
    />
  );
}

export default StoriesScreen;
