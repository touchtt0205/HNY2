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
    <div>
      <h1 className="moment-title">Moments</h1>
      <p className="moment-description">This is the Moments page.</p>

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

      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        x
      </button>
    </div>
  );
};

export default Moment;
