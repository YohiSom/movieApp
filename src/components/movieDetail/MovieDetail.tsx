import React, { useEffect, useState } from "react";
import { Movies } from "../../assets/interfaces";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import "./movieDetail.css";

interface Props {
  movie: Movies;
  selectFavourite: () => void;
  favouriteMovie: any[];
  favouriteLoader: boolean;
  unselectFavourite: () => void;
}

const MovieDetail: React.FC<Props> = ({
  movie,
  selectFavourite,
  favouriteMovie,
  unselectFavourite,
  favouriteLoader,
}) => {
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const { title, director, producer, release_date, opening_crawl, episode_id } =
    movie;

  const doesFavouriteExist = favouriteMovie.find(
    (el) => el.movieId === episode_id
  );

  useEffect(() => {
    if (!doesFavouriteExist) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  }, [favouriteMovie, movie]);

  return (
    <div>
      <div className="detail">
        {" "}
        <span className="title">Title:</span> {title}
      </div>
      <div className="detail">
        {" "}
        <span className="title">Director:</span> {director}
      </div>
      <div className="detail">
        {" "}
        <span className="title">Producer:</span> {producer}
      </div>
      <div className="detail">
        <span className="title">Release Date:</span> {release_date}
      </div>
      <div className="detail-plot">
        <span className="title">Plot:</span> {opening_crawl}
      </div>
      {isFavourite && !favouriteLoader && (
        <div onClick={unselectFavourite}>
          <FaHeart /> Click to remove from favourites
        </div>
      )}
      {!isFavourite && !favouriteLoader && (
        <div onClick={selectFavourite}>
          <FiHeart /> Add this movie to your favourites
        </div>
      )}
      <div className="spinner-wrapper">
        {favouriteLoader && <div className="spinner"></div>}
      </div>
    </div>
  );
};

export default MovieDetail;
