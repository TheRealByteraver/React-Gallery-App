import React, { Component } from 'react';
import axios from 'axios';
import {
  withRouter
} from 'react-router';

import apiKey from '../config.js';
import PhotoContainer from './PhotoContainer';

class SearchRoute extends Component {

  state = {
    lastQuery: '',
    imageList: [],
    loadingFinished: false
  }

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

  render() {
    // this.props.handleSearch(this.props.match.params.query); // doesn't work

    // prevent React from eternally redoing the same search:
    if(this.state.lastQuery !== this.props.match.params.query) {
      this.setState(prevState => ({
        ...prevState,
        lastQuery: this.props.match.params.query
      }));
      axios.get(this.getFlickrApiUrl(this.props.match.params.query))
      .then(response => response.data.photos.photo)
      .then(photos => photos.map(photo => this.getFlickrImgUrl(photo)))
      .then(photos => {
        this.setState({
          imageList: photos,
          loadingFinished: true
        });
        console.log("finished loading custom search");
        return photos;
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
    }

    return (
      <>
      {
        this.state.loadingFinished 
        ? <PhotoContainer photoList={ this.state.imageList } /> 
        : <h1>Loading...</h1> 
      }
      </>
    );  


    // return (
    //   <>
    //   {
    //     this.props.state.loading
    //     ? <h1>Loading...</h1> 
    //     : <PhotoContainer photoList={ this.props.state.searchResult } /> 
    //   }
    //   </>
    // );  
  }
}

export default withRouter(SearchRoute);