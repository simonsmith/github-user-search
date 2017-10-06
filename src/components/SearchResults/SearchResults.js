// @flow

import React from 'react';
import map from 'lodash/fp/map';
import {connect} from 'react-fela';
import User from 'components/User/User';

type Props = {
  entities: Object,
  ids: Array<number>,
  styles: Object,
};

function SearchResults({entities, ids, styles}: Props) {
  return (
    <ul className={styles.root}>
      {map(item => {
        const {id} = entities[item];
        return (
          <li key={id} className={styles.item}>
            <User {...entities[id]} />
          </li>
        );
      }, ids)}
    </ul>
  );
}

const MQ = '@media (min-width: 600px)';

const styles = {
  root: () => ({
    paddingLeft: 3,

    [MQ]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),

  item: () => ({
    marginBottom: 15,

    [MQ]: {
      flexBasis: 'calc(100% / 3)',
    },
  }),
};

export default connect(styles)(SearchResults);
