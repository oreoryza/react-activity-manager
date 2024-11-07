import React from "react";
import Home from "./pages/Home";
import ActivityDetail from "./pages/ActivityDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
