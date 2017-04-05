// @flow

import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import classNames from 'classnames';
import 'css/utils/img.css';
import LoadingSpinner from 'components/Loading/loading.svg';

type Props = {
  minHeight: number,
  className?: string,
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
        className={css(styles.Image_spinner)}
        width={28}
        height={28}
      />
    );
  }

  render() {
    const {
      minHeight,
      className,
      ...restProps
    } = this.props;
    const imgClassName = classNames(
      className,
      'u-imgResponsive'
    );

    return (
      <div
        className={css(styles.Image)}
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

const styles = StyleSheet.create({
  Image: {
    position: 'relative',
  },

  Image_spinner: {
    left: '50%',
    top: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
});

export default Image;
