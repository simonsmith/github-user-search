// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-fela';
import GitHubIcon from './mark-github.svg';

type Props = {
  styles: Object,
};

function Logo({styles}: Props) {
  return (
    <div>
      <h1 className={styles.Logo_title}>
        <Link
          to="/"
          className={styles.Logo_link}
        >
          <GitHubIcon
            className={styles.Logo_icon}
            width={24}
            height={24}
          />
          GitHub User Search
        </Link>
      </h1>
      <p className={styles.Logo_subTitle}>
        Browse users and their profiles via <a href="https://developer.github.com/v3/">the GitHub API</a>
      </p>
    </div>
  );
}

const styles = {
  Logo_icon: () => ({
    marginRight: '8px',
  }),

  Logo_title: () => ({
    fontSize: '25px',
  }),

  Logo_link: () => ({
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
  }),

  Logo_subTitle: () => ({
    marginTop: '5px',
    fontSize: '14px',
  }),
};

export default connect(styles)(Logo);
