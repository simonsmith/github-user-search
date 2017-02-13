// @flow

import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

type Props = {
  children?: any,
};

export default function SearchHeader({children}: Props) {
  return (
    <div className={css(styles.SearchHeader)}>
      <div className={css(styles.SearchHeader_text)}>
        <h1 className={css(styles.SearchHeader_title)}>GitHub User Search</h1>
        <p className={css(styles.SearchHeader_desc)}>
          Browse users and their profiles via <a href="https://developer.github.com/v3/">the GitHub API</a>
        </p>
      </div>
      <div className={css(styles.SearchHeader_children)}>
        {children}
      </div>
    </div>
  );
}

SearchHeader.propTypes = {
  children: PropTypes.element,
};

const BREAKPOINT = '@media (min-width: 600px)';

const styles = StyleSheet.create({
  SearchHeader: {
    paddingTop: 15,
    paddingBottom: 15,

    [BREAKPOINT]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

  },

  SearchHeader_text: {
    flex: 2,
  },

  SearchHeader_title: {
    fontSize: 28,
  },

  SearchHeader_desc: {
    marginTop: 5,
    fontSize: 14,
  },

  SearchHeader_children: {
    marginTop: 20,
    flex: 1,

    [BREAKPOINT]: {
      margin: 0,
    },
  },
});
