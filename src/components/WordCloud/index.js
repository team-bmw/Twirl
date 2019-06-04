import React from 'react';
import ReactWordcloud from 'react-wordcloud';
// import WordCloudFullScreen from './WordcloudFullScreen';
import { connect } from 'react-redux';

const WordCloud = props => {
  // the data should be replaced by another argument in props, passed by Redux

  const {
    wordcloudData: { status, wordData },
  } = props;
  return (
    <div style={{ width: '100%', height: '100%', marginTop: '10rem' }}>
      {status === 'initial' && <h1>Please enter data</h1>}
      {status === 'failed' && <h1>Failed</h1>}
      {status === 'fetching' && <h1>Fetching</h1>}
      {status === 'fetched' && (
        // <WordCloudFullScreen data={wordData} />
        <ReactWordcloud options={{ fontSizes: [50, 100] }} words={wordData} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(WordCloud);
