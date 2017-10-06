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
      className={styles.root}
    >
      <div className={styles.avatar}>
        <Avatar
          url={avatar_url}
          name={login}
          width={90}
        />
      </div>
      <p className={styles.username}>{login}</p>
    </Link>
  );
}

const styles = {
  root: () => ({
    color: 'inherit',
    display: 'flex',
  }),

  avatar: () => ({
    marginRight: '15px',
  }),

  username: () => ({
    fontSize: '20px',
  }),
};

export default connect(styles)(User);
