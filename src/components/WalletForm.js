import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoinAPI } from '../redux/actions/index';
// import fetchCoins from '../servises/coinsAPI';
import './Wallet.css';

class WalletForm extends Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(getCoinAPI());
  //   // dispatch(getCoinAPI());
  // }

  componentDidMount() {
    this.savedCoins();
  }

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
    return (
      <div>
        <form className="form">
          <label htmlFor="input-valor" className="label">
            Valor:
            <input
              type="number"
              name="input-valor"
              id="input-valor"
              data-testid="value-input"
              className="all"
            />
          </label>

          <label htmlFor="select-moeda" className="label">
            Moeda:
            <select
              data-testid="currency-input"
              name="select-moeda"
              className="all"
            >
              {
                coins.map((coin, index) => (
                  <option key={ index } value={ coin } data-testid="currency-input">
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
              name="select-metodo"
              className="all"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="input-descricao" className="label">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="input-descricao"
              className="all"
            />
          </label>

          <label htmlFor="select-categoria" className="label">
            Categoria:
            <select
              data-testid="tag-input"
              name="select-categoria"
              className="all"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  loading: state.wallet.loading,
});

WalletForm.propTypes = {
  coins: PropTypes.array,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
