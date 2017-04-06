// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import Image from 'components/Image';

type Props = {
  url: string,
  name: string | null,
  width: number,
};

export default function Avatar({url, name, width}: Props) {
  const alt = name ? `${name}'s avatar` : 'User avatar';
  return (
    <Image
      className={css(styles.Avatar)}
      src={`${url}&s=${width * 2}`}
      alt={alt}
      width={width}
    />
  );
}

const styles = StyleSheet.create({
  Avatar: {
    borderRadius: 8,
  },
});
