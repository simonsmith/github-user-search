// @flow

import React, {
  Component,
} from 'react';
import {connect} from 'react-fela';
import SearchIcon from './search.svg';

type Props = {
  onSubmit: Function,
  initialInputValue: string,
  styles: Object,
};

type State = {
  inputValue: string,
};

export class SearchForm extends Component {

  props: Props;
  state: State;

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
      <form
        className={styles.root}
        onSubmit={this.handleOnSubmit}
      >
        <label
          className="u-hiddenVisually"
          htmlFor="searchInput"
        >
          Search for a user
        </label>
        <input
          className={styles.input}
          type="text"
          id="searchInput"
          placeholder="Search for a user, e.g. simonsmith"
          value={this.state.inputValue}
          onChange={this.handleOnChange}
        />
        <button
          className={styles.button}
          type="submit"
        >
          <SearchIcon width={22} height={24} />
          <span className="u-hiddenVisually">Submit</span>
        </button>
      </form>
    );
  }
}

const styles = {
  root: () => ({
    position: 'relative',
  }),

  input: () => ({
    padding: '8px',
    paddingRight: '40px',
    width: '100%',
    border: '1px solid #bbb',
    boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, .1);',
  }),

  button: () => ({
    padding: '3px 14px',
    position: 'absolute',
    top: '4px',
    right: '0',
  }),
};

export default connect(styles)(SearchForm);
