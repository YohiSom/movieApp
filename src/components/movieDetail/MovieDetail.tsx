import React, { useEffect, useState } from "react";
import { Movies } from "../../assets/interfaces";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

interface Props {
  movie: Movies;
  selectFavourite: () => void;
  favouriteMovie: any[];
  unselectFavourite: () => void;
}

const MovieDetail: React.FC<Props> = ({
  movie,
  selectFavourite,
  favouriteMovie,
  unselectFavourite,
}) => {
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const { title, director, producer, release_date, opening_crawl, episode_id } =
    movie;

  const doesFavouriteExist = favouriteMovie.find(
    (el) => el.movieId === episode_id
  );

  useEffect(() => {
    // const doesFavouriteExist = favouriteMovie.find(
    //   (el) => el.movieId === episode_id
    // );
    if (!doesFavouriteExist) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  }, [favouriteMovie, movie]);

  return (
    <div>
      <div> {title}</div>
      <div> {director}</div>
      <div> {producer}</div>
      <div> {release_date}</div>
      <div> {opening_crawl}</div>
      {isFavourite ? (
        <div onClick={unselectFavourite}>
          <FaHeart /> Click to removie from favourite
        </div>
      ) : (
        <div onClick={selectFavourite}>{<FiHeart />}</div>
      )}
    </div>
  );
};

export default MovieDetail;
