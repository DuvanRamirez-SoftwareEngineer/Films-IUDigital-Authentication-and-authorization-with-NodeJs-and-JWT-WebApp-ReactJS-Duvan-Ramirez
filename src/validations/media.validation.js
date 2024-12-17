import { body } from 'express-validator';

export function validationCreateMedia() {
  return [
    body('serial', 'El serial es obligatorio').isInt().not().isEmpty(),
    body('title', 'El titulo es obligatorio').trim().not().isEmpty(),
    body('synopsis', 'La sinopsis es obligatoria').trim().not().isEmpty(),
    body('url', 'La URL es obligatoria').trim().not().isEmpty(),
    body('coverImage', 'La imagen es obligatoria').trim().not().isEmpty(),
    body('releaseYear', 'El año de estreno es obligatorio')
      .isDate()
      .trim()
      .not()
      .isEmpty(),
    body('genre', 'El genero es obligatorio').not().isEmpty(),
    body('director', 'El director es obligatorio').not().isEmpty(),
    body('producer', 'La productora es obligatorio').not().isEmpty(),
    body('type', 'El tipo es obligatorio').not().isEmpty(),
  ];
}

export function validationUpdateMedia() {
  return [
    body('serial', 'El serial es obligatorio').isInt().not().isEmpty(),
    body('title', 'El titulo es obligatorio').not().isEmpty(),
    body('synopsis', 'La sinopsis es obligatoria').not().isEmpty(),
    body('url', 'La URL es obligatoria').not().isEmpty(),
    body('coverImage', 'La imagen es obligatoria').not().isEmpty(),
    body('releaseYear', 'El año de estreno es obligatorio')
      .isDate()
      .not()
      .isEmpty(),
    body('genre', 'El genero es obligatorio').not().isEmpty(),
    body('director', 'El director es obligatorio').not().isEmpty(),
    body('producer', 'La productora es obligatorio').not().isEmpty(),
    body('type', 'El tipo es obligatorio').not().isEmpty(),
  ];
}
