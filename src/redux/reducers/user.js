// Esse reducer será responsável por tratar as informações da pessoa usuária

export const INITIAL_STATE = {
  email: '',
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_PAGE':
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};
