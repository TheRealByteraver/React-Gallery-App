import React, { Component } from 'react';
import {
  Redirect,
  withRouter
} from 'react-router-dom';

import Gallery from './Gallery';

class Search extends Component {

  componentDidMount() {
    console.log('<Search /> componentDidMount triggered');
    this.props.handleSearch(this.props.match.params.query);

    // the below also works well instead of the <Redirect to="/" /> 
    // but has the same problem
    this.props.history.push("/");
  }

  render() {
    return (
      <div></div>
    );

    // this does work but the browser history is lost for some reason
    // return (
    //   <Redirect to="/" />
    // );

    // this does not work, as 'this.props.isLoaded' does not get updated
    // return (
    //   <div>
    //   {
    //     this.props.isLoaded
    //     ? <Gallery title={this.title} urlList={this.urlList} />
    //     : <h1>Loading...</h1>
    //   }        
    //   </div>
    // );
  }
}

export default withRouter(Search);