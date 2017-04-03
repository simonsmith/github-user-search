// @flow

export default function linkify(str: string): string {
  return str.replace(/@(\w+)/g, '<a href="http://github.com/$1">@$1</a>');
}
