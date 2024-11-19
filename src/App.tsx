// src/App.tsx
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import WishPage from "./pages/WishPage";
import TimePage from "./pages/TimePage";
import Moment from "./pages/Moment";
import Playlist from "./pages/Playlist";
import EnvelopePage from "./pages/EnvelopePage";
import Ticket  from "./pages/TicketData";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishes" element={<WishPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/moment" element={<Moment />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/envelope" element={<EnvelopePage />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
