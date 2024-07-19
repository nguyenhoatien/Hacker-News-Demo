import {useCallback, useEffect, useState} from 'react';
import {getItemById} from '../queries/index';

export const useCommentsScreen = (kids, options = {}) => {
  const {limit = 10} = options;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    const newPage = page + 1;
    const startIndex = newPage * limit;
    const response = await Promise.all(
      kids.slice(startIndex, startIndex + limit).map(id => getItemById(id)),
    );

    if (response.length < limit) {
      setHasMore(false);
    }

    setData(prevData => [...prevData, ...response]);
    setPage(newPage);
    setLoading(false);
  }, [hasMore, kids, limit, loading, page]);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(0);

    const response = await Promise.all(
      kids.slice(0, limit).map(id => getItemById(id)),
    );

    setData(response);
    setRefreshing(false);
  }, [kids, limit]);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    {
      list: data,
      page,
      loading,
      refreshing,
      hasMore,
    },
    loadMoreData,
    refreshData,
  ];
};
