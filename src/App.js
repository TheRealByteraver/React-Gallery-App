import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';

// App components
// import './App.css';
// import Home from './components/Home';
// import Search from './components/Search';
import apiKey from './config.js';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

const defaultSearches = ['cats', 'dogs', 'horses'];

export default class App extends Component {

  // parameter: search term to query the Flickr api
  // returns: full Flickr query url
  getFlickrApiUrl = (query) => {
    const MaxImagesPerPage = 24;
    const apiUrl = `https://www.flickr.com/services/rest/`;
    const apiArgs = [
      `method=flickr.photos.search`,
      `api_key=${apiKey}`,
      `tags=${query}`,
      `per_page=${MaxImagesPerPage}`,
      `format=json`,
      `nojsoncallback=1`
    ];
    return [apiUrl, apiArgs.join('&')].join('?');
  }

  // parameter: photo object as returned by the Flickr API
  // returns: url to the image. url structure:
  // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
  getFlickrImgUrl = ({ server, id, secret }) => {
    return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
  }

  constructor() {
    super();

    this.imageCollections = [];

    this.state = {
      searchResult: [],
      loading: true
    };
  } 

  // Use axios to do the search and return the Promise().
  // Parameter: a search tag
  // Returns: a promise resolving to an array with 24 urls to Flickr photos
  performFlickrSearch = (query = 'trending') => {
    return axios.get(this.getFlickrApiUrl(query))
      .then(response => response.data.photos.photo)
      .then(photos => photos.map(photo => this.getFlickrImgUrl(photo)))
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  handleSearch = (query = 'trending') => { 
    this.setState(prevState => ({
      ...prevState,
      loading: true          
    }));
    this.performFlickrSearch(query)  
      .then(photos => {
        this.setState({
          searchResult: photos,
          loading: false          
        });
        return photos;
      })
      .catch( (error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Fetch the data for all four queries on first load
  componentDidMount() {
    Promise.all(defaultSearches.map(tag => this.performFlickrSearch(tag)))
      .then(data => {
        this.imageCollections = data;
        this.setState({
          searchResult: [...this.imageCollections[0]],
          loading: false    
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // We always check if we're finished loading the data from 
  // the Flickr API before we try to show any of the image 
  // collection
  getImageCollection = (collection) => {
    return (this.state.loading) 
    ? <h1>Loading...</h1> 
    : <PhotoContainer photoList={ collection } /> 
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm handleSearch={this.handleSearch} />
          <MainNav mainNavItems={defaultSearches} />
          <Switch>

            {/* Main / route */}
            <Route exact path="/" 
              render={ () => {
                  //this.getImageCollection(this.state.searchResult);
                  return (this.state.loading) 
                  ? <h1>Loading...</h1> 
                  : <PhotoContainer photoList={ this.state.searchResult } />        
              }} />

            {/* Routes for the default searches executed on initial load */}
            { defaultSearches.map((searchTag, index) => (
                <Route key={index} path={`/${searchTag}`} render={ () => 
                    this.getImageCollection(this.imageCollections[index]) } />))}

            {/* Search route */}
            <Route path="/search/:query" 
              render={ (props) => {
                  // console.log('query: ', props.match.params.query);
                  this.handleSearch(props.match.params.query);

                  // without the following statement we are in that infernal loop again
                  return <Redirect to="/" /> 

                  // return (this.state.loading) 
                  // ? <h1>Loading...</h1> 
                  // : <PhotoContainer photoList={ this.state.searchResult } />        
              }} />

            {/* Default 404 Route:  */}

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}