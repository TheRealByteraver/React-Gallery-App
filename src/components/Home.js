import React from 'react';

// App Components
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';



export default function Home(props) {

  // console.log('props.photoList: ', props.photoList );

  return (
    <div>
      <h1>The Home component</h1>
      <SearchForm />
      <MainNav />
      <PhotoContainer photoList={ props.photoList } />     
    </div>
  );
}