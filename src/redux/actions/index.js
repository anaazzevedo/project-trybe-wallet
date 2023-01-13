export const LOGIN_PAGE = 'LOGIN_PAGE';
export const COINS = 'COINS';
export const LOADING = 'LOADING';
export const USER_VALUES = 'USER_VALUES';
export const SUM = 'SUM';

export const getCoinAPI = (currencies) => ({
  type: COINS,
  payload: currencies,
});

export const loginPageInitial = (payload) => ({
  type: LOGIN_PAGE,
  payload,
});

// export const sum = () => ({
//   type: SUM,
// });

// export const error = () => ({
//   type: ERROR,
// });

// export const loading = () => ({
//   type: LOADING,
// });

export const userValues = (expenses) => ({
  type: USER_VALUES,
  payload: expenses,
});
