import React, { Component } from 'react';
import {
  // Redirect,
  withRouter
} from 'react-router-dom';

import Gallery from './Gallery';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      customSearch: [],
      customSearchTag: '',
      customSearchLoaded: false
    }
  }  

  handleSearch = (newSearchTag = '') => {
    this.setState(prevState => ({
      ...prevState,
      customSearch: [],
      customSearchTag: newSearchTag,
      customSearchLoaded: false
    }));
    this.props.performFlickrSearch(newSearchTag)
    .then(searchResult => {
      this.setState(prevState => ({
        ...prevState,
        customSearch: searchResult,
        customSearchLoaded: true
      }));
    })
    .catch((error) => {
      console.log('Error fetching and parsing data during App load', error);
    });
  }

  componentDidMount() {
    // console.log('<Search /> componentDidMount triggered');
    this.handleSearch(this.props.match.params.query);
    // console.log('this.props.match.params.query: ', this.props.match.params.query);

    // clean url history:
    // this.props.history.pop(); 
    // this.props.history.push(`/search/${this.props.match.params.query}`); 
    this.props.history.replace(`/search/${this.props.match.params.query}`); 
    // console.log('this.props.history: ', this.props.history);

  }

  render() {
    return (
      <div>
      { 
        (this.state.customSearchLoaded)
        ? <Gallery title={this.state.customSearchTag} urlList={this.state.customSearch} />
        : <h1>Loading...</h1>
      } 
      </div>
    );
  }
}

export default withRouter(Search);