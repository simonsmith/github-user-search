/**
 * Extract pagination links from Link header in GitHub API
 * */

export default function parseLinkHeader(link) {
  if (!link) {
    return {};
  }

  let parsed = {};
  let reg = /<(.*?)>; rel="(.*)"/;

  link.split(',').forEach(function(part) {
    var r = reg.exec(part);
    parsed[r[2]] = r[1];
  });

  return parsed;
}