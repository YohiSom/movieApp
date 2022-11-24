import React from "react";
import { Movies } from "../../assets/interfaces";
import { FiHeart } from "react-icons/fi";

interface Props {
  movie: Movies;
  selectFavourite: () => void;
}

const MovieDetail: React.FC<Props> = ({ movie, selectFavourite }) => {
  const { title, director, producer, release_date, opening_crawl, episode_id } =
    movie;

  return (
    <div>
      <div> {title}</div>
      <div> {director}</div>
      <div> {producer}</div>
      <div> {release_date}</div>
      <div> {opening_crawl}</div>
      <div onClick={selectFavourite}>{<FiHeart />}</div>
    </div>
  );
};

export default MovieDetail;
