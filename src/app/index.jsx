import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListingScreen from './screens/ListingScreen';
import CommentsScreen from './screens/CommentsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListingScreen"
          component={ListingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return <AppNavigator />;
}

export default App;
