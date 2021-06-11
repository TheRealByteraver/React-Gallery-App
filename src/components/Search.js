import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

// App Components
// import SearchForm from './SearchForm';
// import MainNav from './MainNav';
// import PhotoContainer from './PhotoContainer';


class Search extends Component {

  // Fetch the data for all four queries on first load
  componentDidMount() {
    this.props.handleSearch(this.props.match.params.query);
  }



  render () {
    console.log('query: ', this.props.match.params.query);
    // this.props.handleSearch(this.props.match.params.query);

    return (
      <div>
        <Route path="/search" render=
          { () => <Redirect to="/" /> } />
      </div>
    );  
  }
}

export default Search;