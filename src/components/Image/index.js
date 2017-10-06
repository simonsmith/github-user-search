// @flow

import React, {
  Component,
} from 'react';
import {connect} from 'react-fela';
import classNames from 'classnames';
import 'css/utils/img.css';
import LoadingSpinner from 'components/Loading/loading.svg';

type Props = {
  minHeight: number,
  className?: string,
  styles: Object,
};

type State = {
  status: string,
};

class Image extends Component {

  props: Props;
  state: State;

  static defaultProps = {
    minHeight: 60,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }

  onImageLoad = () => {
    this.setState(() => ({
      status: 'loaded',
    }));
  }

  renderSpinner() {
    if (this.state.status === 'loaded') {return null;}
    return (
      <LoadingSpinner
        className={this.props.styles.spinner}
        width={28}
        height={28}
      />
    );
  }

  render() {
    const {
      minHeight,
      className,
      styles,
      ...restProps
    } = this.props;
    const imgClassName = classNames(
      className,
      styles.img
    );

    return (
      <div
        className={styles.root}
        style={{minHeight}}
      >
        <img
          alt=""
          className={imgClassName}
          {...restProps}
          onLoad={this.onImageLoad}
        />
        {this.renderSpinner()}
      </div>
    );
  }

}

const styles = {
  root: () => ({
    position: 'relative',
  }),

  spinner: () => ({
    left: '50%',
    top: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  }),

  img: () => ({
    display: 'block',
    minWidth: '100%',
    height: 'auto',
  }),
};

export default connect(styles)(Image);
