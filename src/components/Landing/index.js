import React from 'react';

import Navbar from './Navbar';
import BackgroundVideo from './BackgroundVideo';
import Main from './Main';

const Landing = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Navbar />
      <BackgroundVideo />
      <Main />
    </div>
  );
};

export default Landing;
