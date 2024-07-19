import AsyncStorage from '@react-native-async-storage/async-storage';
import {CACHE_PREFIX, CACHE_MINUTES} from '@env';

const checkCache = cdata => {
  if (cdata) {
    const {expires} = JSON.parse(cdata);
    return Date.now() < expires;
  }
  return false;
};

export const setCache = (cname, cvalue, cminutes) => {
  const cmilliseconds =
    cminutes === 0 ? 0 : (cminutes || CACHE_MINUTES) * 60 * 1000;
  const d = new Date();
  d.setTime(d.getTime() + cmilliseconds);
  const expires = d.getTime();
  const ckey = `${CACHE_PREFIX}${cname}`;
  const cdata = JSON.stringify({value: cvalue, expires});
  return AsyncStorage.setItem(ckey, cdata);
};

export const getCache = async cname => {
  const ckey = `${CACHE_PREFIX}${cname}`;
  const cdata = await AsyncStorage.getItem(ckey);
  if (checkCache(cdata)) {
    const {value} = JSON.parse(cdata);
    return value;
  }
  return null;
};

export const getExpiredCache = async cname => {
  const ckey = `${CACHE_PREFIX}${cname}`;
  const cdata = await AsyncStorage.getItem(ckey);
  const {value} = JSON.parse(cdata) || {};
  return value;
};
