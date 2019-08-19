import { Router } from 'express'
import auth from './auth'
import user from './user'

const routes = Router()

routes.use('/api/v1/auth', auth)
routes.use('/api/v1/user', user)

routes.get('/', (req, res) => {
  return res.send('Hello Orbita')
})

export default routes
