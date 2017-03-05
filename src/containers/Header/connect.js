// @flow

import {connect} from 'react-redux';
import {searchForUser} from 'actions/Search';

const mapDispatchToProps = {
  searchForUser,
};

export default connect(null, mapDispatchToProps);
