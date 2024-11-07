import React, { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const Home = ({urlAPI}) => {
  const [showModal, setShowModal] = useState(false);

  const [activities, loading, error, refetchData] = useFetch(urlAPI);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Daily Activity Manager</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Add Activity
      </button>
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ActivityList 
          activities={activities} 
          refetch={refetchData}
          urlAPI={urlAPI}
        />
      )}
      <ActivityForm 
        showModal={showModal} 
        setShowModal={setShowModal}
        refetch={refetchData}
        urlAPI={urlAPI}
      />
    </div>
  );
};

Home.propTypes = {
  urlAPI: PropTypes.string.isRequired
};

export default Home;