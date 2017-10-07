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

function UserList({entities, ids, styles}: Props) {
  return (
    <ul className={styles.UserList_root}>
      {map(item => {
        const {id} = entities[item];
        return (
          <li key={id} className={styles.UserList_item}>
            <User {...entities[id]} />
          </li>
        );
      }, ids)}
    </ul>
  );
}

const MQ = '@media (min-width: 600px)';

const styles = {
  UserList_root: () => ({
    paddingLeft: '3px',

    [MQ]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),

  UserList_item: () => ({
    marginBottom: '15px',

    [MQ]: {
      flexBasis: 'calc(100% / 3)',
    },
  }),
};

export default connect(styles)(UserList);
