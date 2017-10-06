// @flow

import React from 'react';
import {connect} from 'react-fela';
import linkify from 'util/linkify';

type Props = {
  text: string | null,
  styles: Object,
};

function Bio({text, styles}: Props) {
  if (!text) {return null;}
  return (
    <p
      className={styles.Bio_root}
      dangerouslySetInnerHTML={{__html: linkify(text)}}
    />
  );
}

const styles = {
  Bio_root: () => ({
    fontSize: 16,
    lineHeight: 1.3,
  }),
};

export default connect(styles)(Bio);
