import assignAll from 'lodash/fp/assignAll';

const initialState = {
  error: null,
  isPending: true,
  userProfile: {},
};

export default function profileReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'PROFILE_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'PROFILE_SUCCESS':
      return assignAll([
        state,
        {isPending: false, userProfile: action.payload},
      ]);

    case 'PROFILE_FAILURE': {
      if (!action.error) {return state;}
      return assignAll([
        state,
        {
          isPending: false,
          error: action.payload,
        },
      ]);
    }

    default:
      return state;

  }
}
