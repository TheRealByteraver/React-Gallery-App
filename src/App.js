import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Route,
    Switch
  } from 'react-router-dom';

// App components
// import './App.css';
import Home from './components/Home';
// import SearchForm from './components/SearchForm';
// import MainNav from './components/MainNav';
// import PhotoContainer from './components/PhotoContainer';
import apiKey from './config.js';

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
    this.state = {
      imageCollections: [],
      loading: true
    };
  } 

  // Use axios to do the search and return the Promise().
  // Parameter: a search tag
  // Returns: an array with 24 urls to Flickr photos
  performFlickrSearch = (query = 'trending') => {
    return axios.get(this.getFlickrApiUrl(query))
      .then( (response) => response.data.photos.photo )
      .then( (photos) => photos.map( photo => this.getFlickrImgUrl(photo)))
      .catch( (error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Fetch the data for all four queries on first load
  componentDidMount() {
    Promise.all(
      [
        this.performFlickrSearch('trending'), 
        this.performFlickrSearch('cat'),
        this.performFlickrSearch('dog'),
        this.performFlickrSearch('computer')
      ])
      .then(data => {
        this.setState({
          imageCollections: data,
          loading: false    
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // We always check if we're finished loading the data from the Flickr API
  // Before we try to show any of the image collection
  getImageCollection = (collectionNr) => {
    return (this.state.loading) 
    ? <h1>Loading...</h1> 
    : <Home photoList={this.state.imageCollections[collectionNr]} />
  }

  render() {
    return (
      <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => this.getImageCollection(0) } />
          <Route path="/cats" render={ () => this.getImageCollection(1) } />
          <Route path="/dogs" render={ () => this.getImageCollection(2) } />
          <Route path="/computers" render={ () => this.getImageCollection(3) } />
       </Switch>
      </BrowserRouter>
      </div>
    );
  }
}