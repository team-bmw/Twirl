import React, { Component } from 'react';
import VideoCover from 'react-video-cover';

class VideoBackground extends Component {
  render() {
    const videoOptions = {
      src:
        'https://static.videezy.com/system/resources/previews/000/036/096/original/AY121.mp4',
      autoPlay: true,
      loop: true,
      muted: true,
    };
    const style = {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      margin: 'auto',
      zIndex: -2,
      opacity: 0.5,
    };
    return (
      <div style={style}>
        <VideoCover
          videoOptions={videoOptions}
          remeasureOnWindowResize={true}
        />
      </div>
    );
  }
}
export default VideoBackground;
