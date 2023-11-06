import axios from "../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal/index";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setmovieSelected] = useState({});

  //poster 클릭시
  function handleClick(movie) {
    //modal 띄우기
    setModalOpen(true);
    //어떤 movie를 선택했는지 정보 저장
    setmovieSelected(movie);
  }

  const fetchMoiveData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]); //url이 달라질때마다 새로운 fetchMoiveData 함수 생성해야하므로

  useEffect(() => {
    fetchMoiveData();
  }, [fetchMoiveData]); //함수가 달라질때마다 새롭게 sideEfffect처리해야하므로

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() =>
              (document.getElementById(id).scrollLeft -= window.innerWidth - 80)
            }
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            ></img>
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() =>
              (document.getElementById(id).scrollLeft += window.innerWidth - 80)
            }
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        //클릭된 movie정보를 전개해서 넘겨주고, x버튼 누르면 modalopen설정 가능하도록
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;
