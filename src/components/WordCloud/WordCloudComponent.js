import React from 'react';
import { connect } from 'react-redux';

import ReactWordcloud from 'react-wordcloud';
import { useTheme } from '@material-ui/styles';

import { updateSelectedIds } from '../../reducers/tweetsReducer';

const WordCloudComponent = props => {
  const { wordData, updateSelectedIds } = props;
  const theme = useTheme();
  const {
    typography,
    palette: { text, grey },
  } = theme;

  const callbacks = {
    onWordClick: word => {
      const { tweetData } = word;
      updateSelectedIds(tweetData);
    },
  };

  console.log(props);

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
      callbacks={callbacks}
    />
  );
};

const mapStateToProps = state => state;

export default connect(
  null,
  { updateSelectedIds }
)(WordCloudComponent);
