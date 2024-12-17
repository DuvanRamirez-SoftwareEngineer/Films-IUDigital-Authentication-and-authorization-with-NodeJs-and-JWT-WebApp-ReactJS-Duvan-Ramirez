import { Router } from "express"
import { validationResult } from "express-validator"
import { UserService } from "../services/index.js"
import { validationCreateUser } from "../validations/index.js"
import { hashPassword } from "../helpers/index.js"

const usersController = Router()
const userService = new UserService()

usersController.post("/user",
  validationCreateUser(),
  async (req, res) => {
  try {
    const errors = validationResult(req.body)
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() })
    }
    const user = await userService.createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
usersController.get("/user", async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.send(users).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

usersController.get("/user/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.send(user).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

usersController.put("/user/:id", async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    res.send(user).status(200)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

usersController.delete("/user/:id", async (req, res) => {
  try {
    await userService.deleteUser(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export { usersController }
