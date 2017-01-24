// @flow

export const USER_SEARCH_REQUEST: string = 'USER_SEARCH_REQUEST';
export function userSearchRequest({searchTerm}: {searchTerm: string}) {
  return {
    type: USER_SEARCH_REQUEST,
    searchTerm,
  };
}
