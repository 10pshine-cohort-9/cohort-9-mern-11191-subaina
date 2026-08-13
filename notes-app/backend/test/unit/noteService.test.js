const { expect } = require('chai');
const NoteService = require('../../src/services/noteService');

describe('NoteService', () => {
  describe('getNoteById', () => {
    it('should throw a 404 error if note is not found', async () => {
      const fakeNoteRepository = {
        findByIdAndOwner: async () => null,
      };

      const noteService = new NoteService(fakeNoteRepository);

      try {
        await noteService.getNoteById('fakeNoteId', 'fakeOwnerId');
        throw new Error('Expected getNoteById to throw, but it did not');
      } catch (error) {
        expect(error.message).to.equal('Note not found');
        expect(error.statusCode).to.equal(404);
      }
    });

    it('should return the note if found', async () => {
      const fakeNote = {
        _id: 'note123',
        title: 'Test note',
        content: 'Some content',
        owner: 'owner123',
      };

      const fakeNoteRepository = {
        findByIdAndOwner: async () => fakeNote,
      };

      const noteService = new NoteService(fakeNoteRepository);

      const result = await noteService.getNoteById('note123', 'owner123');

      expect(result).to.deep.equal(fakeNote);
    });
  });

  describe('createNote', () => {
    it('should attach the owner id when creating a note', async () => {
      const fakeNoteRepository = {
        create: async (data) => data,
      };

      const noteService = new NoteService(fakeNoteRepository);

      const result = await noteService.createNote('owner123', {
        title: 'My note',
        content: 'Note content',
      });

      expect(result.owner).to.equal('owner123');
      expect(result.title).to.equal('My note');
      expect(result.content).to.equal('Note content');
    });
  });
});
