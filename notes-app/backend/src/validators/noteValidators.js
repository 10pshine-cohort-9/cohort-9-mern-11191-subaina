const { body } = require('express-validator');

const createNoteValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').optional().isString().withMessage('Content must be text'),
];

const updateNoteValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().isString().withMessage('Content must be text'),
];

module.exports = { createNoteValidation, updateNoteValidation };
