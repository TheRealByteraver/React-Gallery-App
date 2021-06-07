import React from 'react';
import './App.css';

// App components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

function App() {
    return (
        <div className="container">    
            <SearchForm />
            <MainNav />
            <PhotoContainer />
        </div>  
    );
}

export default App;