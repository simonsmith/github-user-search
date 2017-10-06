// @flow

import React from 'react';
import Image from 'components/Image';
import {connect} from 'react-fela';

type Props = {
  url: string,
  name: string | null,
  width: number,
  styles: Object,
};

function Avatar({url, name, width, styles}: Props) {
  const alt = name ? `${name}'s avatar` : 'User avatar';
  return (
    <Image
      className={styles.Avatar_img}
      src={`${url}&s=${width * 2}`}
      alt={alt}
      width={width}
    />
  );
}

const styles = {
  Avatar_img: () => ({
    borderRadius: '8px',
  }),
};

export default connect(styles)(Avatar);
