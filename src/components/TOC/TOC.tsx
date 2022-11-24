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
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favouriteMovie, setFavouriteMovie] = useState<any[]>(
    localStorageFavourites || []
  );

  const [movie, setMovie] = useState<Movies>();

  const getAllMovies = async () => {
    try {
      const res = await moviesApi();

      //   const movies = res.map((el: {}) => ({ ...el, isFavourite }));

      setMovies(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    if (movies) {
      setMovie(movies[0]);
    }
  }, [movies]);

  console.log(movies);

  const onSelectMovie = (id: number) => {
    // console.log(id);
    const selectedMovie = movies.find((el) => el.episode_id == id);

    setMovie(selectedMovie);
  };

  const selectFavourite = () => {
    const movieId = movie?.episode_id;
    setFavouriteMovie([...favouriteMovie, movieId]);
  };

  useEffect(() => {
    if (favouriteMovie.length !== 0)
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovie));
  }, [favouriteMovie]);

  //   console.log(movie);

  if (isLoading || movies === undefined) return <div>Loading...</div>;

  return (
    <div className="movie-wrapper">
      <div className="movies-list">
        <div>Table of Movies</div>
        {movies.map((movie) => {
          return (
            <div key={movie.episode_id}>
              <div className="movie">
                <div className="star">
                  {movie.isFavourite ? <AiFillStar /> : <AiOutlineStar />}
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
          <MovieDetail movie={movie} selectFavourite={selectFavourite} />
        )}
      </div>
    </div>
  );
};

export default TOC;
