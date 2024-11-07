import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTimer from "../hooks/useTimer";
import PropTypes from "prop-types";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, loading, error] = useFetch(`http://localhost:3000/activities/${id}`);
  const { formattedTime, startTimer, stopTimer, resetTimer } = useTimer();

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">
          <i className="bi bi-calendar-check me-2"></i>
          {data.title}
        </h2>
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Description:</h5>
          <p className="card-text">{data.description}</p>
        </div>
      </div>

      <div className="card border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-stopwatch me-2"></i>
            Activity Timer
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="display-4 fw-bold text-primary">
              {formattedTime}
            </h2>
          </div>
          
          <div className="d-flex justify-content-center gap-2">
              <button 
                className="btn btn-success" 
                onClick={startTimer}
              >
                <i className="bi bi-play-fill me-2"></i>
                Start
              </button>
              <button 
                className="btn btn-warning" 
                onClick={stopTimer}
              >
                <i className="bi bi-pause-fill me-2"></i>
                Pause
              </button>
            <button 
              className="btn btn-danger" 
              onClick={resetTimer}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;