import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNav({match}) {
  return (
    <nav className="main-nav">
      <ul>
        {/* <li><NavLink to={`${match.url}/cats`}>Cats</NavLink></li>
        <li><NavLink to={`${match.url}/dogs`}>Dogs</NavLink></li>
        <li><NavLink to={`${match.url}/computers`}>Computers</NavLink></li> */}
        <li><NavLink to={`/cats`}>Cats</NavLink></li>
        <li><NavLink to={`/dogs`}>Dogs</NavLink></li>
        <li><NavLink to={`/computers`}>Computers</NavLink></li>
      </ul>
    </nav>  
  );
}