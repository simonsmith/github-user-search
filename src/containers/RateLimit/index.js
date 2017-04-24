import React from 'react';
import {
  css,
  StyleSheet,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';
import RateLimit from 'components/RateLimit';
import connect from './connect';

type Props = {
  coreLimit: ?number,
  coreRemaining: ?number,
  coreReset: ?string,
  searchLimit: ?number,
  searchRemaining: ?number,
  searchReset: ?string,
};

export function RateLimitContainer(props: Props) {
  const {
    coreLimit,
    coreRemaining,
    coreReset,
    searchLimit,
    searchRemaining,
    searchReset,
  } = props;

  return (
    <div className="u-flex u-flexAlignItemsCenter">
      <p className={css(styles.RateLimitContainer_label)}>API requests</p>
      <div
        className={`${css(styles.RateLimitContainer)} u-flex`}
      >
        <div className={css(styles.RateLimitContainer_item)}>
          <RateLimit
            label="Profile"
            remaining={coreRemaining}
            limit={coreLimit}
            reset={coreReset}
          />
        </div>
        <div className={css(styles.RateLimitContainer_item)}>
          <RateLimit
            label="Search"
            remaining={searchRemaining}
            limit={searchLimit}
            reset={searchReset}
          />
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  RateLimitContainer: {
    backgroundColor: '#333',
    color: '#eee',
    padding: '5px 8px',
    borderRadius: 5,
  },

  RateLimitContainer_label: {
    fontSize: 14,
    marginRight: 10,
  },

  RateLimitContainer_item: {
    ':first-child': {
      marginRight: 5,
    },

    ':last-child': {
      marginLeft: 5,
    },
  },
});

export default connect(RateLimitContainer);
