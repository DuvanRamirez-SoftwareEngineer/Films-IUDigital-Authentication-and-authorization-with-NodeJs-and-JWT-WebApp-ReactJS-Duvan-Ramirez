import { Router } from 'express';
import { validationResult } from 'express-validator';

import { ProducerService } from '../services/index.js';
import {
  validationCreateProducer,
  validationUpdateProducer,
} from '../validations/index.js';

const producersController = Router();
const producerService = new ProducerService();

// create producer
producersController.post(
  '/producer',
  validationCreateProducer(),
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    try {
      const producer = await producerService.createProducer(req.body);
      res.status(201).json(producer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// get all producers
producersController.get('/producer', async (req, res) => {
  try {
    const producers = await producerService.getAllProducers();
    res.send(producers).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get producer by id
producersController.get('/producer/:id', async (req, res) => {
  try {
    const producer = await producerService.getProducerById(req.params.id);
    res.send(producer).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update producer
producersController.put(
  '/producer/:id',
  validationUpdateProducer(),
  async (req, res) => {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
      const producer = await producerService.updateProducer(
        req.params.id,
        req.body
      );
      res.send(producer).status(200);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// delete producer
producersController.delete('/producer/:id', async (req, res) => {
  try {
    const producer = await producerService.deleteProducer(req.params.id);
    res.send(producer).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { producersController };
