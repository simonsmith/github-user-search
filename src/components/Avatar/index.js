// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import Image from 'components/Image';

type Props = {
  url: string,
  name: string,
  width: number,
};

export default function Avatar({url, name, width}: Props) {
  return (
    <Image
      className={css(styles.Avatar)}
      src={`${url}&s=${width * 2}`}
      alt={`${name}'s avatar`}
      width={width}
    />
  );
}

const styles = StyleSheet.create({
  Avatar: {
    borderRadius: 8,
  },
});
