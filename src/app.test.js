import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import Login from './pages/Login';
import WalletForm from './components/WalletForm';
import Header from './components/Header';
import Table from './components/Table';
import Wallet from './pages/Wallet';
import mockData from './tests/helpers/mockData';
import App from './App';

describe('Testa a página de login', () => {
  test('Testa se contém as informações corretas na página de Login', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const title = screen.getByRole('heading', { name: /trybewallet/i, level: 1 });
    const emailElement = screen.getByRole('textbox');
    const passwordElement = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    const email = 'fulano@gmail.com';
    const senha = 123456;
    const seg = 3000;

    userEvent.type(emailElement, email);
    userEvent.type(passwordElement, senha);
    userEvent.click(button);

    const { pathname } = history.location;
    setTimeout(() => {
      expect(pathname).toBe('/carteira');
    }, seg);
  });

  test('Testa botão está desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailElement = screen.getByRole('textbox');
    const passwordElement = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Verifica elementos da página /carteira', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input2 = screen.getByRole('textbox');
    const select3 = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(input2).toBeInTheDocument();
    expect(select3).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Testa se elementos são renderizados', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input1 = screen.getByTestId('value-input');
    const input2 = screen.getByRole('textbox');
    const select2 = screen.getByTestId('method-input');
    const select3 = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const num = 10;
    const seg = 3000;

    userEvent.type(input1, num);
    userEvent.type(input2, 'trybe');
    userEvent.type(select2, 'Dinheiro');
    userEvent.type(select3, 'Lazer');
    userEvent.click(button);

    setTimeout(() => {
      expect(num).toBeInTheDocument();
      expect('trybe').toBeInTheDocument();
      expect('Dinheiro').toBeInTheDocument();
      expect('Lazer').toBeInTheDocument();
    }, seg);
  });

  test('Verifica elementos do Header', () => {
    renderWithRouterAndRedux(<Header />);
    const total = screen.getByTestId('total-field');
    const img = screen.getByRole('img', { name: /logo trybe/i });

    expect(total).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test('Verifica elementos do Table', () => {
    renderWithRouterAndRedux(<Table />);
    const method = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const cambio = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const valorC = screen.getByRole('columnheader', { name: /valor convertido/i });
    const editar = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    const valor = screen.getByText('Valor');
    const moeda = screen.getByText('Moeda');

    expect(method).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(valorC).toBeInTheDocument();
    expect(editar).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
  });

  test('Verifica elementos do Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);
    const user = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const img = screen.getByRole('img', { name: /logo trybe/i });

    expect(user).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test('Verifica API', () => {
    renderWithRouterAndRedux(<Wallet />);
    const currencies = screen.getByTestId('header-currency-field');
    const seg = 3000;
    setTimeout(() => {
      expect(currencies).toHaveAttribute(Object.keys(mockData));
    }, seg);
  });

  test('Verifica elementos do App', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const seg = 3000;

    act(() => {
      history.push('carteira');
    });

    const user = screen.getByTestId('email-field');
    setTimeout(() => {
      expect(user).toBeInTheDocument();
    }, seg);
  });

  test('Testa button Adicionar', () => {
    renderWithRouterAndRedux(<Wallet />);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const moeda = screen.getByText(/moeda:/i);
    const valor = screen.getByRole('spinbutton');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const num = 10;
    userEvent.type(moeda, 'USD');
    userEvent.type(valor, num);
    userEvent.click(button);

    waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
  });
});
