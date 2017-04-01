import React, {
  Component,
} from 'react';
import get from 'lodash/fp/get';
// import {
//   StyleSheet,
// } from 'aphrodite/no-important';
import Container from 'components/Container';
import connect from './connect';

type Props = {
  getProfile: Function,
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
    return (
      <p>{this.props.userProfile.login}</p>
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

// const styles = StyleSheet.create({

// });

export default connect(ProfileContainer);
