// @flow

import React from 'react';
import {connect} from 'react-fela';

type Props = {
  userLink: string,
  username: string,
  name: string | null,
  styles: Object,
};

function ProfileTitle(props: Props) {
  const {
    name,
    username,
    userLink,
    styles,
  } = props;

  return (
    <div className={styles.ProfileTitle_root}>
      {name
        ? <h1 className={styles.ProfileTitle_name}>{name}</h1>
        : null
      }
      <p className={styles.ProfileTitle_username}>
        <a href={userLink}>@{username}</a>
      </p>
    </div>
  );
}

const styles = {
  ProfileTitle_root: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  }),

  ProfileTitle_username: () => ({
    color: '#555',
  }),

  ProfileTitle_name: () => ({
    marginRight: '5px',
    fontSize: '28px',
  }),
};

export default connect(styles)(ProfileTitle);
