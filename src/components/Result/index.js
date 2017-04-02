// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import {Link} from 'react-router-dom';
import Image from 'components/Image';

type Props = {
  username: string,
  avatarUrl: string,
};

function Result({username, avatarUrl}: Props) {
  return (
    <Link
      to={username}
      className={css(styles.Result)}
    >
      <Image
        className={css(styles.Result_img)}
        src={`${avatarUrl}&s=225`}
        alt={username}
        width={140}
        height={140}
      />
      <div className={`${css(styles.Result_userInfo)} userinfo`}>
        <p className={css(styles.Result_username)}>{username}</p>
      </div>
    </Link>
  );
}

const styles = StyleSheet.create({
  Result: {
    position: 'relative',
    display: 'block',

    ':hover .userinfo': {
      opacity: 1,
    },
  },

  Result_img: {
    opacity: 0.8,
    transition: 'opacity .25s ease-in-out',
    // Stop images shifting on hover
    '-webkit-backface-visibility': 'hidden',

    ':hover': {
      opacity: 1,
    },
  },

  Result_username: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 400,
  },

  Result_userInfo: {
    transition: 'opacity .25s ease-in-out',
    opacity: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    bottom: 0,
    left: 0,
    padding: '12px 10px',
    position: 'absolute',
    width: '100%',
  },
});

export default Result;
