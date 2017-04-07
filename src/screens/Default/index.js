// @flow

import React from 'react';
import qs from 'query-string';
import {Route} from 'react-router-dom';
import curry from 'lodash/fp/curry';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import HeaderContainer from 'containers/Header';
import RateLimitContainer from 'containers/RateLimit';
import Container from 'components/Container';
import {PER_PAGE} from 'store/api';
import 'suitcss-utils-flex/lib/flex.css';

type Props = {
  component: Function,
};

export const pushUrlQuery = curry((push: Function, query: string) => {
  push({
    pathname: '/search',
    search: `per_page=${PER_PAGE}&page=1&q=${query}`,
  });
});

const renderRoute = curry((Component, matchProps) => {
  const {location, history: {push}} = matchProps;
  const parsedSearch = qs.parse(location.search);
  const searchTerm = parsedSearch.q;

  return (
    <div className={`${css(styles.DefaultLayout)} u-flex u-flexCol`}>
      <HeaderContainer
        searchTerm={searchTerm}
        searchQuery={qs.stringify(parsedSearch)}
        onSubmit={pushUrlQuery(push)}
      />
      <div className="u-flexGrow1">
        <Component {...matchProps} />
      </div>
      <Container rootStyle={styles.DefaultLayout_footer}>
        <div className="u-flex u-flexWrap u-flexAlignItemsCenter u-flexJustifyBetween">
          <p className={css(styles.DefaultLayout_footerText)}>
            View the <a href="https://github.com/simonsmith/github-user-search">source on GitHub</a>
          </p>
          <RateLimitContainer />
        </div>
      </Container>
    </div>
  );
});

class DefaultLayout extends React.Component {

  props: Props;

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      component: Component,
      ...restProps
    } = this.props;

    return (
      <Route
        {...restProps}
        render={renderRoute(Component)}
      />
    );

  }
}

const styles = StyleSheet.create({
  DefaultLayout: {
    minHeight: '100vh',
  },

  DefaultLayout_footer: {
    borderTop: '1px solid #ccc',
    marginTop: 70,
  },

  DefaultLayout_footerText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default DefaultLayout;
