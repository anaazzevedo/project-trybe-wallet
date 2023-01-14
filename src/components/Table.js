import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch, expenses } = this.props;
    const state = expenses.filter((expense) => expense.id !== id);
    console.log(state, id);
    dispatch(deleteExpenses(state));
  };

  convertedValue = (value) => {
    const converted = +value.exchangeRates[value.currency].ask * +value.value;
    return converted.toFixed(2);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table width="100%" border="1.5">
        <thead>
          <tr>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <th>{expense.value}</th>
                <th>{expense.currency}</th>
                <th>{expense.method}</th>
                <th>{expense.description}</th>
                <th>{expense.tag}</th>
                <th>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</th>
                <th>{this.convertedValue(expense)}</th>
                <th>{expense.exchangeRates[expense.currency].name}</th>
                <td>
                  <button type="button">Editar despesa</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
