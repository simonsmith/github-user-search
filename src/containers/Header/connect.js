// @flow

import {connect} from 'react-redux';

export const mapDispatchToProps = (dispatch: Function) => ({
  searchForUser(search: string) {
    dispatch({
      type: 'SEARCH_REQUEST',
      payload: {
        search,
      },
    });
  },
});

export default connect(null, mapDispatchToProps);
