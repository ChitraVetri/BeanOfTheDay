import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BeanOfTheDay from '../components/BeanOfTheDay';
import axios from 'axios';

jest.mock('axios');

describe('BeanOfTheDay', () => {
  const mockBean = {
    Name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    flavor_profile: 'Floral, Tea-like',
    price: 18.5,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockBean });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders bean of the day info', async () => {
    render(<BeanOfTheDay />);
    await waitFor(() => {
      expect(screen.getByText('Bean of the Day')).toBeInTheDocument();
      expect(screen.getByText(mockBean.Name)).toBeInTheDocument();
      expect(screen.getByText(`Origin: ${mockBean.origin}`)).toBeInTheDocument();
      expect(screen.getByText(`Flavor: ${mockBean.flavor_profile}`)).toBeInTheDocument();
      expect(screen.getByText(`Price: $${mockBean.price}`)).toBeInTheDocument();
    });
  });
});
