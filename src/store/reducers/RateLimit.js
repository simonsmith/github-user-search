import assignAll from 'lodash/fp/assignAll';

const initialState = {
  error: null,
  core: {},
  search: {},
};

export default function rateLimitReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'API_RATE_LIMIT_SUCCESS':
      return assignAll([
        state,
        {
          error: null,
          core: action.payload.core,
          search: action.payload.search,
        },
      ]);

    case 'API_RATE_LIMIT_FAILURE': {
      if (!action.error) {return state;}
      return assignAll([
        state,
        {error: action.payload},
      ]);
    }

    default:
      return state;

  }
}
