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
import ItemList from 'components/ItemList';
import User from 'components/User';
import Repo from 'components/Repo';
import Loading from 'components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';
import {viewport} from 'theme';
import 'suitcss-utils-flex/lib/flex-sm.css';
import 'suitcss-utils-size/lib/size-sm.css';
import 'suitcss-components-grid';
import connect from './connect';

type Props = {
  followerIds: Array<number>,
  followerIsPending: boolean,
  getProfile: Function,
  userIsPending: boolean,
  userProfile: Object,
  repoEntities: Object,
  repoIds: Array<number>,
  repoIsPending: boolean,
  userEntities: Object,
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
      followerIds,
      followerIsPending,
      userEntities,
    } = this.props;

    return (
      <div className={css(styles.Profile_container)}>
        <ErrorBoundary>
          <ProfileHeader {...this.props.userProfile} />
        </ErrorBoundary>
        <div className={`${css(styles.Profile_content)} Grid Grid--withGutter`}>
          <div className={`${css(styles.Profile_repos)} Grid-cell u-sm-size1of2`}>
            <h2 className={css(styles.Profile_contentTitle)}>Repositories</h2>
            <ErrorBoundary>
              <ItemList
                entities={repoEntities}
                ids={repoIds}
                isPending={repoIsPending}
                component={Repo}
              />
            </ErrorBoundary>
          </div>
          <div className="Grid-cell u-sm-size1of2">
            <h2 className={css(styles.Profile_contentTitle)}>Followers</h2>
            <ErrorBoundary>
              <ItemList
                entities={userEntities}
                ids={followerIds}
                isPending={followerIsPending}
                component={User}
              />
            </ErrorBoundary>
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

  Profile_repos: {
    marginBottom: 20,

    [viewport.SM]: {
      marginBottom: 0,
    },
  },

  Profile_contentTitle: {
    fontSize: 22,
    fontWeight: 400,
    marginBottom: 25,
  },

  Profile_content: {
    paddingTop: 20,
  },

  Profile_container: {
    paddingTop: 15,
  },
});

export default connect(ProfileContainer);
