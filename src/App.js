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
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
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
      imageCollections: [
        { catPhotos: [] },
        { dogPhotos: [] },
        { computerPhotos: [] }
      ],
      loading: true
    };
  } 

  // Use axios to do the search and return the Promise()
  performFlickrSearch = (query = 'trending') => {
    return axios.get(this.getFlickrApiUrl(query))
      .then( (response) => response.data.photos.photo )
      .then( (photos) => photos.map( photo => this.getFlickrImgUrl(photo)))
      .catch( (error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  componentDidMount() {
    Promise.all(
      [
        this.performFlickrSearch('trending'), 
        this.performFlickrSearch('cat'),
        this.performFlickrSearch('dog'),
        this.performFlickrSearch('computer')
      ])
      .then(data => {
        // console.log('Array of results', data); 
        this.setState({
          imageCollections: [
            { catPhotos: [...data[1]] },
            { dogPhotos: [...data[2]] },
            { computerPhotos: [...data[3]] }
          ],
          loading: false    
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {

    return (
      <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render=
          { 
            () => 
            {
              return (this.state.loading) 
              ? <h1>Loading...</h1> 
              : <Home photoList={this.state.imageCollections[0].catPhotos} />              
            } 
          } />
          <Route path="/cats" render={ () => <Home photoList={this.state.imageCollections[0].catPhotos} /> } />
          <Route path="/dogs" render={ () => <Home photoList={this.state.imageCollections[1].dogPhotos} /> } />
          <Route path="/computers" render={ () => <Home photoList={this.state.imageCollections[2].computerPhotos} /> } />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}