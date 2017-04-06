// @flow

import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex-sm.css';
import Avatar from 'components/Avatar';
import Bio from 'components/Bio';
import ProfileInfo from 'components/ProfileInfo';
import Stats from 'components/Stats';
import ProfileTitle from 'components/ProfileTitle';
import {viewport} from 'theme';

type Props = {
  avatar_url: string,
  bio: string | null,
  blog: string | null,
  company: string | null,
  followers: number,
  following: number,
  html_url: string,
  id: number,
  location: string | null,
  login: string,
  name: string | null,
  public_repos: number,
};

export default class ProfileHeader extends Component {

  props: Props;

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.id !== this.props.id;
  }

  render() {
    const {
      avatar_url,
      bio,
      blog,
      company,
      followers,
      following,
      html_url,
      location,
      login,
      name,
      public_repos,
    } = this.props;

    const stats = {
      Followers: followers,
      Following: following,
      Repos: public_repos,
    };

    return (
      <div className="u-sm-flex">
        <div className={css(styles.ProfileHeader_avatar)}>
          <Avatar
            name={name}
            width={230}
            url={avatar_url}
          />
        </div>
        <div className="u-sm-flexGrow1 u-sm-flex u-sm-flexCol">
          <div className={css(styles.ProfileHeader_wrapTitle)}>
            <ProfileTitle
              name={name}
              username={login}
              userLink={html_url}
            />
          </div>
          <div className={css(styles.ProfileHeader_wrapBio)}>
            <Bio
              text={bio}
            />
          </div>
          <div className={css(styles.ProfileHeader_wrapUserInfo)}>
            <ProfileInfo
              location={location}
              company={company}
              blog={blog}
            />
          </div>
          <div className="u-sm-flexExpandTop">
            <Stats stats={stats} />
          </div>
        </div>
      </div>
    );
  }

}

const styles = StyleSheet.create({
  ProfileHeader_container: {
    paddingTop: 15,
  },

  ProfileHeader_wrapUserInfo: {
    marginBottom: 20,

    [viewport.SM]: {
      marginBottom: 0,
    },
  },

  ProfileHeader_wrapBio: {
    marginBottom: 8,
  },

  ProfileHeader_avatar: {
    marginBottom: 15,

    [viewport.SM]: {
      marginBottom: 0,
      marginRight: 20,
    },
  },

  ProfileHeader_wrapTitle: {
    marginBottom: 5,
  },
});
