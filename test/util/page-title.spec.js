import pageTitle from 'util/page-title';

describe('Util: pageTitle', () => {
  it('should return the base title by default', () => {
    expect(pageTitle()).toEqual('Github user search');
  });

  it('should prepend the title', () => {
    expect(pageTitle('test')).toEqual('test - Github user search');
  });
});
