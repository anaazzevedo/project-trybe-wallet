import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
            expenses.map((expense, index) => (
              // <tr key={ expense.id }>
              <tr key={ index }>
                <td>{expense.value}</td>
                <th>{expense.currency}</th>
                <th>{expense.method}</th>
                <td>{expense.description}</td>
                <th>{expense.tag}</th>
                {/* <th>{}</th>
                <th>{}</th>
                <th>{}</th> */}
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
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
