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
import NextIcon from './next.svg';
import PrevIcon from './prev.svg';

type Props = {
  next: Object,
  prev: Object,
};

const getSearchQuery = flow(
  url => url.match(/(\?.+)/),
  first
);

function renderNext(url: string) {
  if (!url) {return null;}
  const search = getSearchQuery(url);
  return (
    <Link
      to={{search}}
      className={css(styles.Pagination_next)}
    >
      <NextIcon width={40} height={80} />
    </Link>
  );
}

function renderPrev(url: string) {
  if (!url) {return null;}
  const search = getSearchQuery(url);
  return (
    <Link
      to={{search}}
      className={css(styles.Pagination_prev)}
    >
      <PrevIcon width={40} height={80} />
    </Link>
  );
}

function renderLink(url: string, text: string, style: Object) {
  if (!url) {return null;}
  const search = getSearchQuery(url);
  return <Link to={{search}} className={css(style)}>{text}</Link>;
}

function Pagination({prev, next}: Props) {
  return (
    <div className={css(styles.Pagination)}>
      {renderPrev(prev.url)}
      {renderNext(next.url)}
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
