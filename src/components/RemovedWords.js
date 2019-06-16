import React from 'react';
import { connect } from 'react-redux';

import { addWordToWordCloud, wordcloudDataSuccess } from '../reducers/wordcloudReducer';
import { deleteRemovedWord, emptyRemovedWords, addRemovedWord } from '../reducers/removedReducer';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

const RemovedWords = ({
    removedWords,
    wordCloudData,
    addWordToWordCloud,
    wordcloudDataSuccess,
    deleteRemovedWord,
    emptyRemovedWords,
    addRemovedWord }) => {

    const classes = useStyles();

    const handleDelete = word => {
        addWordToWordCloud(word);
        deleteRemovedWord(word);
    }

    const handleDeleteAll = () => {
        emptyRemovedWords();
    }

    const handleAddAll = () => {
        wordCloudData.forEach(word => addRemovedWord(word));
        wordcloudDataSuccess([]);
    }

    return (
        <Grid>
            {removedWords.length > 0 ?
                <div>
                    {removedWords.map(word => {
                        return (
                            <Chip
                                key={word.text}
                                label={word.text}
                                onDelete={() => handleDelete(word)}
                                className={classes.chip}
                                color="primary"
                            />
                        )
                    })}
                    <Chip
                        label="Clear All"
                        onDelete={handleDeleteAll}
                        className={classes.chip}
                        color="secondary"
                    />
                </div>
                : <Chip
                    label="Remove All"
                    onDelete={handleAddAll}
                    className={classes.chip}
                    color="secondary"
                />}

        </Grid>
    )
}

const mapStateToProps = ({ removedWords, wordCloudData }) => {
    return {
        removedWords,
        wordCloudData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addWordToWordCloud: word => dispatch(addWordToWordCloud(word)),
        deleteRemovedWord: word => dispatch(deleteRemovedWord(word)),
        emptyRemovedWords: () => dispatch(emptyRemovedWords()),
        addRemovedWord: word => dispatch(addRemovedWord(word)),
        wordcloudDataSuccess: wordCloudData => dispatch(wordcloudDataSuccess(wordCloudData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemovedWords);
