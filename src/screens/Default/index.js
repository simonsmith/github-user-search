// @flow

import React, {
  PropTypes,
} from 'react';
import qs from 'query-string';
import {Route} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import isEmpty from 'lodash/fp/isEmpty';
import curry from 'lodash/fp/curry';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import HeaderContainer from 'containers/Header';
import Container from 'components/Container';
import {PER_PAGE} from 'store/api';

type Props = {
  component: any,
};

export const pushUrlQuery = curry((push: Function, query: string) => {
  push({
    pathname: '/search',
    search: `per_page=${PER_PAGE}&page=1&q=${query}`,
  });
});

export function constructTitle(search: Object) {
  const base = 'Github User Search';
  if (isEmpty(search)) {return base;}
  const {q, page} = search;
  return `${q} - Page ${page} - ${base}`;
}

const renderRoute = curry((Component, matchProps) => {
  const {location, push} = matchProps;
  const parsedSearch = qs.parse(location.search);
  const title = constructTitle(parsedSearch);
  const searchTerm = parsedSearch.q;

  return (
    <DocumentTitle title={title}>
      <div className={css(styles.DefaultLayout)}>
        <HeaderContainer
          searchTerm={searchTerm}
          searchQuery={qs.stringify(parsedSearch)}
          onSubmit={pushUrlQuery(push)}
        />
        <div className={css(styles.DefaultLayout_content)}>
          <Component
            searchTerm={searchTerm}
            {...matchProps}
          />
        </div>
        <Container rootStyle={styles.DefaultLayout_footer}>
          <p className={css(styles.DefaultLayout_footerText)}>
            View the <a href="https://github.com/simonsmith/github-user-search">source on GitHub</a>
          </p>
        </Container>
      </div>
    </DocumentTitle>
  );
});

function DefaultLayout({
  component: Component,
  ...restProps
}: Props) {
  return (
    <Route
      {...restProps}
      render={renderRoute(Component)}
    />
  );
}

DefaultLayout.propTypes = {
  component: PropTypes.func,
};

const styles = StyleSheet.create({
  DefaultLayout: {
    flexDirection: 'column',
    display: 'flex',
    minHeight: '100vh',
  },

  DefaultLayout_content: {
    flex: 1,
  },

  DefaultLayout_footer: {
    borderTop: '1px solid #ccc',
    marginTop: 30,
  },

  DefaultLayout_footerText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default DefaultLayout;
