import axios from '../lib/axios';
import {setCache, getCache, getExpiredCache} from './localStorageCache';

export const getQuery = async (url, config = {}, cacheMinutes = null) => {
  const cname = url;
  const cvalue = await getCache(cname);
  if (cvalue) {
    return cvalue;
  }

  try {
    const response = await axios.get(url, config);
    const rdata = response.data;

    await setCache(cname, rdata, cacheMinutes);

    return rdata;
  } catch (error) {
    console.error(`An error occurred while getting data from: ${url}`, error);

    const cexpired = await getExpiredCache(cname);
    if (cexpired) {
      console.warn(`Returning cached data for ${url}`);
      return cexpired;
    }

    return [];
  }
};
