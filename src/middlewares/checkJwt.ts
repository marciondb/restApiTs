/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction):void => {
  const authHeader = <string>req.headers.authorization

  // Para otimizar a verificacao INIT
  if (!authHeader) {
    res.status(401).send({ error: 'No token provider' })
    return
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    res.status(401).send({ error: 'Token error' })
    return
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).send({ error: 'Token malformatted' })
    return
  }
  // Para otimizar a verificacao END

  let jwtPayload

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwtPayload = <any>jwt.verify(token, config.jwtSecret)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated: ' + error.message })
    return
  }

  const { userId, username } = jwtPayload
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: '3h'
  })
  res.setHeader('token', newToken)

  next()
}
