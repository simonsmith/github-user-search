// @flow

import React from 'react';
import parse from 'date-fns/parse';
import distanceInWords from 'date-fns/distance_in_words';
import {connect} from 'react-fela';
import ForkIcon from './repo-forked.svg';
import StarIcon from './star.svg';

type Props = {
  description: string | null,
  fork: boolean,
  html_url: string,
  language: string | null,
  name: string,
  stargazers_count: number,
  pushed_at: string,
  forks_count: number,
  styles: Object,
};

function renderFooterItem(Icon: any, text: number | string, styles: Object): React$Element<*> {
  return (
    <div className={styles.Repo_footerItem}>
      <Icon
        className={styles.Repo_footerIcon}
        width={18}
        height={18}
      />
      <p>{text}</p>
    </div>
  );
}

function Repo(props: Props) {
  const {
    description,
    fork,
    html_url,
    language,
    name,
    stargazers_count,
    pushed_at,
    forks_count,
    styles,
  } = props;

  const pushedDate = distanceInWords(parse(pushed_at), new Date());

  return (
    <div>
      <p className={styles.Repo_name}>
        <a href={html_url}>{name}</a>
        {fork
          ? <span className={styles.Repo_fork}>(fork)</span>
          : null
        }
      </p>
      {description
        ? <p className={styles.Repo_desc}>{description}</p>
        : null
      }
      <div className={styles.Repo_footer}>
        {language
          ? <p className={styles.Repo_footerItem}>{language}</p>
          : null
        }
        {renderFooterItem(StarIcon, stargazers_count, styles)}
        {renderFooterItem(ForkIcon, forks_count, styles)}
        <p className={styles.Repo_pushDate}>last push {pushedDate} ago</p>
      </div>
    </div>
  );
}

const styles = {
  Repo_footerItem: () => ({
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
  }),

  Repo_footerIcon: () => ({
    marginRight: '3px',
  }),

  Repo_footer: () => ({
    color: '#666',
    marginTop: '35px',
    fontSize: '13px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  }),

  Repo_fork: () => ({
    fontSize: '12px',
    marginLeft: '5px',
    color: '#666',
  }),

  Repo_pushDate: () => ({
    marginLeft: 'auto',
  }),

  Repo_name: () => ({
    marginBottom: '10px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'baseline',
  }),

  Repo_desc: () => ({
    fontSize: '14px',
    lineHeight: '1.4',
  }),
};

export default connect(styles)(Repo);
