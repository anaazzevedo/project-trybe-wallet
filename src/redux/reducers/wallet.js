import { LOADING, COINS } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
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

  default:
    return state;
  }
};
