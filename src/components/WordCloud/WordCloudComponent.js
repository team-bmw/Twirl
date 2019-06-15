import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import ReactWordcloud from 'react-wordcloud';

import { useTheme } from '@material-ui/styles';

import { updateSelectedTweets } from '../../reducers/tweetsReducer';
import { selectedWordElement } from '../../reducers/wordElementReducer';

import WordPopover from './WordPopover';


const WordCloudComponent = props => {
  const { wordData, updateSelectedTweets, selectedWordElement } = props;
  const theme = useTheme();
  const {
    typography,
    palette: { text, grey },
  } = theme;

  const callbacks = {
    onWordClick: (word, index, textArr) => {
      // console.log(word);
      // console.log(index, textArr);
      console.log(textArr[index])
      const { tweetData } = word;
      updateSelectedTweets(tweetData);
      selectedWordElement(textArr[index]);
    },
    getWordColor: ({ tweetData }) => {
      const sentimentSum = tweetData.reduce((sum, { sentiment }) => {
        sum += sentiment;
        return sum;
      }, 0);
      const sentimentAverage = sentimentSum / tweetData.length;

      if (sentimentAverage > 1) return grey['50'];
      else if (sentimentAverage > 0.7) return grey['200'];
      else if (sentimentAverage > 0.4) return grey['400'];
      else if (sentimentAverage > 0) return grey['700'];
      else return grey['900'];
    },
  };

  return (
    <Fragment>
      <ReactWordcloud
        words={wordData}
        options={{
          colors: [grey['50'], text.secondary, text.hint, text.disabled],
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

const mapStateToProps = state => state;

export default connect(
  null,
  { updateSelectedTweets, selectedWordElement }
)(WordCloudComponent);
