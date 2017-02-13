// @flow

import React, {
  PropTypes,
} from 'react';
import {Link} from 'react-router-dom';
import first from 'lodash/fp/first';
import flow from 'lodash/fp/flow';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

type Props = {
  next: Object,
  prev: Object,
};

const getSearchQuery = flow(
  url => url.match(/(\?.+)/),
  first
);

function renderLink(url: string, text: string, style: Object) {
  if (!url) {return null;}
  const search = getSearchQuery(url);
  return <Link to={{search}} className={css(style)}>{text}</Link>;
}

function Pagination({prev, next}: Props) {
  return (
    <div className={css(styles.Pagination)}>
      {renderLink(prev.url, 'Previous', styles.Pagination_prev)}
      {renderLink(next.url, 'Next', styles.Pagination_next)}
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

const styles = StyleSheet.create({
  Pagination: {
    display: 'flex',
    justifyContent: 'center',
  },

  Pagination_next: {
    marginLeft: 'auto',
  },

  Pagination_prev: {
    marginRight: 'auto',
  },
});

export default Pagination;
