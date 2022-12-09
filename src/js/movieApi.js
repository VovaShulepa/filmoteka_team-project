import axios from 'axios';

// ===== GENRE Filter ==============
const GENRE_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9644f0ea42d355116080d8c56f2a2e95';

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

const tagsEl = document.getElementById('tags');

let selectedGenre = [];
// ==============================================
export class MovieApi {
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #API_KEY = '9644f0ea42d355116080d8c56f2a2e95';
  #BEARER_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ0ZjBlYTQyZDM1NTExNjA4MGQ4YzU2ZjJhMmU5NSIsInN1YiI6IjYzODQ5YThiYmYwOWQxMDA3YjA1ZGNhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Malh7hKQ8cPpJehS1trEierjSDz873qjS069_qwsppI';
  #IMG_URL = 'https://image.tmdb.org/t/p/';
  #MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie/';
  #MOVIE_API_KEY = 'api_key=9644f0ea42d355116080d8c56f2a2e95';

  constructor() {
    this.imgUrl = this.#IMG_URL;
    this.imgSize = 'w500';
    this.page = 1;
    this.query = null;
  }

  async fetchTrendingMovies(page = 1) {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page,
      },
    };
    return await axios.get(
      `${this.#BASE_URL + 'trending/movie/week'}`,
      searchParams
    );
  }

  async fetchMoviesGenres() {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
    };
    return await axios.get(
      `${this.#BASE_URL + 'genre/movie/list'}`,
      searchParams
    );
  }

  async fetchMoviesbyName(page = 1) {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page,
        query: this.query,
        include_adult: false,
      },
    };
    return await axios.get(`${this.#BASE_URL + 'search/movie'}`, searchParams);
  }

  async fetchIoMoviesbyName() {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page: this.page,
        query: this.query,
        include_adult: false,
      },
    };
    return await axios.get(`${this.#BASE_URL + 'search/movie'}`, searchParams);
  }

  async fetchIoTrendingMovies() {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page: this.page,
      },
    };
    return await axios.get(
      `${this.#BASE_URL + 'trending/movie/week'}`,
      searchParams
    );
  }

  async fetchMovieTrailerById(id) {
    const response = await fetch(
      `${this.#MOVIE_BASE_URL}${id}/videos?${
        this.#MOVIE_API_KEY
      }&language=en-US`
    );
    const { results } = await response.json();
    return results[0].key;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// =================================================
setGenre();
function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(
        GENRE_URL + '&with_genres=' + encodeURI(selectedGenre.join(','))
      );
    });
    tagsEl.append(t);
  });
}

// ===================================================

getMovies(GENRE_URL);

console.log(getMovies);

function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  data.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
  });
}
