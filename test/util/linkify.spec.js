import linkify from 'util/linkify';

describe('Util: linkify', () => {
  it('should replace any @ user links', () => {
    expect(
      linkify('some @text that is @linked @cool')
    ).toEqual('some <a href="http://github.com/text">@text</a> that is <a href="http://github.com/linked">@linked</a> <a href="http://github.com/cool">@cool</a>');
  });
});
