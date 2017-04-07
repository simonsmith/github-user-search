// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import {Link} from 'react-router-dom';
import 'suitcss-utils-flex/lib/flex.css';
import Avatar from 'components/Avatar';

type Props = {
  login: string,
  avatar_url: string,
};

export default function User({login, avatar_url}: Props) {
  return (
    <Link
      to={login}
      className={`${css(styles.User)} u-flex`}
    >
      <div className={css(styles.User_wrapAvatar)}>
        <Avatar
          url={avatar_url}
          name={login}
          width={90}
        />
      </div>
      <p className={css(styles.User_username)}>{login}</p>
    </Link>
  );
}

const styles = StyleSheet.create({
  User: {
    color: 'inherit',
  },

  User_wrapAvatar: {
    marginRight: 15,
  },

  User_username: {
    fontSize: 20,
  },
});
