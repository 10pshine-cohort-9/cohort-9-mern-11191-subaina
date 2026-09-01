const Note = require('../models/Note');
const NoteRepository = require('../repositories/noteRepository');
const NoteService = require('../services/noteService');
const asyncHandler = require('../utils/asyncHandler');

const noteRepository = new NoteRepository(Note);
const noteService = new NoteService(noteRepository);

const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await noteService.createNote(req.user._id, { title, content });

  res.status(201).json(note);
});

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await noteService.getAllNotes(req.user._id);

  res.status(200).json(notes);
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await noteService.getNoteById(req.params.id, req.user._id);

  res.status(200).json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await noteService.updateNote(req.params.id, req.user._id, {
    title,
    content,
  });

  res.status(200).json(note);
});

const deleteNote = asyncHandler(async (req, res) => {
  await noteService.deleteNote(req.params.id, req.user._id);

  res.status(200).json({ message: 'Note deleted successfully' });
});

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
