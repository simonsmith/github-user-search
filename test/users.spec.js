import * as actions from '../src/actions/users';

describe('when requesting users via a search term', () => {
  it('should dispatch a USER_SEARCH_REQUEST action', () => {
    expect(
      actions.userSearchRequest({searchTerm: 'simon'})
    ).toMatchSnapshot();
  });
});

describe('when receiving a set of users', () => {
  it('should dispatch a USER_SEARCH_SUCCESS action with the necessary data', () => {
    const users = [
      {login: 'foo', id: 123, other: 'test'},
      {login: 'baz', id: 456, other: 'test'},
    ];
    expect(
      actions.userSearchSuccess({data: users})
    ).toMatchSnapshot();
  });
});
