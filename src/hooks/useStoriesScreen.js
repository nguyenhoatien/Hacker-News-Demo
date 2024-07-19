import {useCallback, useEffect, useState} from 'react';
import {
  getBestStories,
  getNewStories,
  getTopStories,
  getItemById,
} from '../queries/index';

export const useStoriesScreen = (
  type = 'newstories' || 'topstories' || 'beststories',
  options = {},
) => {
  const {limit = 10} = options;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getStories = useCallback(() => {
    if (type === 'newstories') {
      return getNewStories();
    } else if (type === 'topstories') {
      return getTopStories();
    } else if (type === 'beststories') {
      return getBestStories();
    }
  }, [type]);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    const newPage = page + 1;
    const startIndex = newPage * limit;
    const stories = await getStories();
    const response = await Promise.all(
      stories.slice(startIndex, startIndex + limit).map(id => getItemById(id)),
    );

    if (response.length < limit) {
      setHasMore(false);
    }

    setData(prevData => [...prevData, ...response]);
    setPage(newPage);
    setLoading(false);
  }, [hasMore, limit, loading, page, getStories]);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(0);

    const stories = await getStories();
    const response = await Promise.all(
      stories.slice(0, limit).map(id => getItemById(id)),
    );

    setData(response);
    setRefreshing(false);
  }, [limit, getStories]);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    {list: data, page, loading, refreshing, hasMore},
    loadMoreData,
    refreshData,
  ];
};
