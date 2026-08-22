import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '../hooks/useAuth';

jest.mock('../hooks/useAuth', () => ({ useAuth: jest.fn() }));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

function renderLogin() {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

describe('Login', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
    useAuth.mockReturnValue({ login: mockLogin });
  });

  it('renders email and password fields', () => {
    renderLogin();

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('submits the entered credentials and navigates home on success', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce();

    renderLogin();

    await user.type(screen.getByPlaceholderText('Email address'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'secret123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows an error message and does not navigate when login fails', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce(new Error('network down'));

    renderLogin();

    await user.type(screen.getByPlaceholderText('Email address'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(await screen.findByText('Login failed. Please try again.')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('links to the signup page', () => {
    renderLogin();

    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute('href', '/signup');
  });
});
