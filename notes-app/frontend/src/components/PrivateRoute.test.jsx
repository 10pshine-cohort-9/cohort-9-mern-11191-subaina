import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../hooks/useAuth';

jest.mock('../hooks/useAuth', () => ({ useAuth: jest.fn() }));

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/protected"
          element={
            <PrivateRoute>
              <div>Secret content</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('PrivateRoute', () => {
  it('shows a loading state instead of children or redirecting', () => {
    useAuth.mockReturnValue({ loading: true, isAuthenticated: false });

    renderProtected();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Secret content')).not.toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', () => {
    useAuth.mockReturnValue({ loading: false, isAuthenticated: false });

    renderProtected();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Secret content')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    useAuth.mockReturnValue({ loading: false, isAuthenticated: true });

    renderProtected();

    expect(screen.getByText('Secret content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
