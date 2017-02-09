// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';
import {searchUser} from '../store/Search/actions';

export function mapStateToProps(state: Object): Object {
  return {
    userEntities: get('entities.users', state),
    userIds: get('search.result', state),
    totalResults: get('search.totalResults', state),
  };
}

const mapDispatchToProps = {
  searchUser,
};

export default connect(mapStateToProps, mapDispatchToProps);
