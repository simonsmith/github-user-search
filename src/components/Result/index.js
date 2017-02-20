// @flow

import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import {Utils} from 'theme';
import Image from 'components/Image';

type Props = {
  username: string,
  avatarUrl: string,
};

function Result({username, avatarUrl}: Props) {
  return (
    <div>
      <Image
        className={css(styles.Result_img, Utils.responsiveImg)}
        src={`${avatarUrl}&s=225`}
        alt={username}
        width={140}
        height={140}
      />
    </div>
  );
}

Result.propTypes = {
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  Result: {
    position: 'relative',
  },

  Result_img: {
    display: 'block',
  },
});

export default Result;
