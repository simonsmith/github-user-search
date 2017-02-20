// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

export default function Logo() {
  return (
    <div>
      <h1 className={css(styles.Logo_title)}>
        <Link
          to="/"
          className={css(styles.Logo_link)}
        >
          GitHub User Search
        </Link>
      </h1>
      <p className={css(styles.Logo_subTitle)}>
        Browse users and their profiles via <a href="https://developer.github.com/v3/">the GitHub API</a>
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  Logo_title: {
    fontSize: 28,
  },

  Logo_link: {
    textDecoration: 'none',
    color: 'inherit',
  },

  Logo_subTitle: {
    marginTop: 5,
    fontSize: 14,
  },
});
