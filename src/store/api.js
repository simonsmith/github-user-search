import GitHub from 'github-api';

const api = new GitHub({
  token: process.env.USER_SEARCH_OAUTH,
});

export default api;
