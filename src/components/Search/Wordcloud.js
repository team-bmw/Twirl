import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ReactWordcloud from 'react-wordcloud';

import { useTheme } from '@material-ui/styles';

import {
  selectWordElement,
  selectCloudWord,
} from '../../reducers/wordElementReducer';

import WordPopover from './WordPopover';

const Wordcloud = props => {
  const { wordData, selectWordElement, selectCloudWord } = props;
  const theme = useTheme();
  const {
    typography,
    palette: { grey, blue },
  } = theme;

  const callbacks = {
    onWordClick: (word, index, textArr) => {
      selectWordElement(textArr[index]);
      selectCloudWord(word);
    },
    getWordColor: ({ tweetData }) => {
      const sentimentSum = tweetData.reduce((sum, { sentiment }) => {
        sum += sentiment;
        return sum;
      }, 0);
      const sentimentAverage = sentimentSum / tweetData.length;

      if (sentimentAverage > 0.8) return grey['50'];
      else if (sentimentAverage > 0.6) return blue['100'];
      else if (sentimentAverage > 0.4) return blue['300'];
      else if (sentimentAverage > 0.2) return blue['700'];
      else return blue['900'];
    },
  };

  return (
    <Fragment>
      <ReactWordcloud
        words={wordData}
        options={{
          fontFamily: typography.body1.fontFamily,
          fontSizes: [25, 130],
          fontStyle: 'normal',
          fontWeight: 700,
          padding: 1,
          rotations: 0,
          scale: 'log',
          spiral: 'rectangular',
          deterministic: true,
        }}
        callbacks={callbacks}
      />

      <WordPopover />
    </Fragment>
  );
};

export default connect(
  null,
  { selectWordElement, selectCloudWord }
)(Wordcloud);
