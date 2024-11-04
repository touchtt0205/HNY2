// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import WishPage from "./pages/WishPage";
import TimePage from "./pages/TimePage";
import Moment from "./pages/Moment"; // Import the new Moment page
import Playlist from "./pages/Playlist"; // Import the new Playlist page

const App: React.FC = () => {
  return (
    <Router basename="/HNY2">
      {" "}
      {/* Set the basename here */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishes" element={<WishPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/moment" element={<Moment />} />{" "}
          {/* Add the route for Moment */}
          <Route path="/playlist" element={<Playlist />} />{" "}
          {/* Add the route for Playlist */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
