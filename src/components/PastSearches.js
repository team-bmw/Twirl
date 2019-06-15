/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { selectSearchId } from '../reducers/searchesReducer';
import { fetchAdjectiveWordcloudData } from '../reducers/wordcloudReducer';
import { emptySelectedTweets } from '../reducers/tweetsReducer';

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

const PastSearches = ({ selectSearchId, fetchAdjectiveWordcloudData, searches, emptySelectedTweets }) => {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        search_id: '',
    });

    const handleChange = ({ target }) => {
        setValues(oldValues => ({
            ...oldValues,
            [target.name]: target.value,
        }));
        selectSearchId(Number(target.value));
        fetchAdjectiveWordcloudData(Number(target.value));
        emptySelectedTweets();
    }

    return (
        <div>
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="id-simple">Past Searches</InputLabel>
                    <Select
                        value={values.search_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'search_id',
                            id: 'id-simple',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {searches.searches.map(search => {
                            return (
                                <MenuItem key={search.search_id} value={search.search_id}>{search.query}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </form>
        </div>
    )
}

const mapStateToProps = ({ searches }) => {
    return {
        searches,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectSearchId: search_id => dispatch(selectSearchId(search_id)),
        fetchAdjectiveWordcloudData: search_id => dispatch(fetchAdjectiveWordcloudData(search_id)),
        emptySelectedTweets: () => dispatch(emptySelectedTweets()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PastSearches);

