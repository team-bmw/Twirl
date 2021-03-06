import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import {
  fetchAdjectiveWordcloudData,
  resetWordCloud,
} from '../../reducers/wordcloudReducer';
import { startLoading } from '../../reducers/loadingReducer';
import { emptySelectedTweets } from '../../reducers/tweetsReducer';
import { fetchWordCloudSearches } from '../../reducers/searchesReducer';

class Input extends Component {
  state = {
    searchText: '',
  };

  handleInputChange = evt => {
    this.setState({ searchText: evt.target.value });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchText) {
      console.log('come on');
      console.log(this.state.searchText);
      this.props.resetWordCloud();
      this.props.emptySelectedTweets();
      this.props.startLoading('wordcloudIsLoading');
      console.log('whats up!');
      axios
        .post('/api/tweets/search', { query: this.state.searchText })
        .then(searchId =>
          this.props.fetchAdjectiveWordcloudData(searchId.data)
        )
        .then(() => this.props.fetchWordCloudSearches());
      console.log(this.props.history);
      console.log('hello from submmit!!!');
      this.props.history.push(`/search/${this.state.searchText}`, {
        some: 'state',
      });
    }
  };

  componentDidMount() {
    if (this.props.match.params.searchedText) {
      this.setState({ searchText: this.props.match.params.searchedText });
    }
  }

  render() {
    const { handleInputChange, handleFormSubmit } = this;
    const { searchText } = this.state;

    return (
      <form
        style={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          style={{
            padding: '1rem',
            outline: 'none',
            border: '0',
            font: 'inherit',
            borderRadius: '5px 0 0 5px',
          }}
          onChange={handleInputChange}
          value={searchText}
          placeholder="#Tweet"
        />
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          style={{
            boxShadow: 'none',
            borderRadius: '0 5px 5px 0',
            fontWeight: 'bold',
          }}
        >
          Search
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchAdjectiveWordcloudData,
      startLoading,
      resetWordCloud,
      emptySelectedTweets,
      fetchWordCloudSearches,
    }
  )(Input)
);
