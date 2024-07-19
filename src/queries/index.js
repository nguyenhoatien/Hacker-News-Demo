import {getQuery} from '../utils/getQuery';

export const getNewStories = () => {
  return getQuery('newstories.json', {}, 0);
};

export const getTopStories = () => {
  return getQuery('topstories.json', {}, 0);
};

export const getBestStories = () => {
  return getQuery('beststories.json', {}, 0);
};

export const getItemById = id => {
  return getQuery(`item/${id}.json`);
};
