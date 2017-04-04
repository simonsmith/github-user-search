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
import Loading from 'components/Loading';
import connect from './connect';

type Props = {
  getProfile: Function,
  isPending: boolean,
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
    if (this.props.isPending) {
      return (
        <div className={css(styles.Profile_wrapLoading)}>
          <Loading />;
        </div>
      );
    }

    return (
      <div className={css(styles.Profile_container)}>
        <ProfileHeader {...this.props.userProfile} />
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

  Profile_container: {
    paddingTop: 15,
  },
});

export default connect(ProfileContainer);
