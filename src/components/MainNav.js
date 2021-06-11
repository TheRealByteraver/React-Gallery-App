import React from 'react';
import { NavLink } from 'react-router-dom';


function capitalizeFirst(sourceString) {
  return `${sourceString.substr(0, 1).toUpperCase()}${sourceString.slice(1)}`;
}

export default function MainNav(props) {

  return (
    <nav className="main-nav">
      <ul>
        {
          props.mainNavItems.map( (navItem, index) => 
            <li key={index}>
              <NavLink to={`/${navItem}`}>
                {`${capitalizeFirst(navItem)}`}
              </NavLink>
            </li>  
          )
        }
      </ul>
    </nav>  
  );
}