import { LOADING, COINS, USER_VALUES } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: false,
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      loading: true,
    };

  case COINS:
    return {
      ...state,
      loading: false,
      currencies: action.payload,
    };

  case USER_VALUES:
    return {
      ...state,
      loading: false,
      expenses:
        [...state.expenses,
          {
            value: action.payload.valueUser,
            currency: action.payload.currency,
            description: action.payload.description,
            method: action.payload.method,
            tag: action.payload.tag,
            id: action.payload.id,
          },
        ],
    };

  default:
    return state;
  }
};
