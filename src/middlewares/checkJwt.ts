/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction):void => {
  const token = <string>req.headers['auth']
  let jwtPayload

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwtPayload = <any>jwt.verify(token, config.jwtSecret)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    res.status(401).send()
    return
  }

  const { userId, username } = jwtPayload
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: '3h'
  })
  res.setHeader('token', newToken)

  next()
}
