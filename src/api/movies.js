import {API_HOST, API_KEY, LANG} from '../utils/constants';

export function getNewsMoviesApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((result) => {
      return result;
    });
}

export function getGenreMovieApi(idGenre) {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const arrayGenres = [];

      idGenre.forEach((id) => {
        result.genres.forEach((item) => {
          if (item.id === id) arrayGenres.push(item.name);
        });
      });
      return arrayGenres;
    });
}

export function getAllGenresApi() {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
}

export function getGenreMoviesApi(idGenre) {
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${LANG}`;

  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
}

export function getMovieByIdApi(id) {
  const url = `${API_HOST}/movie/${id}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
}

export function getVideoMovieApi(idMovie) {
  const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
}

export function getPopularMovieApi(page = 1) {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
}

export function searchMoviesApi(search) {
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}
