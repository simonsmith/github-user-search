// @flow

import React from 'react';
import {connect} from 'react-fela';
import {Link} from 'react-router-dom';
import Avatar from 'components/Avatar';

type Props = {
  login: string,
  avatar_url: string,
  styles: any,
};

function User({login, avatar_url, styles}: Props) {
  return (
    <Link
      to={login}
      className={styles.User_root}
    >
      <div className={styles.User_avatar}>
        <Avatar
          url={avatar_url}
          name={login}
          width={90}
        />
      </div>
      <p className={styles.User_username}>{login}</p>
    </Link>
  );
}

const styles = {
  User_root: () => ({
    color: 'inherit',
    display: 'flex',
  }),

  User_avatar: () => ({
    marginRight: '15px',
  }),

  User_username: () => ({
    fontSize: '20px',
  }),
};

export default connect(styles)(User);
