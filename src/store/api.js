import axios from 'axios';
import assignAll from 'lodash/fp/assignAll';
import parseLinkHeader from 'parse-link-header';
import pick from 'lodash/fp/pick';

const github = axios.create({
  baseURL: 'https://api.github.com/',
});

const token = process.env.USER_SEARCH_OAUTH;
if (token) {
  github.defaults.headers.common.Authorization = `token ${token}`;
}

function transformResponse(response) {
  const {data} = response;
  const pagination = parseLinkHeader(response.headers.link);
  return assignAll([
    pick(['total_count', 'items'], data),
    {pagination},
  ]);
}
github.interceptors.response.use(transformResponse);

function searchUsers(params: Object): Promise {
  return github.get('/search/users', {
    params,
  });
}

export default {
  searchUsers,
};
