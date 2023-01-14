import { LOADING, COINS, USER_VALUES, DELETE_EXPENSES, SUM } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: false,
  sumTotal: 0,
};

const reducer = (state) => {
  const { expenses } = state;
  const sum = expenses.reduce((acc, curr) => {
    const cotação = (+curr.exchangeRates[curr.currency].ask * +curr.value) + acc;
    return cotação + acc;
  }, 0);
  return sum;
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return { ...state, loading: true };
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
            value: action.payload.expenses.valueUser,
            currency: action.payload.expenses.currency,
            description: action.payload.expenses.description,
            method: action.payload.expenses.method,
            tag: action.payload.expenses.tag,
            id: action.payload.expenses.id,
            exchangeRates: action.payload.data,
          },
        ],
    };
  case DELETE_EXPENSES: {
    return {
      ...state,
      expenses: action.payload,
    };
  }
  case SUM:
    return {
      ...state,
      sumTotal: reducer(state),
    };
  default:
    return state;
  }
};
