import assignAll from 'lodash/fp/assignAll';

const initialState = {
  core: {},
  search: {},
};

export default function rateLimitReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'API_RATE_LIMIT_SUCCESS':
      return assignAll([
        state,
        {
          core: action.payload.core,
          search: action.payload.search,
        },
      ]);

    case 'API_RATE_LIMIT_FAILURE': {
      if (!action.error) {return state;}
      return assignAll([
        state,
        {
          payload: action.payload,
        },
      ]);
    }

    default:
      return state;

  }
}
