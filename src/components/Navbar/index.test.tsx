import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './index';
import { Provider } from 'react-redux';
import { store } from '../../store';

const onClick = jest.fn();

const App = () => render(
    <Provider store={store}>
        <Navbar
            login={"Login"}
            logout={onClick}
        />
    </Provider>

);

describe('Testing', () => {
    beforeEach(App)
    test('Testing Render', () => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    });
    test('Testing Button', () => {
        const button = screen.getByTestId('button-login');
        expect(button).not.toBeDisabled();
    });
});