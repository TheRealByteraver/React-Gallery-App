import React from 'react';

// App components
import Photo from './Photo';
import NotFound from './NotFound';

// stateful component
// make sure each pic gets a unique "key" prop
// max 24 images
export default function PhotoContainer(props) {

  const photos = props.photoList.map((photo, index) => 
      <Photo key={index} src={photo} /> );

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {
          photos.length > 0 ? photos : <NotFound />
        }
      </ul>
    </div>
  );
}