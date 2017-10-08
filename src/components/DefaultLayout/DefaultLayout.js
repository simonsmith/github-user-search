// @flow

import React from 'react';
import {connect} from 'react-fela';
import HeaderContainer from 'containers/Header/HeaderContainer';
import RateLimitContainer from 'containers/RateLimit';
import Container from 'components/Container/Container';

type Props = {
  searchTerm?: string,
  searchQuery?: string,
  onSearchSubmit: Function,
  component: any,
  matchProps: Object,
  styles: Object,
};

class DefaultLayout extends React.Component {

  props: Props;

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      searchTerm,
      searchQuery,
      onSearchSubmit,
      component: Component,
      matchProps,
      styles,
    } = this.props;

    return (
      <div className={styles.DefaultLayout_root}>
        <HeaderContainer
          searchTerm={searchTerm}
          searchQuery={searchQuery}
          onSubmit={onSearchSubmit}
        />
        <div className={styles.DefaultLayout_component}>
          <Component {...matchProps} />
        </div>
        <Container rootStyle={styles.DefaultLayout_footerContainer}>
          <div className={styles.DefaultLayout_footer}>
            <p className={styles.DefaultLayout_footerText}>
              View the <a href="https://github.com/simonsmith/github-user-search">source on GitHub</a>
            </p>
            <RateLimitContainer />
          </div>
        </Container>
      </div>
    );
  }
}

const styles = ({
  DefaultLayout_root: () => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),

  DefaultLayout_component: () => ({
    flexGrow: 1,
  }),

  DefaultLayout_footer: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '70px',
  }),

  DefaultLayout_footerContainer: () => ({
    borderTop: '1px solid #ccc',
    marginTop: '70px',
  }),

  DefaultLayout_footerText: () => ({
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: '14px',
  }),
});

export default connect(styles)(DefaultLayout);
