// @flow

import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import Container from '../components/Container';

type Props = {
  children?: any,
};

export default function SearchHeader({children}: Props) {
  return (
    <Container extraStyle={styles.SearchHeader}>
      <div className={css(styles.SearchHeader_inner)}>
        <h1 className={css(styles.SearchHeader_title)}>GitHub User Search</h1>
        <p className={css(styles.SearchHeader_intro)}>
          Browse users and their profiles via <a href="https://developer.github.com/v3/">the GitHub API</a>
        </p>
        <div className={css(styles.SearchHeader_children)}>
          {children}
        </div>
      </div>
    </Container>
  );
}

SearchHeader.propTypes = {
  children: PropTypes.element,
};

const styles = StyleSheet.create({
  SearchHeader: {
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
  },
  SearchHeader_inner: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  SearchHeader_title: {
    fontSize: 32,
  },
  SearchHeader_intro: {
    marginTop: 5,
  },
  SearchHeader_children: {
    marginTop: 20,
  },
});
