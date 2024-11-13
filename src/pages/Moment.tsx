import { useNavigate } from "react-router-dom";
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

const Moment: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="moment">
      <h1>Moments</h1>
      <p>This is the Moments page.</p>

      {/* Corkboard background */}
      <div className="board">
        {[
          { src: img1, caption: "Image 1" },
          { src: img2, caption: "Image 2" },
          { src: img3, caption: "Image 3" },
          { src: img4, caption: "Image 4" },
          { src: img5, caption: "Image 5" },
          { src: img6, caption: "Image 6" },
          { src: img7, caption: "Image 7" },
          { src: img8, caption: "Image 8" },
          { src: img9, caption: "Image 9" },
          { src: img10, caption: "Image 10" },
          { src: img11, caption: "Image 11" },
          { src: img12, caption: "Image 12" },
        ].map((image, index) => (
          <div className="item" key={index}>
            <div className="polaroid" >
              <img src={image.src} alt={image.caption} />
              <div className="caption">{image.caption}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>x</button>

     
    </div>
  );
};

export default Moment;
