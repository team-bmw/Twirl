import React from 'react';
import Typography from '@material-ui/core/Typography';

const Banner = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '150px',
        backgroundColor: 'white',
        opacity: '0.6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#1565c0',
        padding: '1rem',
      }}
    >
      <Typography variant="h6">
        A web-based platform for understanding and interacting with Tweets
      </Typography>
    </div>
  );
};

export default Banner;
