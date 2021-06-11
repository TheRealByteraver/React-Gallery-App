import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

// App Components
import Home from './Home';
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';

class Search extends Component {

  // Fetch the data for all four queries on first load
  // componentDidMount() {
  //   this.props.handleSearch(this.props.match.params.query);
  // }

  render () {
    this.props.handleSearch(this.props.match.params.query);

    console.log('query: ', this.props.match.params.query);
    // this.props.handleSearch(this.props.match.params.query);

    return (
      <div>
        {
          (this.props.isLoading) 
          ? <h1>Loading...</h1> 
          : <div>
              <SearchForm {...this.props} />
              <MainNav mainNavItems={this.props.mainNavItems} />
              <PhotoContainer photoList={ this.props.photoList } />
            </div>
        }
      </div>

    );  
  }
}

export default Search;