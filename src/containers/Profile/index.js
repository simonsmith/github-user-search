import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
} from 'aphrodite/no-important';
import Container from 'components/Container';
import connect from './connect';

type Props = {
  match: Object,
  getProfile: Function,
};

export class ProfileContainer extends Component {

  static propTypes = {
    match: PropTypes.object,
    getProfile: PropTypes.func,
  };

  constructor(props: Props) {
    super(props);
    this.requestProfile(props.match.url);
  }

  requestProfile(url: string): void {
    if (!url) {return;}
    const username = url.match(/\w+/)[0];
    this.props.getProfile(username);
  }

  componentDidUpdate(nextProps: Props) {
    this.requestProfile(nextProps.match.url);
  }

  render() {
    return (
      <Container>
        Profile here
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});

export default connect(ProfileContainer);
