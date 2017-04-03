// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';

export function mapStateToProps(state: Object): Object {
  return {
    userEntities: get('entities.users', state),
    userIds: get('search.result', state),
    totalResults: get('search.totalResults', state),
    pagination: get('search.pagination', state),
    isPending: get('search.isPending', state),
  };
}

export default connect(mapStateToProps);
