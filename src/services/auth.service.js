import { comparePassword } from '../helpers/index.js'
import { UserModel } from '../schemas/index.js'
import { tokenSign } from '../helpers/index.js'

export class AuthService {
  async login(email, password) {
      const user = await UserModel.findOne({ email: email }).lean()
      if (!user) throw new Error('Usuario o contraseña incorrectos')
      const isPasswordValid = await comparePassword(password, user.password)
      if (!isPasswordValid) throw new Error('Usuario o contraseña incorrectos')
      const id = user._id
      const role = user.role
      const payload = { id, email, role }
      const token = tokenSign(payload)
      const { password: _, ...userWithoutPassword } = user
      return { user: userWithoutPassword, token }
  }
}
