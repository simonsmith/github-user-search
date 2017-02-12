import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';

type Props = {
  extraStyle: any,
  children: any,
};

export default function Container({extraStyle, children}: Props) {
  return (
    <div className={css(extraStyle)}>
      <div className={css(styles.Container_inner)}>
        {children}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  Container_inner: {
    margin: '0 auto',
    maxWidth: 1060,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
