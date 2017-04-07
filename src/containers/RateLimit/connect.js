// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';
import format from 'date-fns/format';

function formatDate(timestamp: number): string | void {
  if (!timestamp) {return undefined;}
  return format(new Date(timestamp * 1000), 'DD-MM-YYYY HH:mm');
}

export function mapStateToProps(state: Object): Object {
  return {
    coreLimit: get('rateLimit.core.limit', state),
    coreRemaining: get('rateLimit.core.remaining', state),
    coreReset: formatDate(get('rateLimit.core.reset', state)),
    searchLimit: get('rateLimit.search.limit', state),
    searchRemaining: get('rateLimit.search.remaining', state),
    searchReset: formatDate(get('rateLimit.search.reset', state)),
  };
}

export default connect(mapStateToProps);
