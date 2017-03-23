import {mapDispatchToProps} from 'containers/Profile/connect';
import {isFSA} from 'flux-standard-action';

describe('ProfileConnect: mapDispatchToProps', () => {

  describe('when dispatching an action', () => {
    it('should conform to FSA', () => {
      const fakeDispatch = jest.fn();
      mapDispatchToProps(fakeDispatch).getProfile('simonsmith');
      expect(isFSA(fakeDispatch.mock.calls[0][0])).toBeTruthy();
    });
  });

});
