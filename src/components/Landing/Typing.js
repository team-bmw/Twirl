import React from 'react';
import Typed from 'react-typed';
import { Typography } from '@material-ui/core';

const Typing = () => {
  return (
    <div
      style={{
        width: '100%',
        color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
      }}
    >
      {/* We should try querying the most grossing tweets into here */}
      <div style={{}}>
        I want to know:{' '}
        <Typed
          strings={[
            '#NewYorkKnicks',
            '#MeToo',
            '#DonaldTrump',
            '#GameOfThrones',
            '#AvengersEndgame',
          ]}
          typeSpeed={60}
          backSpeed={70}
          // attr="placeholder"
          loop
          style={{ color: '#0d47a1' }}
        >
          {/* <input type="text" style={{ minWidth: '10rem', padding: '1rem', }} /> */}
          {/* <input type="text" /> */}
        </Typed>
      </div>
    </div>
  );
};

export default Typing;
