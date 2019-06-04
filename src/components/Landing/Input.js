import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import { fetchWordcloudData } from '../../reducers/wordcloudReducer';

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
      this.props.fetchWordcloudData(this.state.searchText);
      this.props.history.push(`/search`);
    }
  };

  render() {
    const { handleInputChange, handleFormSubmit } = this;
    const { searchText } = this.state;
    console.log(this.props);
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

const mapDispatchToProps = dispatch => {
  return {
    fetchWordcloudData: word => dispatch(fetchWordcloudData(word)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Input)
);
