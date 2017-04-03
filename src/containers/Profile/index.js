import React, {
  Component,
} from 'react';
import get from 'lodash/fp/get';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';
import 'suitcss-utils-flex/lib/flex-sm.css';
import Container from 'components/Container';
import Avatar from 'components/Avatar';
import Bio from 'components/Bio';
import UserInfo from 'components/UserInfo';
import ProfileTitle from 'components/ProfileTitle';
import {viewport} from 'theme';
import connect from './connect';

type Props = {
  getProfile: Function,
  userIsPending: boolean,
  userProfile: Object,
};

const getUsername = get('match.params.username');

export class ProfileContainer extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
    this.props.getProfile(getUsername(props));
  }

  componentWillReceiveProps(nextProps: Props) {
    const username = getUsername(this.props);
    const nextUsername = getUsername(nextProps);

    if (username !== nextUsername) {
      this.props.getProfile(nextUsername);
    }
  }

  renderProfile() {
    if (this.props.userIsPending) {
      return <p>Loading...</p>;
    }

    const {
      avatar_url,
      bio,
      blog,
      company,
      html_url,
      location,
      login,
      name,
    } = this.props.userProfile;

    return (
      <div className={css(styles.Profile_container)}>
        <div className="u-sm-flex">
          <div className={css(styles.Profile_avatar)}>
            <Avatar
              name={name}
              width={230}
              url={avatar_url}
            />
          </div>
          <div className="u-sm-flexGrow1">
            <div className={css(styles.Profile_wrapTitle)}>
              <ProfileTitle
                name={name}
                username={login}
                userLink={html_url}
              />
            </div>
            <div className={css(styles.Profile_wrapBio)}>
              <Bio
                text={bio}
              />
            </div>
            <div className={css(styles.Profile_wrapUserInfo)}>
              <UserInfo
                location={location}
                company={company}
                blog={blog}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Container>
        {this.renderProfile()}
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  Profile_container: {
    paddingTop: 15,
  },

  Profile_wrapBio: {
    marginBottom: 8,
  },

  Profile_avatar: {
    marginBottom: 15,

    [viewport.SM]: {
      marginBottom: 0,
      marginRight: 20,
    },
  },

  Profile_wrapTitle: {
    marginBottom: 5,
  },
});

export default connect(ProfileContainer);
