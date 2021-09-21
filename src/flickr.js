import axios from 'axios';
// import apiKey from './config.js';

// parameter: search term to query the Flickr api
// returns: full Flickr query url
function getFlickrApiUrl(query) {
  const MaxImagesPerPage = 24;
  const apiUrl = `https://www.flickr.com/services/rest/`;
  const apiArgs = [
    `method=flickr.photos.search`,
    // `api_key=${apiKey}`,
    `api_key=${process.env.REACT_APP_FLICKR_API_KEY}`,
    `tags=${query}`,
    `per_page=${MaxImagesPerPage}`,
    `format=json`,
    `nojsoncallback=1`
  ];
  return [apiUrl, apiArgs.join('&')].join('?');
}

// parameter: photo object as returned by the Flickr API
// returns: url to the image. url structure:
// https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
function getFlickrImgUrl({ server, id, secret }) {
  console.log('retrieved url: ', `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`);
  return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

function performFlickrSearch(query = 'trending') {
  console.log('getFlickrApiUrl(query):', getFlickrApiUrl(query));
  return axios.get(getFlickrApiUrl(query))
    .then(response => response.data.photos.photo)
    .then(photos => photos.map(photo => getFlickrImgUrl(photo)))
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
}

export default performFlickrSearch;