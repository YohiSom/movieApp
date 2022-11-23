import React, { useState, useEffect } from "react";
import { moviesApi } from "../../API/api";
import { Movies } from "../../assets/interfaces";
import "./TOC.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const TOC: React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllMovies = async () => {
    try {
      const res = await moviesApi();
      setMovies(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  if (isLoading || movies === undefined) return <div>Loading...</div>;

  return (
    <div className="movies-list">
      {movies.map((movie) => {
        return (
          <div key={movie.episode_id}>
            <div className="movie">
              <div className="star">
                <AiOutlineStar />
              </div>
              <div className="hover-movie"> {movie.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TOC;
