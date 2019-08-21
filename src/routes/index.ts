import { Router } from 'express'
import auth from './auth'
import user from './user'
import panelInstallation from './panelInstallation'
import * as swaggerUi from 'swagger-ui-express'
import * as specs from '../swagger'
const routes = Router()

routes.use('/api/v1/auth', auth)
routes.use('/api/v1/user', user)
routes.use('/api/v1/panelInstallation', panelInstallation)

routes.use('/', swaggerUi.serve, swaggerUi.setup(specs.default))

export default routes
