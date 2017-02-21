// @flow

import React from 'react';
import qs from 'query-string';
import DocumentTitle from 'react-document-title';
import isEmpty from 'lodash/fp/isEmpty';
import curry from 'lodash/fp/curry';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import HeaderContainer from 'containers/Header';
import {PER_PAGE} from 'store/api';

type Props = {
  push: Function,
  location: Object,
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

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withBaseScreen(WrappedComponent: ReactClass<*>) {
  function component({location, push, ...restProps}: Props) {
    const parsedSearch = qs.parse(location.search);
    const title = constructTitle(parsedSearch);

    return (
      <DocumentTitle title={title}>
        <div className={css(styles.DefaultLayout)}>
          <HeaderContainer
            searchTerm={parsedSearch.q}
            searchQuery={qs.stringify(parsedSearch)}
            onSubmit={pushUrlQuery(push)}
          />
          <WrappedComponent
            searchTerm={parsedSearch.q}
            location={location}
            {...restProps}
          />
        </div>
      </DocumentTitle>
    );
  }
  component.displayName = `withBaseLayout(${getDisplayName(WrappedComponent)})`;
  return component;
}

const styles = StyleSheet.create({
  DefaultLayout: {
    flexDirection: 'column',
    display: 'flex',
    minHeight: '100vh',
  },
});

export default withBaseScreen;
