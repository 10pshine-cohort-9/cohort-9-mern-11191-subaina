import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NoteCard from './NoteCard';

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('NoteCard', () => {
  it('renders the title', () => {
    renderWithRouter(
      <NoteCard id="1" title="My Test Note" content="Some content" updatedAt={new Date().toISOString()} />
    );

    expect(screen.getByText('My Test Note')).toBeInTheDocument();
  });

  it('strips HTML tags from the content preview', () => {
    renderWithRouter(
      <NoteCard
        id="1"
        title="Note"
        content="<p>Hello <strong>world</strong></p>"
        updatedAt={new Date().toISOString()}
      />
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('truncates long content and appends an ellipsis', () => {
    const longContent = 'a'.repeat(200);

    renderWithRouter(
      <NoteCard id="1" title="Note" content={longContent} updatedAt={new Date().toISOString()} />
    );

    const preview = screen.getByText(/a+…$/);
    expect(preview.textContent.length).toBeLessThan(longContent.length);
    expect(preview.textContent.endsWith('…')).toBe(true);
  });

  it('does not render a tag element when no tag is provided', () => {
    renderWithRouter(
      <NoteCard id="1" title="Note" content="content" updatedAt={new Date().toISOString()} />
    );

    expect(screen.queryByText(/tag/i)).not.toBeInTheDocument();
  });

  it('renders the tag when provided', () => {
    renderWithRouter(
      <NoteCard
        id="1"
        title="Note"
        content="content"
        tag="Work"
        updatedAt={new Date().toISOString()}
      />
    );

    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('navigates to the note detail page when clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <NoteCard id="abc123" title="Note" content="content" updatedAt={new Date().toISOString()} />
    );

    const card = screen.getByRole('button');
    await user.click(card);

    expect(window.location.pathname).toBe('/notes/abc123');
  });
});
