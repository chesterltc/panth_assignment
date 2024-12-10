import React from 'react';
import Typewriter from 'typewriter-effect';
import '../css/TypingImage.css';

const TypingImage = () => {
  return (
    <div className="image-container">
      <img
        src="https://miro.medium.com/max/1024/1*OK8xc3Ic6EGYg2k6BeGabg.jpeg"
        alt="Test"
        className="background-image"
      />
      <div className="text-overlay">
        <Typewriter
          options={{
            strings: ['This is a simple Javascript test'],
            autoStart: true,
            loop: false,
          }}
        />
      </div>
    </div>
  );
};

export default TypingImage;