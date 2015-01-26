/**
 * Extract pagination links from Link header in GitHub API
 * */

import forEach from 'lodash-node/modern/collections/forEach';

export default function parseLinkHeader(header) {
  if (header.length == 0) {
    return;
  }

  // Split parts by comma
  var parts = header.split(',');
  var links = {};

  // Parse each part into a named link
  forEach(parts, function(p) {
    var section = p.split(';');
    if (section.length != 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, '$1').trim();
    var name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  });

  return links;
}