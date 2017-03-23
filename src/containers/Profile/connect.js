// @flow

import {connect} from 'react-redux';

export function mapDispatchToProps(dispatch: Function) {
  return {
    getProfile(username: string) {
      dispatch({
        type: 'PROFILE_REQUEST',
        payload: {
          username,
        },
      });
    },
  };
}

export default connect(null, mapDispatchToProps);
