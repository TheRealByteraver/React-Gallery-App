import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Gallery from './Gallery';

class UrlSearch extends Component {

  componentDidMount() {
    // console.log("this.props.urlParam.query: ", this.props.urlParam.query);
    this.props.handleSearch(this.props.urlParam.query);
  }

  render() {

    return (
      <div>
        { (this.props.isLoaded)
          ? <Gallery 
              title={this.props.title} 
              urlList={this.props.urlList} />
          : <h1>Loading...</h1>
        }      
      </div>
    );
  }
}

export default withRouter(UrlSearch);