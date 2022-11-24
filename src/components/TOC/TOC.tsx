import React, { useState, useEffect } from "react";
import { moviesApi } from "../../API/api";
import { Movies } from "../../assets/interfaces";
import "./TOC.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MovieDetail from "../movieDetail/MovieDetail";

const TOC: React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favouriteMovie, setFavouriteMovie] = useState<Movies[]>([]);

  const [movie, setMovie] = useState<Movies>();

  let localStorageFavourites: Movies[];

  const getAllMovies = async () => {
    try {
      const res = await moviesApi();

      const movies = res.map((el: {}) => ({ ...el, isFavourite }));
      setMovie(movies[0]);
      setMovies(movies);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  console.log(movies);

  const onSelectMovie = (id: number) => {
    // console.log(id);
    const selectedMovie = movies.find((el) => el.episode_id == id);

    setMovie(selectedMovie);
  };

  const selectFavourite = () => {
    setFavouriteMovie([...favouriteMovie, movie]);
  };

  console.log(movie);

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
