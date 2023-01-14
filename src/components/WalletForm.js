import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCoinAPI,
  userValues,
} from '../redux/actions/index';
import './Wallet.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valueUser: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  componentDidMount() {
    this.savedCoins();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(userValues(this.state));
    this.setState((prev) => ({
      valueUser: '',
      description: '',
      id: prev.id + 1,
    }));
  };

  savedCoins = async () => {
    const { dispatch } = this.props;
    const require = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await require.json();
    delete response.USDT;
    const coinsApi = Object.keys(response);
    dispatch(getCoinAPI(coinsApi));
  };

  render() {
    const { coins } = this.props;
    const { valueUser, description, currency, method, tag } = this.state;
    return (
      <div>
        <form className="form">
          <label htmlFor="input-valor" className="label">
            Valor:
            <input
              type="number"
              value={ valueUser }
              name="valueUser"
              data-testid="value-input"
              className="all value"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="select-moeda" className="label">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              className="all"
              onChange={ this.handleChange }
            >
              {
                coins.map((coin) => (
                  <option key={ coin } value={ coin }>
                    { coin }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="select-metodo" className="label">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              className="all"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="input-descricao" className="label">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
              value={ description }
              className="all description"
            />
          </label>

          <label htmlFor="select-categoria" className="label">
            Categoria:
            <select
              data-testid="tag-input"
              className="all"
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="submit"
            className="btn"
            onClick={ this.onSaveButtonClick }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  coins: PropTypes.array,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
