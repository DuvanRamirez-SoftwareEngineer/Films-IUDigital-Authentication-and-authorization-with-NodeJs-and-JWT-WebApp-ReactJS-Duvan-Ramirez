import { Router } from 'express';
import { validationResult } from 'express-validator';

import { TypesService } from '../services/index.js';
import {
  validationCreateTypes,
  validationUpdateTypes,
} from '../validations/index.js';

const typesController = Router();
const typesService = new TypesService();

// create types
typesController.post(
  '/types',
  validationCreateTypes(),
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    try {
      const types = await typesService.createTypes(req.body);
      res.status(201).json(types);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// get all types
typesController.get('/types', async (req, res) => {
  try {
    const types = await typesService.getAllTypes();
    res.send(types).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get types by id
typesController.get('/types/:id', async (req, res) => {
  try {
    const types = await typesService.getTypesById(req.params.id);
    res.send(types).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update types
typesController.put(
  '/types/:id',
  validationUpdateTypes(),
  async (req, res) => {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
      const types = await typesService.updateTypes(req.params.id, req.body);
      res.send(types).status(200);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// delete types
typesController.delete('/types/:id', async (req, res) => {
  try {
    const types = await typesService.deleteTypes(req.params.id);
    res.send(types).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { typesController };
