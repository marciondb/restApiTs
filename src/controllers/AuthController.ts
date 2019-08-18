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
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { email } })
    } catch (error) {
      res.status(401).send({ error: 'User not found!' })
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send({ error: 'Invalid Password!' })
      return
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '3h' }
    )

    user.password = undefined
    res.send({ user, token })
  };

  static changePassword = async (req: Request, res: Response):
  Promise<Response> => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId

    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send()
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      res.status(401).send()
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send()
      return
    }

    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    user.hashPassword()
    userRepository.save(user)

    res.status(204).send()
  };
}
export default AuthController
