import React, { Component } from 'react';
import {
  Redirect,
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
      // console.log('this.state.customSearchLoaded = ', this.state.customSearchLoaded);
    })
    .catch((error) => {
      console.log('Error fetching and parsing data during App load', error);
    });
  }

  componentDidMount() {
    console.log('<Search /> componentDidMount triggered');
    this.handleSearch(this.props.match.params.query);
    console.log('this.props.match.params.query: ', this.props.match.params.query);
    this.props.history.push(`/search/${this.props.match.params.query}`); // cheating ;)

    // the below also works well instead of the <Redirect to="/" /> 
    // but has the same problem
    // this.props.history.push("/");
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

    // this does work but the browser history is lost for some reason
    // return (
    //   <Redirect to="/" />
    // );

    // this does not work, as 'this.props.isLoaded' does not get updated
    // return (
    //   <div>
    //   {
    //     this.props.isLoaded
    //     ? <Gallery title={this.title} urlList={this.urlList} />
    //     : <h1>Loading...</h1>
    //   }        
    //   </div>
    // );
  }
}

export default withRouter(Search);