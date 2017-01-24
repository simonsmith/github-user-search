import * as actions from '../src/actions/users';

describe('when requesting users via a search term', () => {
  it('should dispatch a USER_SEARCH_REQUEST action', () => {
    expect(
      actions.userSearchRequest({searchTerm: 'simon'})
    ).toMatchSnapshot();
  });
});
