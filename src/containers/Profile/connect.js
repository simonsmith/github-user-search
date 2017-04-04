// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';

export function mapStateToProps(state: Object): Object {
  return {
    followerIds: get('followers.result', state),
    followerIsPending: get('followers.isPending', state),
    repoIsPending: get('repos.isPending', state),
    repoEntities: get('entities.repos', state),
    repoIds: get('repos.result', state),
    userEntities: get('entities.users', state),
    userIsPending: get('profile.isPending', state),
    userProfile: get('profile.userProfile', state),
  };
}

export function mapDispatchToProps(dispatch: Function) {
  return {
    getProfile(username: string | void) {
      if (!username) {return;}
      dispatch({
        type: 'PROFILE_REQUEST',
        payload: {
          username,
        },
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
