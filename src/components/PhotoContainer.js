import React from 'react';

// App components
import Photo from './Photo';
import NotFound from './NotFound';

// stateful
export default function PhotoContainer(props) {
    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                <Photo src="https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg" />
                <Photo src="https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg" />
                <Photo src="https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg" />
                <Photo src="https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg" />
                <NotFound />
            </ul>
        </div>
    );
}