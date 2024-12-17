import { Router } from "express"
import { validationResult } from "express-validator"

import {  
  MediaService
} from "../services/index.js"
import { validationCreateMedia, validationUpdateMedia } from "../validations/index.js"

const mediaController = Router()
const mediaService = new MediaService()

// create movie
mediaController.post("/media", validationCreateMedia(), async (req, res) => {
  const errors = validationResult(req.body)
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() })
  }
  try {
    const media = await mediaService.createMedia(req.body)
    res.status(201).json(media)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// get all movies
mediaController.get("/media", async (req, res) => {
  try {
    const media = await mediaService.getAllMedia()
    res.send(media).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// get movie by id
mediaController.get("/media/:id", async (req, res) => {
  try {
    const media = await mediaService.getMediaById(req.params.id)
    res.send(media).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// update movie
mediaController.put("/media/:id", validationUpdateMedia(), async (req, res) => {
  try {
    const errors = validationResult(req.body)
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
    }
    const media = await mediaService.updateMedia(req.params.id, req.body)
    res.send(media).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// delete movie
mediaController.delete("/media/:id", async (req, res) => {
  try {
    const media = await mediaService.deleteMedia(req.params.id)
    res.send(media).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export { mediaController }
