// @flow

import React from 'react';
import qs from 'query-string';
import {Route} from 'react-router-dom';
import curry from 'lodash/fp/curry';
import DefaultLayout from 'components/DefaultLayout/DefaultLayout';
import {PER_PAGE} from 'store/api';

type Props = {
  component: Function,
};

export const pushUrlQuery = curry((push: Function, query: string) => {
  push({
    pathname: '/search',
    search: `per_page=${PER_PAGE}&page=1&q=${query}`,
  });
});

export default function MainScreen(props: Props) {
  const {
    component,
    ...restProps
  } = props;
  return (
    <Route
      {...restProps}
      render={matchProps => {
        const {
          location,
          history: {push},
        } = matchProps;
        const parsedSearch = qs.parse(location.search);
        const searchTerm = parsedSearch.q;

        return (
          <DefaultLayout
            onSearchSubmit={pushUrlQuery(push)}
            searchTerm={searchTerm}
            searchQuery={qs.stringify(parsedSearch)}
            component={component}
            matchProps={matchProps}
          />
        );
      }}
    />

  );
}
