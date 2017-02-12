// @flow

import React, {
  PropTypes,
} from 'react';

type Props = {
  username: string,
  avatarUrl: string,
};

function Result({username, avatarUrl}: Props) {
  return (
    <div>
      <p>{username}</p>
      <img
        src={avatarUrl}
        alt={username}
        width={130}
        height={130}
      />
    </div>
  );
}

Result.propTypes = {
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default Result;
