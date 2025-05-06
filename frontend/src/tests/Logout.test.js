import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/Store.jsx';

describe('Logout Integration', () => {
  it('allows a user to log out', async () => {
    const { container } = render(
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BrowserRouter>
          </Provider>
    );
    // Simulate login first
    fireEvent.change(container.querySelector('#user_name'), { target: { value: 'Test123' } });
    fireEvent.change(container.querySelector('#user_password'), { target: { value: 'Test123' } });
   fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => expect(screen.getByText(/Home/i)).toBeInTheDocument());
    // Now click logout
    fireEvent.click(screen.getByTestId('LogoutIcon'));
    await waitFor(() => expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument());
  });
});
