import reqwest from 'reqwest';
import parseLinkHeader from 'utils/parseLinkHeader';
import startsWith from 'lodash-node/modern/string/startsWith';
import path from 'path';

const API_ROOT_URL = 'https://api.github.com';

export default gitHubAPI;

function gitHubAPI(url) {
  var requestUrl = startsWith(url, API_ROOT_URL) ? url : path.join(API_ROOT_URL, url);
  var req = reqwest({
    url: requestUrl,
    type: 'json'
  })
    .then(apiData => {
      return {
        results: apiData,
        url,
        pagination: parseLinkHeader(req.request.getResponseHeader('Link'))
      };
    });

  return req;
}