// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';
import {searchUser} from '../store/Search/actions';

export function mapStateToProps(state: Object): Object {
  const userResults = get('search.result', state);
  return {
    userEntities: get('entities.users', state),
    userResults,
    totalResults: userResults.length,
  };
}

const mapDispatchToProps = {
  searchUser,
};

export default connect(mapStateToProps, mapDispatchToProps);
