import './App.css';
import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VideoPlayer from './components/VideoPlayer';
import TypingImage from './components/TypingImage';
import BackgroundPlayer from './components/BackgroundPlayer';
import './css/Transition.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <BackgroundPlayer />
      <TransitionGroup>
        <CSSTransition
          key={isPlaying ? 'video' : 'typing'}
          classNames="fade"
          timeout={300}
        >
          {isPlaying ? <VideoPlayer /> : <TypingImage />}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
