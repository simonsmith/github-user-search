// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import 'suitcss-utils-flex/lib/flex.css';
import isNull from 'lodash/fp/isNull';
import every from 'lodash/fp/every';
import linkify from 'util/linkify';
import LocationIcon from './location.svg';
import CompanyIcon from './organization.svg';
import LinkIcon from './link.svg';

type Props = {
  blog: string | null,
  company: string | null,
  location: string | null,
};

function renderIcon(Icon: any): React$Element<*> {
  return (
    <Icon
      className={css(styles.UserInfo_icon)}
      width={18}
      height={18}
    />
  );
}

function renderLocation(text: string | null): React$Element<*> | null {
  if (!text) {return null;}
  return (
    <li className={`${css(styles.UserInfo_item)} u-flex u-flexAlignItemsCenter`}>
      {renderIcon(LocationIcon)}
      <p className={css(styles.UserInfo_text)}>{text}</p>
    </li>
  );
}

function renderLink(link: string | null): React$Element<*> | null {
  if (!link) {return null;}
  return (
    <li className={`${css(styles.UserInfo_item)} u-flex u-flexAlignItemsCenter`}>
      {renderIcon(LinkIcon)}
      <p className={css(styles.UserInfo_text)}>
        <a href={link}>{link}</a>
      </p>
    </li>
  );
}

function renderCompany(text: string | null): React$Element<*> | null {
  if (!text) {return null;}
  return (
    <li className={`${css(styles.UserInfo_item)} u-flex u-flexAlignItemsCenter`}>
      {renderIcon(CompanyIcon)}
      <p
        className={css(styles.UserInfo_text)}
        dangerouslySetInnerHTML={{__html: linkify(text)}}
      />
    </li>
  );
}

const allNull = every(isNull);

export default function UserInfo({blog, company, location}: Props) {
  if (allNull([blog, company, location])) {return null;}

  return (
    <ul>
      {renderCompany(company)}
      {renderLocation(location)}
      {renderLink(blog)}
    </ul>
  );
}

UserInfo.defaultProps = {
  blog: null,
  company: null,
  location: null,
};

const styles = StyleSheet.create({
  UserInfo_item: {
    marginBottom: 6,
  },

  UserInfo_text: {
    fontSize: 14,
  },

  UserInfo_icon: {
    marginRight: 7,
  },
});
