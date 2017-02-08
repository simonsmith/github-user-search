// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';
import {searchUser} from '../store/Search/actions';

export function mapStateToProps(state: Object): Object {
  const userIds = get('search.userIds', state);
  return {
    userEntities: get('entities.users', state),
    userIds,
    totalResults: userIds.length,
  };
}

const mapDispatchToProps = {
  searchUser,
};

export default connect(mapStateToProps, mapDispatchToProps);
