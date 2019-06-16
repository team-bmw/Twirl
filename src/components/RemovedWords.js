import React from 'react';
import { connect } from 'react-redux';
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

const RemovedWords = ({ removedWords }) => {

    const classes = useStyles();

    const handleDelete = word => {
        console.log(word.text);
    }

    return (
        <Grid>
            {removedWords ? removedWords.map(word => {
                return (
                    <Chip
                        key={word.text}
                        label={word.text}
                        onDelete={() => handleDelete(word)}
                        className={classes.chip}
                        color="primary"
                    />
                )
            }) : null}
        </Grid>
    )
}

const mapStateToProps = ({ removedWords }) => {
    return {
        removedWords,
    }
}

export default connect(mapStateToProps)(RemovedWords);
