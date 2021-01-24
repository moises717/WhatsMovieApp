import {map} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';

import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';

import {getMovieByIdApi} from '../api/movies';
import ModalVideo from '../components/ModalVideo';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreference from '../hooks/usePreferences';
import startDark from '../assets/png/starDark.png';
import startLight from '../assets/png/starLight.png';

export default function Movie(props) {
  const [movie, setMovie] = useState(null);
  const [show, setShow] = useState(false);
  const {route} = props;
  const {id} = route.params;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getMovieByIdApi(id).then((res) => {
        setMovie(res);
      });
    }

    return () => (mounted = false);
  }, [id]);
  if (!movie) return null;
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTriller setShow={setShow} />
        <MovieTitle movie={movie} />
        <MovieRating
          voteCount={movie.vote_count}
          voteAverage={movie.vote_average}
        />

        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, {paddingBottom: 30}]}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
      </ScrollView>

      <ModalVideo show={show} setShow={setShow} idMovie={id} />
    </>
  );
}

function MovieImage(props) {
  const {posterPath} = props;

  const imageUrl = `${BASE_PATH_IMG}/w500${posterPath}`;

  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{uri: imageUrl}} />
    </View>
  );
}

function MovieTriller(props) {
  const {setShow} = props;
  return (
    <View style={styles.viewPlay}>
      <Button
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShow(true)}>
        Triler
      </Button>
    </View>
  );
}

function MovieTitle(props) {
  const {movie} = props;

  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.viewGenre}>
          {map(movie.genres, (genre) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function MovieRating(props) {
  const {voteCount, voteAverage} = props;

  const media = voteAverage / 2;

  const {theme} = usePreference();

  return (
    <View style={styles.rating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? startDark : startLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 16, marginRight: 5}}>{media}</Text>
      <Text style={{fontSize: 12, color: '#8697a5'}}>{voteCount} Votos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#fff',
    marginTop: -25,
    marginRight: 0,
    width: 100,
    borderRadius: 20,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenre: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 20,
    color: '#8697a5',
  },
  rating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#8697a5',
  },
});
