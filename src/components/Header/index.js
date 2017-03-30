// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import SearchForm from 'components/SearchForm';
import Logo from 'components/Logo';
import {viewport} from 'theme';
import 'suitcss-utils-flex/lib/flex-sm.css';

type Props = {
  onSubmit: Function,
  searchTerm: string,
};

export default function Header({onSubmit, searchTerm}: Props) {
  return (
    <div
      className={`${css(styles.Header)} u-sm-flex u-sm-flexJustifyBetween u-sm-flexAlignItemsCenter`}
    >
      <div className="u-sm-flexGrow2">
        <Logo />
      </div>
      <div className={`${css(styles.Header_form)} u-sm-flexGrow1`}>
        <SearchForm
          onSubmit={onSubmit}
          initialInputValue={searchTerm}
        />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  Header: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  Header_form: {
    marginTop: 20,

    [viewport.SM]: {
      margin: 0,
    },
  },
});
