import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  //http://localhost:3000/888
  //movieId 얻기
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  //해당 movieId의 데이터 가져오기
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      );
      console.log(response.data);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null;
  return (
    <section>
      <img
        className="modal__poster"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="modal__poster-img"
      ></img>
    </section>
  );
};

export default DetailPage;
