import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, sumTotal } = this.props;
    return (
      <div>
        <header className="header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbfOAAHLPkNzrVBA3fILQPq1kb9mUImU5jg&usqp=CAU"
            alt="logo trybe"
            className="img"
          />
          <div className="header-cash">
            <h3 data-testid="email-field" className="first">{`User: ${email}` }</h3>
            <h3 data-testid="header-currency-field" className="second">BRL </h3>
            <h3 data-testid="total-field" className="third">{sumTotal.toFixed(2)}</h3>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sumTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  sumTotal: state.wallet.sumTotal,
});

export default connect(mapStateToProps)(Header);
