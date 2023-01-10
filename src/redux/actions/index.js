// import fetchCoins from '../../servises/coinsAPI';
// Coloque aqui suas actions
export const LOGIN_PAGE = 'LOGIN_PAGE';
export const COINS = 'COINS';
export const LOADING = 'LOADING';

export const getCoinAPI = (currencies) => ({
  type: COINS,
  payload: currencies,
});

// export function getCoinAPI() {
//   return async (dispatch) => {
//     dispatch({
//       type: LOADING,
//     });
//     try {
//       coins = await fetchCoins();
//       dispatch({
//         type: COINS,
//         payload: coins,
//       });
//     } catch (error) {
//       dispatch();
//     }
//   };
// }

export const loginPageInitial = (payload) => ({
  type: LOGIN_PAGE,
  payload,
});
