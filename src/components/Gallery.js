import React, { Component } from 'react';

// Own components
import GalleryItem from './GalleryItem.js';
import GalleryItemNotFound from './GalleryItemNotFound.js';

class Gallery extends Component {
  render() {

    return (
      <div className="photo-container">
        <h2>{this.props.title}</h2>
        <ul>
          {
            (this.props.urlList.length === 0 && this.props.title.length !== 0)
            ? <GalleryItemNotFound /> 
            : this.props.urlList.map((imgSrc,index) => 
                    <GalleryItem key={index} src={imgSrc} /> )
          }          
        </ul>
      </div>
    );
  }
}

export default Gallery;