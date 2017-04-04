// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';
import GitHubIcon from './mark-github.svg';

export default function Logo() {
  return (
    <div>
      <h1 className={css(styles.Logo_title)}>
        <Link
          to="/"
          className={`${css(styles.Logo_link)} u-flex`}
        >
          <GitHubIcon
            className={css(styles.Logo_icon)}
            width={24}
            height={24}
          />
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
  Logo_icon: {
    marginRight: 8,
  },

  Logo_title: {
    fontSize: 25,
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
