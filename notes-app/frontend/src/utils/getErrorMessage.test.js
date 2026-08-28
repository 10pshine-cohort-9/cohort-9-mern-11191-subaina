import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('joins field errors when a validation errors array is present', () => {
    const err = {
      response: {
        data: {
          message: 'Validation failed',
          errors: [{ field: 'title', message: 'Title is required' }],
        },
      },
    };

    expect(getErrorMessage(err, 'fallback')).toBe('Title is required');
  });

  it('joins multiple field errors with a space', () => {
    const err = {
      response: {
        data: {
          errors: [
            { field: 'email', message: 'A valid email is required' },
            { field: 'password', message: 'Password is required' },
          ],
        },
      },
    };

    expect(getErrorMessage(err, 'fallback')).toBe(
      'A valid email is required Password is required'
    );
  });

  it('falls back to data.message when there is no errors array', () => {
    const err = { response: { data: { message: 'Note not found' } } };

    expect(getErrorMessage(err, 'fallback')).toBe('Note not found');
  });

  it('falls back to the provided fallback when there is no response data', () => {
    const err = new Error('network down');

    expect(getErrorMessage(err, 'fallback')).toBe('fallback');
  });

  it('falls back to the provided fallback when data has neither errors nor message', () => {
    const err = { response: { data: {} } };

    expect(getErrorMessage(err, 'fallback')).toBe('fallback');
  });
});
