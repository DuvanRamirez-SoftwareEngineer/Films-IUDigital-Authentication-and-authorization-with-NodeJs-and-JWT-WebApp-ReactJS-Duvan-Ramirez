import { body } from 'express-validator';

export function validationCreateUser() {
  return [
    body('fullName', 'El nombre es obligatorio').trim().not().isEmpty(),
    body('email', 'El email es obligatorio').trim().not().isEmpty().isEmail(),
    body('password', 'La contraseña es obligatoria').trim().not().isEmpty(),
    body('role', 'El rol es obligatorio').trim().not().isEmpty(),
  ];
}
