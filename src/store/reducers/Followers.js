import assignAll from 'lodash/fp/assignAll';

const initialState = {
  error: null,
  isPending: true,
  result: [],
};

export default function followersReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'FOLLOWERS_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'FOLLOWERS_SUCCESS':
      return assignAll([
        state,
        {
          error: null,
          isPending: false,
          result: action.payload.result,
        },
      ]);

    case 'FOLLOWERS_FAILURE': {
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

