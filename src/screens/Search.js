import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {size, map} from 'lodash';
import {searchMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import {useRotation} from '../hooks/useRotation';

export default function Search(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');
  const [widthDinamic, setWidthDinamic] = useState(null);
  const orientation = useRotation();
  useEffect(() => {
    if (size(search) > 2) {
      searchMoviesApi(search).then((response) => {
        setMovies(response.results);
      });
    }
  }, [search]);

  const getDimension = () => {
    const {width} = Dimensions.get('window');
    return width;
  };

  useEffect(() => {
    const tamaño = getDimension();
    setWidthDinamic(tamaño);
  }, [orientation]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu película"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
        autoFocus={true}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie
              key={index}
              movie={movie}
              navigation={navigation}
              widthdinamic={widthDinamic}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const {movie, navigation, widthdinamic} = props;
  const {id, poster_path, title} = movie;

  const goMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={[styles.movie, {width: widthdinamic / 2}]}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
