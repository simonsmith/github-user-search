// @flow

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import {Utils} from '../theme';

type Props = {
  onSubmit: Function,
  initialInputValue: string,
};

type State = {
  inputValue: string,
};

class SearchForm extends Component {

  props: Props;
  state: State;

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialInputValue: PropTypes.string.isRequired,
  };

  static defaultProps = {
    initialInputValue: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: this.props.initialInputValue,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.initialInputValue !== this.props.initialInputValue) {
      this.setInputValueState(nextProps.initialInputValue);
    }
  }

  setInputValueState(inputValue: string): void {
    this.setState(() => ({inputValue}));
  }

  handleOnChange = (event: Object): void => {
    event.persist();
    this.setInputValueState(event.target.value);
  }

  handleOnSubmit = (event: Object): void => {
    event.preventDefault();
    if (!this.state.inputValue) {return;}
    this.props.onSubmit(this.state.inputValue);
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <label
          className={css(Utils.hiddenVisually)}
          htmlFor="searchInput"
        >
          Search for a user
        </label>
        <input
          type="text"
          id="searchInput"
          value={this.state.inputValue}
          onChange={this.handleOnChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SearchForm;
