import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, IconButton} from 'react-native-paper';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Search from '../screens/Search';
import Popular from '../screens/Popular';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;
  const ButtonLeft = (screen) => {
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const ButtonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'WhatsMovie',
          headerLeft: () => ButtonLeft('home'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => ButtonLeft('movie'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'Nuevas Peliculas',
          headerLeft: () => ButtonLeft('news'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'Peliculas populares',
          headerLeft: () => ButtonLeft('popular'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: '',
          headerLeft: () => ButtonLeft('search'),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
