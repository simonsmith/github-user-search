// @flow

import React, {
  PropTypes,
} from 'react';
import {Link} from 'react-router-dom';
import first from 'lodash/fp/first';
import flow from 'lodash/fp/flow';

type Props = {
  next: Object,
  prev: Object,
};

const getSearchQuery = flow(
  url => url.match(/(\?.+)/),
  first
);

function renderLink(url: string, text: string) {
  if (!url) {return null;}
  const search = getSearchQuery(url);
  return <Link to={{search}}>{text}</Link>;
}

function Pagination({prev, next}: Props) {
  return (
    <div>
      {renderLink(prev.url, 'Previous')}
      {renderLink(next.url, 'Next')}
    </div>
  );
}

Pagination.defaultProps = {
  next: {},
  prev: {},
};

Pagination.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
};

export default Pagination;
