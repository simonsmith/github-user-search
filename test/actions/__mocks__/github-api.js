const GitHub = jest.genMockFromModule('github-api');

const response = {
  data: [
    {id: 123, avatar_url: 'foo', login: 'alecrust', type: 'User'},
    {id: 456, avatar_url: 'foo', login: 'simonsmith', type: 'User'},
  ],
};

function search() {
  return {
    forUsers() {
      return Promise.resolve(response);
    },
  };
}

GitHub.mockImplementation(() => ({
  search,
}));

module.exports = GitHub;
