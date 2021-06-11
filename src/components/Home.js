import React from 'react';

// App Components
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';

export default function Home(props) {

  return (
    <div>
      <SearchForm {...props} handleSearch={props.handleSearch} />
      <MainNav mainNavItems={props.mainNavItems} />
      <PhotoContainer photoList={ props.photoList } />
    </div>
  );
}