import React from "react";
import Home from "./pages/Home";
import ActivityDetail from "./pages/ActivityDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const urlAPI = "http://localhost:3000/activities";

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home urlAPI={urlAPI}/>} />
          <Route path="/activity/:id" element={<ActivityDetail urlAPI={urlAPI}/>} />
          <Route path="*" element={<div>Page not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
