import React, { useState, useEffect } from 'react';
// import WordcloudFullScreen from './WordcloudFullScreen';
import ReactWordcloud from 'react-wordcloud';
import { connect } from 'react-redux';
import Loading from './Loading';

import { useTheme } from '@material-ui/styles';

const WordCloud = props => {
  // the data should be replaced by another argument in props, passed by Redux
  const theme = useTheme();
  console.log(theme);

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

  const {
    typography,
    palette: { text, grey },
  } = theme;
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
        <ReactWordcloud
          words={wordData}
          options={{
            colors: [grey['50'], text.secondary, text.hint, text.disabled],
            fontFamily: typography.body1.fontFamily,
            fontSizes: [10, 90],
            fontStyle: 'normal',
            fontWeight: 'normal',
            padding: 1,
            rotations: 0,
            scale: 'log',
            spiral: 'rectangular',
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(WordCloud);
