import { Router } from 'express';
import { validationResult } from 'express-validator';

import { GenreService } from '../services/index.js';
// import { validationCreateGenre, validationUpdateGenre } from '../validations/index.js';

const genresController = Router();
const genreService = new GenreService();

// create genre
genresController.post('/genre', async (req, res) => {
  try {
    const genre = await genreService.createGenre(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all genres
genresController.get('/genre', async (req, res) => {
  try {
    const genres = await genreService.getAllGenres();
    res.send(genres).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get genre by id
genresController.get('/genre/:id', async (req, res) => {
  try {
    const genre = await genreService.getGenreById(req.params.id);
    res.send(genre).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update genre
genresController.put('/genre/:id', async (req, res) => {
  try {
    const genre = await genreService.updateGenre(req.params.id, req.body);
    res.send(genre).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete genre
genresController.delete('/genre/:id', async (req, res) => {
  try {
    const genre = await genreService.deleteGenre(req.params.id);
    res.send(genre).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { genresController };
