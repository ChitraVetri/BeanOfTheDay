import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BeanList from '../components/BeanList';
import axios from '../api/axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api/axios');

const mockBeans = Array.from({ length: 12 }, (_, i) => ({
  Id: i + 1,
  Name: `Bean ${i + 1}`,
  Cost: `$${(i + 1) * 2}`,
  ImageUrl: `/img/bean${i + 1}.jpg`
}));

describe('BeanList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderWithRouter(ui) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  }

  it('shows loading initially', async () => {
    axios.get.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithRouter(<BeanList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    renderWithRouter(<BeanList />);
    await waitFor(() => expect(screen.getByText(/failed to load beans/i)).toBeInTheDocument());
  });

  it('renders bean cards (first page)', async () => {
    axios.get.mockResolvedValue({ data: mockBeans });
    renderWithRouter(<BeanList />);
    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    // Should show 8 beans on first page
    mockBeans.slice(0, 8).forEach(bean => {
      expect(screen.getByText(bean.Name)).toBeInTheDocument();
      expect(screen.getByText(bean.Cost)).toBeInTheDocument();
      expect(screen.getAllByAltText(bean.Name)[0]).toHaveAttribute('src', bean.ImageUrl);
    });
    // Should not show beans from page 2
    mockBeans.slice(8).forEach(bean => {
      expect(screen.queryByText(bean.Name)).not.toBeInTheDocument();
    });
  });

  it('paginates beans correctly', async () => {
    axios.get.mockResolvedValue({ data: mockBeans });
    renderWithRouter(<BeanList />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    // Go to page 2
    fireEvent.click(screen.getByRole('button', { name: /go to page 2/i }));
    // Beans 9-12 should now be visible
    mockBeans.slice(8, 12).forEach(bean => {
      expect(screen.getByText(bean.Name)).toBeInTheDocument();
    });
    // Beans 1-8 should not be visible
    mockBeans.slice(0, 8).forEach(bean => {
      expect(screen.queryByText(bean.Name)).not.toBeInTheDocument();
    });
  });

  it('renders breadcrumbs and navigation links', async () => {
    axios.get.mockResolvedValue({ data: mockBeans });
    renderWithRouter(<BeanList />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.getByText('Home')).toHaveAttribute('href', '/home');
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  it('each bean card links to details page', async () => {
    axios.get.mockResolvedValue({ data: mockBeans });
    renderWithRouter(<BeanList />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    mockBeans.slice(0, 8).forEach(bean => {
      const link = screen.getByRole('link', { name: bean.Name }); 
      expect(link).toHaveAttribute('href', `/BeanDetails/${bean.Id}`);
    });
  });
});
