// @flow

import React, {
  Component,
} from 'react';
import Header from 'components/Header/Header';
import connect from './connect';

type Props = {
  onSubmit: Function,
  searchQuery: string,
  searchTerm: string,
  searchForUser: Function,
};

export class HeaderContainer extends Component {

  static defaultProps = {
    searchTerm: '',
  };

  constructor(props: Props) {
    super(props);
    this.handleSearchUser(props.searchQuery);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.searchQuery !== this.props.searchQuery) {
      this.handleSearchUser(nextProps.searchQuery);
    }
  }

  handleSearchUser(searchQuery: string): void {
    if (!searchQuery) {return;}
    this.props.searchForUser(searchQuery);
  }

  render() {
    const {
      onSubmit,
      searchTerm,
    } = this.props;

    return (
      <Header
        onSubmit={onSubmit}
        searchTerm={searchTerm}
      />
    );
  }

}

export default connect(HeaderContainer);
