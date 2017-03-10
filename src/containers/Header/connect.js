// @flow

import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
  searchForUser(search) {
    dispatch({type: 'SEARCH_REQUEST', search});
  },
});

export default connect(null, mapDispatchToProps);
