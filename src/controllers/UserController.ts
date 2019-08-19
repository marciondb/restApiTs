/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../model/User'

class UserController {
static listAll = async (req: Request, res: Response): Promise<Response> => {
  const userRepository = getRepository(User)
  const users = await userRepository.find({
    select: ['id', 'name', 'email', 'state_id']
  })

  return res.send(users)
};

static getOneById = async (req: Request, res: Response): Promise<Response> => {
  const id: number = req.params['id']
  const userRepository = getRepository(User)
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ['id', 'name', 'email', 'state_id']
    })
    return res.status(201).json(user)
  } catch (error) {
    return res.status(404).send({ error: 'User not found' })
  }
};

static newUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, state_id } = req.body
  const user = new User()
  user.name = name
  user.password = password
  user.state_id = state_id
  user.email = email

  const errors = await validate(user)
  if (errors.length > 0) {
    res.status(400).send({ error: errors })
    return
  }

  user.hashPassword()

  const userRepository = getRepository(User)
  try {
    await userRepository.save(user)
  } catch (e) {
    res.status(409).send({ error: 'user email already in use' })
    return
  }
  user.password = undefined
  res.status(201).json(user)
};

static editUser = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params['id']

  const { name, state_id } = req.body

  const userRepository = getRepository(User)
  let user
  try {
    user = await userRepository.findOneOrFail(id)
  } catch (error) {
    res.status(404).send({ error: 'User not found' })
    return
  }

  user.name = name
  user.state_id = state_id
  const errors = await validate(user)
  if (errors.length > 0) {
    res.status(400).send({ error: errors })
    return
  }

  try {
    await userRepository.save(user)
  } catch (e) {
    res.status(409).send({ error: 'error editing user ' + JSON.stringify(e) })
    return
  }

  user.password = undefined
  res.status(201).json(user)
};

static deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params['id']

  const userRepository = getRepository(User)

  try {
    await userRepository.findOneOrFail(id)
  } catch (error) {
    res.status(404).send({ error: 'User not found' })
    return
  }
  userRepository.delete(id)

  res.status(201).send({ success: 'User deleted' })
};
};

export default UserController
