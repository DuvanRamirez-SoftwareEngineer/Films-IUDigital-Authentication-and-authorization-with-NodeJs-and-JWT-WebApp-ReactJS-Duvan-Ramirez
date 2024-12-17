import { body } from 'express-validator';

export function validationCreateDirector() {
  return [
    body('name', 'El nombre es obligatorio').trim().not().isEmpty(),
    body('status', 'El status es obligatorio').trim().not().isEmpty(),
  ];
}

export function validationUpdateDirector() {
  // The fields are optional because we can update only one field
  return [
    body('name')
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage('El nombre no puede estar vacío'),
    body('status')
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage('El status no puede estar vacío'),
  ];
}
