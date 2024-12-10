import React from 'react';
import Typewriter from 'typewriter-effect';
import '../css/TypingImage.css';

const VideoPlayer = () => {
  return (
    <div>
      {/* This video url is not available. https://media.gettyimages.com/videos/goodlooking-young-woman-in-casual-clothing-is-painting-in-workroom-video-id1069900546 */}    
      <div className="video-container">
        <video
          className="video-player"
          style={{width: 1600,height: 900}}
          autoPlay
          muted
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="text-overlay">
        <Typewriter
          options={{
            strings: ['Here comes the video!'],
            autoStart: true,
            loop: false,
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;