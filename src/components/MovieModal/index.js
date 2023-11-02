import React from "react";
import "./MovieModal.css";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  vote_average,
  firtst_air_date,
  setModalOpen,
  modalOpen,
}) => {
  return (
    <div className="presentation" role="presentation">
      <div className="wraper-modal">
        <div className="modal">
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
