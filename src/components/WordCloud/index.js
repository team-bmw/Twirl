import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = () => {
  // the data should be replaced by another argument in props, passed by Redux
  const data = [
    { text: 'hello', value: 30 },
    { text: 'world', value: 12.5 },
    { text: 'github', value: 10 },
    { text: 'code', value: 10 },
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactWordcloud options={{ fontSizes: [50, 100] }} words={data} />
    </div>
  );
};

export default WordCloud;
