import {
} from "./config";

// const AUTH_BASE_URL = `${API_URL}authentication/`;  // New base URL for authentication paths
// const LOGIN_URL = `${AUTH_BASE_URL}token/validate_with_login?api_key=${API_KEY}`;
// const REQUEST_TOKEN_URL = `${AUTH_BASE_URL}token/new?api_key=${API_KEY}`;
// const SESSION_ID_URL = `${AUTH_BASE_URL}session/new?api_key=${API_KEY}`;

// const defaultConfig = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// Types

export type MoviePropTypes = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  logo_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { name: string; id: number; logo_path: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type Movies = {
  page: number;
  results: MoviePropTypes[];
  total_pages: number;
  total_results: number;
};

export type Cast = {
  character: string;
  credit_id: string;
  name: string;
  profile_path: string;
};

export type Crew = {
  job: string;
  name: string;
  credit_id: number;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

/**
 * The API object provides methods to fetch movies, movie details, and credits from the movie database API.
 */
/**
 * The API object provides methods for fetching movies, movie details, credits, and authentication.
 */
const api = {
  /**
   * Fetches a list of movies based on the search term and page number.
   * @param searchTerm - The search term to filter movies.
   * @param page - The page number of the search results.
   * @returns A Promise that resolves to a Movies object.
   */
  fetchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    const endpoint = searchTerm
      ? `/api/movies?searchTerm=${searchTerm}&page=${page}`
      : `/api/movies?page=${page}`;

    return await (await fetch(endpoint)).json();
  },
  /**
   * Fetches details of a specific movie.
   * @param movieId - The ID of the movie to fetch.
   * @returns A Promise that resolves to a Movie object.
   */
  fetchMovie: async (movieId: string): Promise<MoviePropTypes> => {
    const response = await fetch('/api/movie/' + movieId); // This is a mock API
    const movie = await response.json();
    return movie;
  },
  /**
   * Fetches the credits for a specific movie.
   * @param movieId - The ID of the movie to fetch credits for.
   * @returns A Promise that resolves to a Credits object.
   */
  fetchCredits: async (movieId: string): Promise<Credits> => {
    const response = await fetch(`/api/credits/${movieId}`); // This is a mock API
    const credits = await response.json();
    return credits;
  },
  // Bonus material below for login
  /**
   * Fetches a request token for authentication.
   * @returns A Promise that resolves to a request token.
   */
  // getRequestToken: async () => {
  //   const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
  //   return reqToken.request_token;
  // },
  /**
   * Authenticates the user with the provided request token, username, and password.
   * @param requestToken - The request token for authentication.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to a session ID.
   */
  // authenticate: async (
  //   requestToken: string,
  //   username: string,
  //   password: string
  // ) => {
  //   const bodyData = {
  //     username,
  //     password,
  //     request_token: requestToken,
  //   };
  //   // First authenticate the requestToken
  //   const data = await (
  //     await fetch(LOGIN_URL, {
  //       ...defaultConfig,
  //       body: JSON.stringify(bodyData),
  //     })
  //   ).json();
  //   // Then get the sessionId with the requestToken
  //   if (data.success) {
  //     const sessionId = await (
  //       await fetch(SESSION_ID_URL, {
  //         ...defaultConfig,
  //         body: JSON.stringify({ request_token: requestToken }),
  //       })
  //     ).json();
  //     return sessionId;
  //   }
  // },
};

export default api;
