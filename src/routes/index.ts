import { Router } from 'express'
import auth from './auth'
import user from './user'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../../swagger.json'

const routers = Router()

routers.use('/api/v1/auth', auth)
routers.use('/api/v1/user', user)

routers.use('/', swaggerUi.serve)
routers.get('/', swaggerUi.setup(swaggerDocument))

export default routers
