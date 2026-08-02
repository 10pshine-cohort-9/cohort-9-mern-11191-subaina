const ApiError = require('../utils/ApiError');

class NoteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async createNote(ownerId, { title, content }) {
    const note = await this.noteRepository.create({
      title,
      content,
      owner: ownerId,
    });

    return note;
  }

  async getAllNotes(ownerId) {
    return this.noteRepository.findAllByOwner(ownerId);
  }

  async getNoteById(noteId, ownerId) {
    const note = await this.noteRepository.findByIdAndOwner(noteId, ownerId);

    if (!note) {
      throw new ApiError(404, 'Note not found');
    }

    return note;
  }

  async updateNote(noteId, ownerId, updateData) {
    const note = await this.noteRepository.updateByIdAndOwner(
      noteId,
      ownerId,
      updateData
    );

    if (!note) {
      throw new ApiError(404, 'Note not found');
    }

    return note;
  }

  async deleteNote(noteId, ownerId) {
    const note = await this.noteRepository.deleteByIdAndOwner(noteId, ownerId);

    if (!note) {
      throw new ApiError(404, 'Note not found');
    }

    return note;
  }
}

module.exports = NoteService;
