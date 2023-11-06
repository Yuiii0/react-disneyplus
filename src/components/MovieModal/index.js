import React, { useRef } from "react";
import "./MovieModal.css";
import useOnClickOutSide from "../../hooks/useOnClickOutside";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  vote_average,
  firtst_air_date,
  setModalOpen,
}) => {
  //modal DOM요소를 잡아주기 위해 useRef객체 생성
  const ref = useRef();

  //useOnClickOutSide Hook 호출
  useOnClickOutSide(ref, () => {
    setModalOpen(false);
  });
  return (
    <div className="presentation" role="presentation">
      <div className="wraper-modal">
        <div className="modal" ref={ref}>
          <span className="modal__close" onClick={() => setModalOpen(false)}>
            X
          </span>
          <img
            className="modal__poster"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-img"
          />
          <div className="modal__contents">
            <p className="modal__details">
              <span className="modal__user_spec">100% for you</span>
              {release_date ? release_date : firtst_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점:{vote_average}</p>
            <p lassName="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
