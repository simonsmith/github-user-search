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

function renderLink({url, linkStyle, rel, text, icon}: Object) {
  if (!url) {return null;}
  const search = getSearchQuery(url);
  return (
    <Link
      to={{search}}
      className={css(styles.Pagination_link, linkStyle)}
      rel={rel}
    >
      <span>{text}</span>
      {icon}
    </Link>
  );
}

function Pagination({prev, next}: Props) {
  const prevLink = renderLink({
    url: prev.url,
    linkStyle: styles.Pagination_prev,
    rel: 'prev',
    text: 'Previous',
    icon: <PrevIcon width={30} height={70} />,
  });

  const nextLink = renderLink({
    url: next.url,
    linkStyle: styles.Pagination_next,
    rel: 'next',
    text: 'Next',
    icon: <NextIcon width={30} height={70} />,
  });

  return (
    <div className={css(styles.Pagination)}>
      {prevLink}
      {nextLink}
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

  Pagination_link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  },

  Pagination_next: {
    marginLeft: 'auto',
  },

  Pagination_prev: {
    flexDirection: 'row-reverse',
    marginRight: 'auto',
  },
});

export default Pagination;
