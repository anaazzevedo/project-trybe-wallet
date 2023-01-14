export const LOGIN_PAGE = 'LOGIN_PAGE';
export const COINS = 'COINS';
export const LOADING = 'LOADING';
export const USER_VALUES = 'USER_VALUES';
export const SUM = 'SUM';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EXCHANGE = 'EXCHANGE';

export const getCoinAPI = (currencies) => ({
  type: COINS,
  payload: currencies,
});

export const loginPageInitial = (payload) => ({
  type: LOGIN_PAGE,
  payload,
});

export function deleteExpenses(payload) {
  return {
    type: DELETE_EXPENSES,
    payload,
  };
}

export function sumCurrencies(payload) {
  return {
    type: SUM,
    payload,
  };
}

// export const userValues = (expenses) => ({
//   type: USER_VALUES,
//   payload: expenses,
// });

export function walletData() {
  return {
    type: 'WALLET_DATA',
  };
}

export function userValues(expenses) {
  return async (dispatch) => {
    dispatch(walletData());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch({
      type: USER_VALUES,
      payload: {
        expenses,
        data,
      },
    });
    dispatch(sumCurrencies());
  };
}
