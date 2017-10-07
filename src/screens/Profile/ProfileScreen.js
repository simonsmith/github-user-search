// @flow

import React from 'react';
import DocumentTitle from 'react-document-title';
import pageTitle from 'util/page-title';
import ProfileContainer from 'containers/Profile';

function ProfileScreen(matchProps: Object) {
  const {match} = matchProps;
  const title = pageTitle(`${match.params.username}'s profile`);

  return (
    <DocumentTitle title={title}>
      <ProfileContainer {...matchProps} />
    </DocumentTitle>
  );
}

export default ProfileScreen;
