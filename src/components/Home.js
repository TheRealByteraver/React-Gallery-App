import React from 'react';

// App Components
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';

export default function Home(props) {

  return (
    <div>
      <SearchForm handleSearch={props.handleSearch} />
      <MainNav />
      <PhotoContainer photoList={ props.photoList } />
    </div>
  );
}