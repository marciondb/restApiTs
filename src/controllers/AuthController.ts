import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../model/User'
import config from '../config/config'

class AuthController {
  static login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send({ error: 'Email and password are mandatory!' })
      return
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { email } })
    } catch (error) {
      res.status(401).send({ error: 'User not found!' })
      return
    }

    if (!user.checkIfUnEncryptedPasswordIsValid(password)) {
      res.status(401).send({ error: 'Invalid Password!' })
      return
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, userStateId: user.state_id },
      config.jwtSecret,
      { expiresIn: '3h' }
    )

    user.password = undefined
    res.send({ user, token })
  };

  static changePassword = async (req: Request, res: Response):
  Promise<Response> => {
    const id = res.locals.jwtPayload.userId

    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send({ error: 'oldPassword and newPassword are mandatory!' })
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      res.status(401).send({ error: 'User not found!' })
    }

    if (!user.checkIfUnEncryptedPasswordIsValid(oldPassword)) {
      res.status(401).send({ error: 'oldPassword is invalid!' })
      return
    }

    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send({ error: errors })
      return
    }

    user.hashPassword()
    userRepository.save(user)
    user.password = undefined
    res.status(200).json(user)
  };
}
export default AuthController
