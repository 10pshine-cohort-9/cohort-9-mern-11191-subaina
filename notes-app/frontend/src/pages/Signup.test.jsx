import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import { useAuth } from '../hooks/useAuth';

jest.mock('../hooks/useAuth', () => ({ useAuth: jest.fn() }));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

function renderSignup() {
  return render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
}

async function fillForm(user, { name, email, password, confirmPassword }) {
  await user.type(screen.getByPlaceholderText('Full name'), name);
  await user.type(screen.getByPlaceholderText('Email address'), email);
  await user.type(screen.getByPlaceholderText('Password'), password);
  await user.type(screen.getByPlaceholderText('Confirm password'), confirmPassword);
}

describe('Signup', () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    mockSignup.mockReset();
    mockNavigate.mockReset();
    useAuth.mockReturnValue({ signup: mockSignup });
  });

  it('renders name, email, password, and confirm password fields', () => {
    renderSignup();

    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
  });

  it('shows a validation error and does not call signup when passwords do not match', async () => {
    const user = userEvent.setup();

    renderSignup();

    await fillForm(user, {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      confirmPassword: 'different456',
    });
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(mockSignup).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('submits name, email, and password (not confirmPassword) and navigates home on success', async () => {
    const user = userEvent.setup();
    mockSignup.mockResolvedValueOnce();

    renderSignup();

    await fillForm(user, {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(mockSignup).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows an error message when signup fails', async () => {
    const user = userEvent.setup();
    mockSignup.mockRejectedValueOnce(new Error('email taken'));

    renderSignup();

    await fillForm(user, {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      await screen.findByText('Signup failed. Please try again.')
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
