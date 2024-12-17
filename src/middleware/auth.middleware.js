import { UserModel } from '../schemas/index.js'
import { tokenVerify } from '../helpers/index.js'

export const authMiddleware = async  (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  const user = await tokenVerify(token)
  if (!user) return res.status(401).send('No tienes token valido')
  req.user = user
  next()
}

export const checkRoleAuth = (role) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  const user = await tokenVerify(token)
  if (!user) return res.status(401).send('No tienes token valido')
  const findUser = await UserModel.findOne({ _id: user.id }).lean()
  if ([].concat(role).includes(findUser.role)) {
    req.user = user
    next()
  } else {
    return res.status(409).send('No tienes permisos')
  }
}
