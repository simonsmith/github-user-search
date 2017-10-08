// @flow

import React from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import Container from 'components/Container/Container';
import Logo from 'components/Logo/Logo';
import {connect} from 'react-fela';

type Props = {
  onSubmit: Function,
  searchTerm: string,
  styles: Object,
};

function Header({onSubmit, searchTerm, styles}: Props) {
  return (
    <Container rootStyle={styles.Header_container}>
      <div
        className={styles.Header_root}
      >
        <div className={styles.Header_logo}>
          <Logo />
        </div>
        <div className={styles.Header_form}>
          <SearchForm
            onSubmit={onSubmit}
            initialInputValue={searchTerm}
          />
        </div>
      </div>
    </Container>
  );
}

const MQ = '@media (min-width: 600px)';

const styles = {
  Header_root: () => ({
    paddingTop: '15px',
    paddingBottom: '15px',

    [MQ]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),

  Header_logo: () => ({
    flexGrow: 2,
  }),

  Header_container: () => ({
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #aaa',
    boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, .2)',
  }),

  Header_form: () => ({
    marginTop: '20px',

    [MQ]: {
      margin: 0,
      flexGrow: 1,
    },
  }),
};

export default connect(styles)(Header);
