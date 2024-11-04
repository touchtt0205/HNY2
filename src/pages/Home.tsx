// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faClock,
  faPhotoVideo,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css"; // Import the CSS file

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Wish App!</h1>
      <div className="card-container-home">
        {/* Square Card for Wishes */}
        <div className="card-home">
          <Link to="/wishes">
            <FontAwesomeIcon
              icon={faGift}
              className="card-icon text-blue-500"
            />
            <p className="card-title">Wishes</p>
          </Link>
        </div>
        {/* Square Card for Time */}
        <div className="card-home">
          <Link to="/time">
            <FontAwesomeIcon
              icon={faClock}
              className="card-icon text-green-500"
            />
            <p className="card-title">Time</p>
          </Link>
        </div>
        {/* Square Card for Moments */}
        <div className="card-home">
          <Link to="/moment">
            <FontAwesomeIcon
              icon={faPhotoVideo}
              className="card-icon text-red-500"
            />
            <p className="card-title">Moments</p>
          </Link>
        </div>
        {/* Square Card for Playlist */}
        <div className="card-home">
          <Link to="/playlist">
            <FontAwesomeIcon
              icon={faMusic}
              className="card-icon text-purple-500"
            />
            <p className="card-title">Playlist</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
