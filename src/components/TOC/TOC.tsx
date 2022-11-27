import React, { useState, useEffect } from "react";
import { moviesApi } from "../../API/api";
import { Movies } from "../../assets/interfaces";
import "./TOC.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MovieDetail from "../movieDetail/MovieDetail";
import DarthVader from "../../assets/Star_Wars-Logo.wine.svg";

const TOC: React.FC = () => {
  const localStorageFavourites = JSON.parse(
    localStorage.getItem("favouriteMovies") || "[]"
  );
  const [movies, setMovies] = useState<Movies[]>([]);
  // const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favouriteLoader, setFavouriteLoader] = useState<boolean>(true);
  const [favouriteMovie, setFavouriteMovie] = useState<any[]>(
    localStorageFavourites || []
  );
  const [error, setError] = useState<string>("");

  const [movie, setMovie] = useState<Movies | undefined>(movies[0] || null);

  const getAllMovies = async () => {
    try {
      setFavouriteLoader(true);
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

      setMovies(res);
      setIsLoading(false);
      setFavouriteLoader(false);
    } catch (err: any) {
      const message = err.message;
      setError(message);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, [favouriteMovie]);

  useEffect(() => {
    if (movies && movie == null) {
      setMovie(movies[0]);
    }
  }, [movies]);

  console.log(movies);

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
  }, [favouriteMovie]);

  const unselectFavourite = () => {
    const movieId = movie?.episode_id;

    const filterUnselectedMovie = favouriteMovie.filter(
      (el) => el.movieId !== movieId
    );
    setFavouriteMovie(filterUnselectedMovie);
  };

  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.style.backgroundColor = "black";
  //   } else {
  //     document.body.style.backgroundColor = "white";
  //   }
  // }, [isLoading]);

  if (isLoading || movies === undefined || movie === null)
    return (
      <div className="loading">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
        {/* <img src={DarthVader} className="vader" /> */}
      </div>
    );

  if (error) return <div className="loading">{error}</div>;

  return (
    <div className="movie-wrapper">
      <div className="movies-list">
        {/* <div>Table of Movies</div> */}
        {movies.map((movie) => {
          return (
            <div key={movie.episode_id}>
              <div className="movie">
                <div className="star">
                  {movie.isFavourite && <AiOutlineStar />}
                </div>
                <div
                  className="hover-movie"
                  data-glitch={movie.title}
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
            favouriteLoader={favouriteLoader}
          />
        )}
      </div>
    </div>
  );
};

export default TOC;
