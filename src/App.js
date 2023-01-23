
import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch
  } from 'react-router-dom';

// import Flickr fetch aide function
import performFlickrSearch from './flickr.js';

// App components
import Nav from './components/Nav.js';
import SearchForm from './components/SearchForm.js';
import Gallery from './components/Gallery.js';
import UrlSearch from './components/UrlSearch';

class App extends Component {

  state = {
    customSearch: [],
    customSearchTag: '',
    catsSearch: [],
    dogsSearch: [],
    horsesSearch: [],
    isLoaded: false
  }

  handleSearch = (newSearchTag) => {
    this.setState(prevState => ({
      ...prevState,
      customSearch: [],
      customSearchTag: newSearchTag,
      isLoaded: false
    }));
    performFlickrSearch(newSearchTag)
    .then(searchResult => {
      this.setState(prevState => ({
        ...prevState,
        customSearch: searchResult,
        isLoaded: true
      }));
    })
    .catch((error) => {
      console.log('Error fetching and parsing data during App load', error);
    });
  }

  componentDidMount() {
    // console.log('<App /> componentDidMount triggered');

    Promise.all([
      performFlickrSearch('cats'),
      performFlickrSearch('dogs'),
      performFlickrSearch('horses')
      // ,performFlickrSearch('trending')
    ])
    .then(searchArray => {
      this.setState({
        catsSearch: searchArray[0],
        dogsSearch: searchArray[1],
        horsesSearch: searchArray[2],
        // fillerSearch: searchArray[3],
        isLoaded: true
      });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data during App load', error);
    });
  }
  
  // componentDidUpdate() {
  //   console.log('<App /> componentDidUpdate triggered');
  // }

  render() {
    // console.log('<App /> render triggered');

    const basename = '/React-Gallery-App/';

    return (
      <BrowserRouter basename={basename ? basename : ''}>
        <div className="container">
          <SearchForm handleSearch={this.handleSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" component=
              { () =>
                (this.state.isLoaded)
                ? <Gallery title={this.state.customSearchTag} urlList={this.state.customSearch} />
                : <h1>Loading...</h1>
              } />
            <Route path="/cats" component=
              { () =>
                (this.state.isLoaded)
                ? <Gallery title="Cats" urlList={this.state.catsSearch} />
                : <h1>Loading...</h1>
              } />
            <Route path="/dogs" component=
              { () =>
                (this.state.isLoaded)
                ? <Gallery title="Dogs" urlList={this.state.dogsSearch} />
                : <h1>Loading...</h1>
              } />
            <Route path="/horses" component=
              { () =>
                (this.state.isLoaded)
                ? <Gallery title="Horses" urlList={this.state.horsesSearch} />
                : <h1>Loading...</h1>
              } />
            <Route path="/search/:query" render=
              { (props) => {
                return (
                  <UrlSearch
                    urlParam={props.match.params} 
                    handleSearch={this.handleSearch} 
                    isLoaded={this.state.isLoaded}
                    title={this.state.customSearchTag} 
                    urlList={this.state.customSearch} 
                  />
                );
            }} />

            <Route component={ (props) => {
              console.log('props:', props);
              return (
                <h1>404 - The requested route is not available</h1>
              );
            }} />
              
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;