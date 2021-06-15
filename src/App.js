import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Route,
    Switch
  } from 'react-router-dom';

import apiKey from './config.js';

// App components
import Nav from './components/Nav.js';
import SearchForm from './components/SearchForm.js';
import Gallery from './components/Gallery.js';
import Search from './components/Search';

class App extends Component {

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

  performFlickrSearch = (query = 'trending') => {
    return axios.get(this.getFlickrApiUrl(query))
      .then(response => response.data.photos.photo)
      .then(photos => photos.map(photo => this.getFlickrImgUrl(photo)))
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  constructor() {
    super();
    this.state = {
      customSearch: [],
      catsSearch: [],
      dogsSearch: [],
      horsesSearch: [],
      // for the search functionality:
      // customSearchTag: '',
      // customSearchLoaded: false
    }
  }

  handleSearch = (newSearchTag = '') => {
    this.setState(prevState => ({
      ...prevState,
      customSearch: [],
      customSearchTag: newSearchTag,
      customSearchLoaded: false
    }));
    this.performFlickrSearch(newSearchTag)
    .then(searchResult => {
      this.setState(prevState => ({
        ...prevState,
        customSearch: searchResult,
        customSearchLoaded: true
      }));
      console.log('this.state.customSearchLoaded = ', this.state.customSearchLoaded);
    })
    .catch((error) => {
      console.log('Error fetching and parsing data during App load', error);
    });
  }

  componentDidMount() {
    console.log('<App /> componentDidMount triggered');
    Promise.all([
      this.performFlickrSearch(),
      this.performFlickrSearch('cats'),
      this.performFlickrSearch('dogs'),
      this.performFlickrSearch('horses')
    ])
    .then(searchArray => {
      this.setState({
        customSearch: searchArray[0],
        catsSearch: searchArray[1],
        dogsSearch: searchArray[2],
        horsesSearch: searchArray[3],
        customSearchLoaded: true
      });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data during App load', error);
    });
  }
  
  render() {
    console.log('Re-render of App triggered');

    return (
      <BrowserRouter>
        <div className="container" 
          // onClick={() => console.log("search: ", this.state.customSearch) }
        >
          <SearchForm />
          <Nav />
          <Switch>
            <Route exact path="/" component=
              { () =>
                (this.state.customSearchLoaded)
                ? <Gallery title={this.state.customSearchTag} urlList={this.state.customSearch} />
                : <h1>Loading...</h1>
              } 
            />
            <Route path="/cats" render=
              { () => <Gallery title="Cats" urlList={this.state.catsSearch} /> } />
            <Route path="/dogs" render=
              { () => <Gallery title="Dogs" urlList={this.state.dogsSearch} /> } />
            <Route path="/horses" render=
              { () => <Gallery title="Horses" urlList={this.state.horsesSearch} /> } />

            <Route path="/search/:query" render=
              { () => <Search performFlickrSearch={this.performFlickrSearch} /> } />
            <Route component={ () =>
              <h1>404 - The requested route is not available</h1> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;