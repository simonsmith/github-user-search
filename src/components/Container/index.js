import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

type Props = {
  rootStyle: any,
  children: any,
  noGutter: boolean
};

export default function Container({noGutter, rootStyle, children}: Props) {
  const className = css(
    styles.Container_inner,
    noGutter ? false : styles.Container_padding,
  );

  return (
    <div className={css(rootStyle)}>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}

Container.defaultProps = {
  noGutter: false,
};

const styles = StyleSheet.create({
  Container_inner: {
    margin: '0 auto',
    maxWidth: 980,
  },

  Container_padding: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
