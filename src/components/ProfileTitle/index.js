// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';

type Props = {
  userLink: string,
  username: string,
  name: string | null,
};

export default function ProfileTitle(props: Props) {
  const {
    name,
    username,
    userLink,
  } = props;

  return (
    <div className="u-flex u-flexWrap u-flexAlignItemsBaseline">
      {name
        ? <h1 className={css(styles.ProfileTitle_name)}>{name}</h1>
        : null
      }
      <p className={css(styles.ProfileTitle_username)}>
        <a href={userLink}>@{username}</a>
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  ProfileTitle_username: {
    color: '#555',
  },

  ProfileTitle_name: {
    marginRight: 5,
    fontSize: 28,
  },
});

