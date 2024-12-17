import { Router } from "express"
import { AuthService } from '../services/index.js'

const authController = Router()
const authService = new AuthService()

authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authService.login(email, password)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export { authController }
