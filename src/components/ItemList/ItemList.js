// @flow

import React from 'react';
import {connect} from 'react-fela';
import map from 'lodash/fp/map';
import Loading from 'components/Loading';

type Props = {
  entities: Object,
  component: ReactClass<*>,
  ids: Array<number>,
  isPending: boolean,
  styles: Object,
};

function ItemList(props: Props) {
  const {
    entities,
    ids,
    isPending,
    styles,
    component: Component,
  } = props;

  if (isPending) {
    return (
      <Loading />
    );
  }

  if (ids.length === 0) {
    return <p>No items to display</p>;
  }

  return (
    <ul>
      {map(id => {
        return (
          <li
            className={styles.ItemList_item}
            key={id}
          >
            <Component {...entities[id]} />
          </li>
        );
      }, ids)}
    </ul>
  );
}

const styles = {
  ItemList_item: () => ({
    borderBottom: '1px solid #ddd',
    marginBottom: '20px',
    paddingBottom: '20px',

    ':last-child': {
      marginBottom: '0',
      paddingBottom: '0',
      borderBottom: '0',
    },
  }),
};

export default connect(styles)(ItemList);
