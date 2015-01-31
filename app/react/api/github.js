import reqwest from 'reqwest';
import parseLinkHeader from 'utils/parseLinkHeader';
import path from 'path';

const API_ROOT_URL = 'https://api.github.com';

function gitHubAPI(url) {
  var req = reqwest({
    url: path.join(API_ROOT_URL, url),
    type: 'json'
  })
    .then(data => {
      return {
        data,
        pagination: parseLinkHeader(req.request.getResponseHeader('Link'))
      }
    });

  return req;
}

export default gitHubAPI;