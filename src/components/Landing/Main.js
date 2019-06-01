import React, { Fragment } from 'react';

import Typography from '@material-ui/core/Typography';

import Typing from './Typing';
import Input from './Input';
import Banner from './Banner';

const Main = () => {
  return (
    <Fragment>
      <div
        style={{
          width: '75%',
          minHeight: '250px',
          margin: '8rem auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
        <Input />
      </div>
      <Banner />
    </Fragment>
  );
};

export default Main;
