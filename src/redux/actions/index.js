// Coloque aqui suas actions
export const LOGIN_PAGE = 'LOGIN_PAGE';

export const loginPageInitial = (email) => ({
  type: LOGIN_PAGE,
  payload: email,
});
