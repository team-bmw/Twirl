import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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

const RemovedWords = ({ removedWords }) => {

    const classes = useStyles();

    return (
        <div>
            {removedWords ? removedWords.map(word => {
                return (
                    <div>{word}</div>
                )
            }) : null}
        </div>
    )
}

const mapStateToProps = ({ removedWords }) => {
    return {
        removedWords,
    }
}

export default connect(mapStateToProps)(RemovedWords);