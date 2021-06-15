import React, { Component } from 'react';

class GalleryItem extends Component {
  render() {
    return (
      <li>
        <img src={this.props.src} alt="" />
      </li>   
    );
  }
}

export default GalleryItem;