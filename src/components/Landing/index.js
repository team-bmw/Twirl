import React from 'react';

import BackgroundVideo from './BackgroundVideo';
import Main from './Main';

const Landing = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <BackgroundVideo />
      <Main />
    </div>
  );
};

export default Landing;
