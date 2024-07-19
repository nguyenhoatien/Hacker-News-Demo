import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StoriesScreen from './StoriesScreen';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();

function ListingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
          },
          tabBarItemStyle: styles.tabBarLabelStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}>
        <Tab.Screen
          name="New Stories"
          component={StoriesScreen}
          initialParams={{type: 'newstories'}}
        />
        <Tab.Screen
          name="Best Stories"
          component={StoriesScreen}
          initialParams={{type: 'topstories'}}
        />
        <Tab.Screen
          name="Top Stories"
          component={StoriesScreen}
          initialParams={{type: 'beststories'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarLabelStyle: {
    fontWeight: 'bold',
    width: 'auto',
    minHeight: 'auto',
    margin: 0,
  },
});

export default ListingScreen;
