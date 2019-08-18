import { Router } from 'express'
import auth from './auth'
import user from './user'

const routes = Router()

routes.use('/auth', auth)
routes.use('/user', user)

routes.get('/', (req, res) => {
  return res.send('Hello Orbita')
})

export default routes
