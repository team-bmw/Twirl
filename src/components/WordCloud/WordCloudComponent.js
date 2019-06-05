import React from 'react';

import ReactWordcloud from 'react-wordcloud';
import { useTheme } from '@material-ui/styles';

const WordCloudComponent = ({ wordData }) => {
  const theme = useTheme();
  const {
    typography,
    palette: { text, grey },
  } = theme;

  return (
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
  );
};

export default WordCloudComponent;
