import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginPageInitial } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
    this.enabledButton = this.enabledButton.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enabledButton());
  };

  enabledButton = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validLogin = regex.test(email);
    const num = 6;
    if (validLogin && password.length >= num) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  getEmail = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginPageInitial(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div className="login">
        <form className="form-login">
          <h1 className="h1">TrybeWallet</h1>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="email"
              value={ email }
              name="email"
              id="email"
              onChange={ this.handleChange }
              className="input-email"
              placeholder="Digite seu e-mail"
            />
          </label>

          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              value={ password }
              name="password"
              id="password"
              onChange={ this.handleChange }
              className="input-pass"
              placeholder="Digite sua senha"
            />
          </label>

          <button
            className="button"
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ this.getEmail }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
