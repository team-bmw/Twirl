/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { updateSortBy } from '../reducers/sortReducer';
import { updateSelectedTweets } from '../reducers/tweetsReducer';
import { sortTweets } from '../helperFunctions';

class SortTweets extends React.Component {

    constructor() {
        super();
        this.state = {
            sortBy: '',
        }
    }

    handleSelect = ({ target }) => {
        this.setState({ sortBy: target.value });
    }

    handleSubmit = evt => {
        evt.preventDefault();
        const { updateSelectedTweets, updateSortBy, selectedTweets } = this.props;
        updateSortBy(this.state.sortBy);
        updateSelectedTweets(sortTweets(selectedTweets, this.state.sortBy, false));
    }

    render() {
        const { selectedTweets } = this.props;
        return (
            <div>
                {
                    selectedTweets.length > 0 ?
                        <div>
                            <select name="sortBy" onChange={this.handleSelect}>
                                <option value="numRetweets">Number of Retweets</option>
                                <option value="numFollowers">Number of Followers</option>
                                <option value="numFriends">Number of Friends</option>
                                <option value="userVerified">Verified Users</option>
                            </select>
                            <button type="submit" onClick={this.handleSubmit}>
                                Sort
                            </button>
                        </div>
                        : null
                }
            </div >
        )
    }
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
