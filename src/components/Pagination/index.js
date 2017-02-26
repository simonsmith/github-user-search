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
import classNames from 'classnames';
import 'suitcss-utils-flex/lib/flex.css';
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

function renderLink({url, extraClassName, rel, text, icon}: Object) {
  if (!url) {return null;}
  const search = getSearchQuery(url);

  const linkClass = classNames(
    css(styles.Pagination_link),
    'u-flex',
    'u-flexAlignItemsCenter',
    extraClassName
  );

  return (
    <Link
      to={{search}}
      className={linkClass}
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
    extraClassName: 'u-flexRowReverse u-flexExpandRight',
    rel: 'prev',
    text: 'Previous',
    icon: <PrevIcon width={30} height={70} />,
  });

  const nextLink = renderLink({
    url: next.url,
    extraClassName: 'u-flexExpandLeft',
    rel: 'next',
    text: 'Next',
    icon: <NextIcon width={30} height={70} />,
  });

  return (
    <div className="u-flex u-flexJustifyCenter">
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
  Pagination_link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default Pagination;
