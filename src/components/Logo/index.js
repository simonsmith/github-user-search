// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

export default function Logo() {
  return (
    <div>
      <h1 className={css(styles.Logo_title)}>GitHub User Search</h1>
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

  Logo_subTitle: {
    marginTop: 5,
    fontSize: 14,
  },
});
