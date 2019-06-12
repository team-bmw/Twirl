import React, { Fragment } from 'react';

import Typography from '@material-ui/core/Typography';

import Typing from './Typing';
import Banner from './Banner';

const Main = () => {
  return (
    <Fragment>
      <div
        style={{
          width: '100%',
          height: '90vh',
          padding: '3rem 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '80%',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Typography
            variant="h2"
            style={{ color: 'white', fontWeight: 'normal' }}
            align="center"
          >
            Understand. Manage. Improve
          </Typography>
          <Typing />
        </div>
        <Banner />
      </div>
    </Fragment>
  );
};

export default Main;
