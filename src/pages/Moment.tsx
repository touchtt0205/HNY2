import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Moment.css';

// Import images directly
import img1 from '../image/1.png';
import img2 from '../image/2.png';
import img3 from '../image/3.png';
import img4 from '../image/4.png';
import img5 from '../image/5.png';
import img6 from '../image/6.png';
import img7 from '../image/7.png';
import img8 from '../image/8.png';
import img9 from '../image/9.png';
import img10 from '../image/10.png';
import img11 from '../image/11.png';
import img12 from '../image/12.png';

import song from '../song/spotifydown.com - เพลงรัก.mp3';

const Moment: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    if (audio && isPlaying) {
      audio.play().catch((error) => {
        console.log('Auto-play blocked: ', error);
      });
    }
  }, [isPlaying]); // เมื่อ isPlaying เปลี่ยนค่า, useEffect จะทำงานใหม่

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="moment-container">
      <h1 className="moment-title">Moments</h1>
      <p className="moment-des">This is the Moments page.</p>

      {/* Corkboard background */}
      <div className="board">
        {[ 
          { src: img11, caption: 'November ❤️' },
          { src: img12, caption: 'December ❤️' },
          { src: img1, caption: 'January ❤️' },
          { src: img2, caption: 'February ❤️' },
          { src: img3, caption: 'March ❤️' },
          { src: img4, caption: 'April ❤️' },
          { src: img5, caption: 'May ❤️' },
          { src: img6, caption: 'June ❤️' },
          { src: img7, caption: 'July ❤️' },
          { src: img8, caption: 'August ❤️' },
          { src: img9, caption: 'September ❤️' },
          { src: img10, caption: 'October ❤️' },
          
        ].map((image, index) => (
          <div className="item" key={index}>
            <div className="polaroid">
              <img src={image.src} alt={image.caption} />
              <div className="caption">{image.caption}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Player - no controls, hidden */}
      <div className="audio-player">
        <audio 
          id="audio-player" 
          autoPlay 
          loop 
          style={{ display: 'none' }} // Hide the audio player completely
        >
          <source src={song} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Vinyl Record Animation */}
      <div className="vinyl-record">
        <div className={`record ${isPlaying ? 'spinning' : ''}`}></div>
      </div>

      <div className="centered-button-container">
        <button className="back-button-moment" onClick={handleBack}>
        <svg viewBox="0 0 2050 2050" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24" height="24">
          <path d="M1582.2,1488.7a44.9,44.9,0,0,1-36.4-18.5l-75.7-103.9A431.7,431.7,0,0,0,1121.4,1189h-60.1v64c0,59.8-33.5,112.9-87.5,138.6a152.1,152.1,0,0,1-162.7-19.4l-331.5-269a153.5,153.5,0,0,1,0-238.4l331.5-269a152.1,152.1,0,0,1,162.7-19.4c54,25.7,87.5,78.8,87.5,138.6v98.3l161,19.6a460.9,460.9,0,0,1,404.9,457.4v153.4a45,45,0,0,1-45,45Z"></path>
        </svg>
      </button>
      </div>

    </div>
  );
};

export default Moment;
