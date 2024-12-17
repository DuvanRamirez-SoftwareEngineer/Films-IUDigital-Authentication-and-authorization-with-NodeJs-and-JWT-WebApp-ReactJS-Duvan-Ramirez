import { Router } from 'express';
import { validationResult } from 'express-validator';

import { DirectorService } from '../services/index.js';
import {
  validationCreateDirector,
  validationUpdateDirector,
} from '../validations/index.js';
import { authMiddleware, checkRoleAuth } from '../middleware/auth.middleware.js';

const directorsController = Router();
const directorService = new DirectorService();

// create director
directorsController.post(
  '/director',
  authMiddleware,
  checkRoleAuth(['ADMIN']),
  validationCreateDirector(),
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    try {
      const director = await directorService.createDirector(req.body);
      res.status(201).json(director);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// get all directors
directorsController.get(
  '/director',
  authMiddleware,
  checkRoleAuth(['ADMIN', 'USER']),
  async (req, res) => {
  try {
    const directors = await directorService.getAllDirectors();
    res.send(directors).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get director by id
directorsController.get('/director/:id', async (req, res) => {
  try {
    const director = await directorService.getDirectorById(req.params.id);
    res.send(director).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update director
directorsController.put(
  '/director/:id',
  validationUpdateDirector(),
  async (req, res) => {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
      const director = await directorService.updateDirector(
        req.params.id,
        req.body
      );
      res.send(director).status(200);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// delete director
directorsController.delete('/director/:id', async (req, res) => {
  try {
    const director = await directorService.deleteDirector(req.params.id);
    res.send(director).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { directorsController };
