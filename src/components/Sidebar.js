import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSearchId } from '../reducers/searchesReducer';

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            search_id: 1,
        }
    }

    handleSelect = ({ target }) => {
        this.setState({ search_id: Number(target.value) });
    }

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.selectSearchId(this.state.search_id);
    }

    render() {
        const { searches } = this.props.searches;
        return (
            <div >
                <select name="search_id" onChange={this.handleSelect}>
                    {searches.map(search => {
                        return (
                            <option key={search.search_id} value={search.search_id}>{search.query}</option>
                        )
                    })}
                </select>
                <button type="submit" onClick={this.handleSubmit}>Update Wordcloud</button>
            </div >
        )
    }

}

const mapStateToProps = ({ searches }) => {
    return {
        searches,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectSearchId: search_id => dispatch(selectSearchId(search_id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

