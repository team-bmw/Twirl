import React, { useState, useEffect } from 'react';
import WordCloudComponent from './WordCloudComponent';
import { connect } from 'react-redux';

import Loading from './Loading';
import Input from '../Common/Input';
import Message from '../Common/Message';

import { makeStyles } from '@material-ui/styles';
import EmbeddedTweets from '../EmbeddedTweets';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: '1rem 2rem 2rem 2rem',
  },
  input: {
    margin: '1rem 0',
  },
  button: {
    backgroundColor: theme.palette.secondary.contrastText,
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
}));

const WordCloud = props => {
  const classes = useStyles();

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeigh] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeigh(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const {
    wordcloudData: { status, wordData },
  } = props;

  return (
    <div>
      <div
        style={{
          height: height,
          width: width,
        }}
        className={classes.root}
      >
        <div style={{ height: '70%', display: 'flex' }}>
          <div style={{ width: '95%' }}>
            <div className={classes.input}>
              <Input />
            </div>
            {status === 'initial' && <Message message="Please enter data" />}
            {status === 'failed' && (
              <Message message="Data fetched unsuccessfully. Please try again." />
            )}
            {status === 'fetching' && <Loading />}
            {status === 'fetched' && <WordCloudComponent wordData={wordData} />}
          </div>
        </div>
      </div>
      <EmbeddedTweets />
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(WordCloud);
