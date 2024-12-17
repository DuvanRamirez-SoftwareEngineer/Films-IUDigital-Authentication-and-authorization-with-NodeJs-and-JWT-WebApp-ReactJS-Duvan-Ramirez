import { body } from 'express-validator';

export function validationCreateTypes() {
  return [
    body('name', 'El nombre es obligatorio').trim().not().isEmpty(),
    body('description', 'La descripción es obligatoria').trim().not().isEmpty(),
  ];
}

export function validationUpdateTypes() {
  // Este campo es opcional porque se puede actualizar solo uno de ellos
  return [
    body('name')
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage('El nombre no puede estar vacío'),
    body('description')
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage('La descripción no puede estar vacía'),
  ];
}
