import { Request, Response } from 'express'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  /* public async store (req: Request, res: Response): Promise<Response> {
      const user = await User.create(req.body)

      return res.json(user)
    } */
}

export default new UserController()
