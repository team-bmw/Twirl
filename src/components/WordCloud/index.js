import React, { useState, useEffect } from 'react';
import WordCloudComponent from './WordCloudComponent';
import { connect } from 'react-redux';
import Loading from './Loading';

import { useTheme } from '@material-ui/styles';

const WordCloud = props => {
  const theme = useTheme();

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
    <div
      style={{
        height: height,
        width: width,
        backgroundColor: theme.palette.primary.main,
        padding: '2rem',
      }}
    >
      {status === 'initial' && <h1 style={{ margin: 0 }}>Please enter data</h1>}
      {status === 'failed' && <h1>Failed</h1>}
      {status === 'fetching' && <Loading />}
      {status === 'fetched' && (
        <div style={{ height: '70%' }}>
          <WordCloudComponent wordData={wordData} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(WordCloud);
