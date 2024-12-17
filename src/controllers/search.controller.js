import { Router } from "express"
import { validationResult } from "express-validator"
import { SearchService } from "../services/index.js"

const searchController = Router()
const searchService = new SearchService()

searchController.get("/search", async (req, res) => {
  try {
    const search = await searchService.search(req.query.q)
    res.send(search).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export { searchController }