import React, {
  Component,
} from 'react';
import get from 'lodash/fp/get';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import Container from 'components/Container';
import ProfileHeader from 'components/ProfileHeader';
import RepoList from 'components/RepoList';
import Loading from 'components/Loading';
import {viewport} from 'theme';
import 'suitcss-utils-flex/lib/flex-sm.css';
import connect from './connect';

type Props = {
  getProfile: Function,
  userIsPending: boolean,
  userProfile: Object,
  repoEntities: Object,
  repoIds: array<number>,
  repoIsPending: boolean,
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
      return (
        <div className={css(styles.Profile_wrapLoading)}>
          <Loading />
        </div>
      );
    }

    const {
      repoIsPending,
      repoEntities,
      repoIds,
    } = this.props;

    return (
      <div className={css(styles.Profile_container)}>
        <ProfileHeader {...this.props.userProfile} />
        <div className={`${css(styles.Profile_content)} u-sm-flex`}>
          <div className={`${css(styles.Profile_contentItem)} u-sm-flexGrow1`}>
            <h2 className={css(styles.Profile_contentTitle)}>Repositories</h2>
            <RepoList
              isPending={repoIsPending}
              entities={repoEntities}
              ids={repoIds}
            />
          </div>
          <div className={`${css(styles.Profile_contentItem)} u-sm-flexGrow1`}>
            <h2 className={css(styles.Profile_contentTitle)}>Followers</h2>
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
  Profile_wrapLoading: {
    marginTop: 25,
  },

  Profile_contentTitle: {
    fontSize: 22,
    fontWeight: 400,
    marginBottom: 25,
  },

  Profile_content: {
    paddingTop: 20,
  },

  Profile_contentItem: {
    [viewport.SM]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },

  Profile_container: {
    paddingTop: 15,
  },
});

export default connect(ProfileContainer);
