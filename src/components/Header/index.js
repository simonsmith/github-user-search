// @flow

import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import Container from 'components/Container';
import SearchForm from 'components/SearchForm';
import Logo from 'components/Logo';

type Props = {
  onSubmit: Function,
  searchTerm: string,
};

export default function Header({onSubmit, searchTerm}: Props) {
  return (
    <Container rootStyle={styles.Header}>
      <div className={css(styles.Header_inner)}>
        <div className={css(styles.Header_logo)}>
          <Logo />
        </div>
        <div className={css(styles.Header_form)}>
          <SearchForm
            onSubmit={onSubmit}
            initialInputValue={searchTerm}
          />
        </div>
      </div>
    </Container>
  );
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

const BREAKPOINT = '@media (min-width: 600px)';

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
  },

  Header_inner: {
    paddingTop: 15,
    paddingBottom: 15,

    [BREAKPOINT]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  Header_logo: {
    flex: 2,
  },

  Header_form: {
    marginTop: 20,
    flex: 1,

    [BREAKPOINT]: {
      margin: 0,
    },
  },
});
