import {mapDispatchToProps} from 'containers/Header/connect';
import {isFSA} from 'flux-standard-action';

describe('HeaderConnect: mapDispatchToProps', () => {

  describe('when dispatching an action', () => {
    it('should conform to FSA', () => {
      const fakeDispatch = jest.fn();
      mapDispatchToProps(fakeDispatch).searchForUser('simonsmith');
      expect(isFSA(fakeDispatch.mock.calls[0][0])).toBeTruthy();
    });
  });

});
