import jwt from 'jsonwebtoken';

export function tokenSign(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
}

export const tokenVerify = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    return null
  }
}
