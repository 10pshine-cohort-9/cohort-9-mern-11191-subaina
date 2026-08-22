import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { getNotes } from '../api/noteApi';
import { useAuth } from '../hooks/useAuth';

jest.mock('../api/noteApi', () => ({
  getNotes: jest.fn(),
  getNoteById: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
}));
jest.mock('../hooks/useAuth', () => ({ useAuth: jest.fn() }));

function renderDashboard() {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
}

describe('Dashboard', () => {
  beforeEach(() => {
    getNotes.mockReset();
    useAuth.mockReturnValue({
      user: { name: 'Jane Doe', email: 'jane@example.com' },
      logout: jest.fn(),
    });
  });

  it('fetches and displays notes', async () => {
    getNotes.mockResolvedValueOnce([
      { _id: '1', title: 'First note', content: 'Hello world', updatedAt: new Date().toISOString() },
      { _id: '2', title: 'Second note', content: 'More content', updatedAt: new Date().toISOString() },
    ]);

    renderDashboard();

    expect(screen.getByText('Loading notes...')).toBeInTheDocument();

    expect(await screen.findByText('First note')).toBeInTheDocument();
    expect(screen.getByText('Second note')).toBeInTheDocument();
    expect(getNotes).toHaveBeenCalledTimes(1);
  });

  it('shows an empty state when there are no notes', async () => {
    getNotes.mockResolvedValueOnce([]);

    renderDashboard();

    expect(await screen.findByText('No notes found')).toBeInTheDocument();
    expect(
      screen.getByText('Start capturing your thoughts — create your first note.')
    ).toBeInTheDocument();
  });

  it('shows an error state with a retry button, and retry re-fetches notes', async () => {
    const user = userEvent.setup();
    getNotes.mockRejectedValueOnce(new Error('network down'));

    renderDashboard();

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Failed to load notes. Please try again.')).toBeInTheDocument();

    getNotes.mockResolvedValueOnce([
      { _id: '1', title: 'Recovered note', content: 'It works now', updatedAt: new Date().toISOString() },
    ]);

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(await screen.findByText('Recovered note')).toBeInTheDocument();
    expect(getNotes).toHaveBeenCalledTimes(2);
  });
});
