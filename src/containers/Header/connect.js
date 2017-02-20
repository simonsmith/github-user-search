// @flow

import {connect} from 'react-redux';
import {searchUser} from 'actions/Search';

const mapDispatchToProps = {
  searchUser,
};

export default connect(null, mapDispatchToProps);
