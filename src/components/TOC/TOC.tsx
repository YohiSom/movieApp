import React, { useState, useEffect } from "react";
import { moviesApi } from "../../API/api";
import { Movies } from "../../assets/interfaces";
import "./TOC.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MovieDetail from "../movieDetail/MovieDetail";
import { json } from "stream/consumers";

const TOC: React.FC = () => {
  const localStorageFavourites = JSON.parse(
    localStorage.getItem("favouriteMovies") || "[]"
  );
  const [movies, setMovies] = useState<Movies[]>([]);
  //   const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favouriteMovie, setFavouriteMovie] = useState<any[]>(
    localStorageFavourites || []
  );

  const [movie, setMovie] = useState<Movies | undefined>(movies[0] || null);

  const getAllMovies = async () => {
    try {
      const res = await moviesApi();

      let moviesArray = [];
      if (favouriteMovie.length > 0) {
        for (let i = 0; i < favouriteMovie.length; i++) {
          const isFavourite = true;

          for (let j = 0; j < res.length; j++) {
            if (favouriteMovie[i].movieId === res[j].episode_id) {
              res[j] = { ...res[j], isFavourite };
            }

            moviesArray.push(res[j]);
          }
        }
      }

      //   const movies = res.map((el: {}) => ({ ...el, isFavourite }));

      setMovies(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, [favouriteMovie]);

  //   const checkForFavourite = () => {
  //     if (favouriteMovie.length > 0) {

  //         const newMoviesArr = []
  //         for (let i = 0; i < favouriteMovie.length; i++) {

  //             const noFavourite = movies.filter((el)=> el.isFavourite !== favouriteMovie[i].movieId)
  //             const favourites = movies.filter((el)=> el.isFavourite == favouriteMovie[i].movieId)

  //             newMoviesArr.push(noFavourite, favourites)
  //         //   for (let j = 0; j < movies.length; j++) {
  //         //     if (favouriteMovie[i].movieId == movies[j].episode_id) {

  //         //     }
  //         //   }
  //         }

  //       }
  //   }

  useEffect(() => {
    if (movies && movie == null) {
      setMovie(movies[0]);
    }
  }, [movies]);

  console.log(movie);

  const onSelectMovie = (id: number) => {
    const selectedMovie = movies.find((el) => el.episode_id == id);
    setMovie(selectedMovie);
  };

  const selectFavourite = () => {
    const movieId = movie?.episode_id;
    setFavouriteMovie([...favouriteMovie, { movieId, isFavourite: true }]);
  };

  useEffect(() => {
    if (favouriteMovie.length !== 0)
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovie));

    // if (localStorageFavourites.length === 0 || !localStorageFavourites) {
    //   setFavouriteMovie([]);
    // }
  }, [favouriteMovie]);

  const unselectFavourite = () => {
    const movieId = movie?.episode_id;

    const filterUnselectedMovie = favouriteMovie.filter(
      (el) => el.movieId !== movieId
    );
    setFavouriteMovie(filterUnselectedMovie);
  };

  if (isLoading || movies === undefined || movie === null)
    return <div>Loading...</div>;

  return (
    <div className="movie-wrapper">
      <div className="movies-list">
        <div>Table of Movies</div>
        {movies.map((movie) => {
          return (
            <div key={movie.episode_id}>
              <div className="movie">
                <div className="star">
                  {movie.isFavourite && <AiOutlineStar />}
                </div>
                <div
                  className="hover-movie"
                  onClick={() => onSelectMovie(movie.episode_id)}
                >
                  {" "}
                  {movie.title}
                </div>
              </div>
            </div>
          );
        })}{" "}
      </div>
      <div className="movie-detail">
        {movie && (
          <MovieDetail
            movie={movie}
            selectFavourite={selectFavourite}
            favouriteMovie={favouriteMovie}
            unselectFavourite={unselectFavourite}
          />
        )}
      </div>
    </div>
  );
};

export default TOC;
