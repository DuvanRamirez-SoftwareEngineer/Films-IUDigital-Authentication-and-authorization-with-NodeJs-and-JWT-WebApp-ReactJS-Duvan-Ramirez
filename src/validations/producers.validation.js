import { body } from 'express-validator';

export function validationCreateProducer() {
  return [
    body('name', 'El nombre es obligatorio').trim().not().isEmpty(),
    body('status', 'El status es obligatorio').trim().not().isEmpty(),
    body('slogan', 'El slogan es obligatorio').trim().not().isEmpty(),
    body('description', 'La descripción es obligatorio').trim().not().isEmpty(),
  ];
}

export function validationUpdateProducer() {
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
    body('slogan')
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage('El slogan no puede estar vacío'),
    body('description')
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage('La descripción no puede estar vacía'),
  ];
}
