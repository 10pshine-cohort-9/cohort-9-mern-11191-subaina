const express = require('express');
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createNoteValidation, updateNoteValidation } = require('../validators/noteValidators');
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const router = express.Router();

router.use(protect);

router.post('/', createNoteValidation, validate, createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteValidation, validate, updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
