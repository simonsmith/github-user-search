import React from 'react';
import {connect} from 'react-fela';
import classNames from 'classnames';

type Props = {
  rootStyle?: any,
  children: any,
  noGutter: boolean,
  styles: Object,
};

function Container({
  noGutter,
  rootStyle,
  children,
  styles,
}: Props) {
  const className = classNames(
    styles.Container_inner,
    {[styles.Container_padding]: noGutter}
  );

  return (
    <div className={classNames(styles.Container_root, rootStyle)}>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}

Container.defaultProps = {
  noGutter: false,
};

const styles = {
  Container_root: () => ({
    margin: 0,
  }),

  Container_inner: () => ({
    margin: '0 auto',
    maxWidth: 1020,
  }),

  Container_padding: () => ({
    paddingLeft: 10,
    paddingRight: 10,

    '@media (min-width: 1050px)': {
      padding: 0,
    },
  }),
};

export default connect(styles)(Container);
