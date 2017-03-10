// @flow

import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
  getProfile(username) {
    dispatch({type: 'PROFILE_REQUEST', username});
  },
});

export default connect(null, mapDispatchToProps);
