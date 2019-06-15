import React from 'react';
import { connect } from 'react-redux';
import { updateSortBy } from '../reducers/sortReducer';
import { updateSelectedTweets } from '../reducers/tweetsReducer';
import { sortTweets } from '../helperFunctions';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        color: 'white',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SortTweets = ({ selectedTweets, updateSelectedTweets }) => {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        sortBy: '',
    });

    const handleChange = ({ target }) => {
        setValues(oldValues => ({
            ...oldValues,
            [target.name]: target.value,
        }));
        updateSelectedTweets(sortTweets(selectedTweets, target.value, false));
        emptySelectedTweets();
    }

    return (
        <div>
            {
                selectedTweets.length > 0 ?
                    <div>
                        <form className={classes.root} autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="sortBy-simple">Sort By</InputLabel>
                                <Select
                                    value={values.sortBy}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'sortBy',
                                        id: 'sortBy-simple',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="numRetweets">Number of Retweets</MenuItem>
                                    <MenuItem value="numFollowers">Number of Followers</MenuItem>
                                    <MenuItem value="isVerified">Verified Users</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </div>
                    : null
            }
        </div >
    )
}

const mapStateToProps = ({ tweets }) => {
    return {
        selectedTweets: tweets.selectedTweets.filter(tweet => !tweet.isRetweet),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSortBy: sortBy => dispatch(updateSortBy(sortBy)),
        updateSelectedTweets: tweets => dispatch(updateSelectedTweets(tweets)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortTweets);
