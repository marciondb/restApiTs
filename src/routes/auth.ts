import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

/**
* @swagger
* '/api/v1/auth':
*    post:
*      tags:
*        - auth
*      summary: Login
*      description: Login the API.
*      operationId: login
*      produces:
*        - application/json
*      parameters:
*        - in: body
*          name: body
*          description: Email and Password
*          required: true
*          schema:
*            $ref: '#/definitions/Login'
*      responses:
*        '201':
*          description: Return User plus token
*        '404':
*          description: User not found or Invalid Password!
*/
router.post('/login', AuthController.login)

router.post('/change-password', checkJwt, AuthController.changePassword)

export default router
