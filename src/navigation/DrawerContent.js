import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View} from 'react-native';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {
  const {navigation} = props;

  const [active, setActive] = useState('home');

  const {theme, ToggleTheme} = usePreferences();

  const onChangeScreen = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChangeScreen('home')}
          icon="home"
        />
        <Drawer.Item
          label="Peliculas populares"
          active={active === 'popular'}
          onPress={() => onChangeScreen('popular')}
          icon="movie"
        />
        <Drawer.Item
          label="Nuevas peliculas"
          active={active === 'news'}
          onPress={() => onChangeScreen('news')}
          icon="newspaper-variant"
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preferences}>
            <Text>Tema oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={ToggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
