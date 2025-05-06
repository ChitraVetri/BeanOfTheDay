// Mock jwt-decode before imports
jest.mock('jwt-decode', () => ({
  jwtDecode: () => ({
    user_name: 'testuser',
    user_id: '123456'
  })
}));

// Mock axios with factory function
jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: [] })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    }))
  };
});

// Mock the axios instance module directly
jest.mock('../api/axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  };
});

// Import dependencies
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosInstance from '../api/axios';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import store from '../redux/Store.jsx';

describe('Bean Search', () => {
  const mockBeans = [
    {
      Id: 1,
      Name: 'TURNABOUT',
      Country: 'Brazil',
      Description: 'Fruity and bold',
      Cost: '£12.00',
      ImageUrl: '/img/bean1.jpg'
    }
  ];

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };

    // Create a valid JWT token
    const fakeJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0dXNlciIsInVzZXJfaWQiOiIxMjM0NTYiLCJpYXQiOjE2MTY3NjY3MDJ9.hMm_NbQv14z9Z3gVoHJVl3e_ugOg_BjnQJ9JKJOjAjA';
    
    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'isLoggedIn') return 'true';
      if (key === 'jwtToken') return fakeJwtToken;
      if (key === 'user') return 'testuser';
      return null;
    });
    
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Mock API responses for both axios instances
    const mockApiResponses = (mockFn) => {
      mockFn.mockImplementation(url => {
        if (url.includes('/beans/searchBean')) {
          return Promise.resolve({ data: mockBeans });
        }
        if (url.includes('/beans/bean-of-the-day')) {
          return Promise.resolve({
            data: {
              Name: 'ISONUS',
              Country: 'Vietnam',
              Description: 'Test bean description',
              Cost: '£18.57',
              ImageUrl: '/img/bean1.jpg'
            }
          });
        }
        return Promise.resolve({ data: [] });
      });
    };
    
    // Apply mocks to both axios instances
    mockApiResponses(axios.get);
    mockApiResponses(axiosInstance.get);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('searches for a bean by name from the header and displays the result', async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );

    // First login
    fireEvent.change(container.querySelector('#user_name'), { target: { value: 'Test123' } });
    fireEvent.change(container.querySelector('#user_password'), { target: { value: 'Test123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for home page to load after login
    await waitFor(() => {
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });

    // Find the header search input
    const searchInput = screen.getByPlaceholderText(/search beans/i);
    fireEvent.change(searchInput, { target: { value: 'TURNABOUT' } });

    // Find and click the header search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    // Wait for navigation and results to appear
    await waitFor(() => {
      expect(screen.getByText(/TURNABOUT/i)).toBeInTheDocument();
    });
  });
});