import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

/**
* @swagger
* '/auth/login':
*    post:
*      tags:
*        - auth
*      summary: Login
*      description: Login the API.
*      operationId: login
*      produces:
*      - application/json
*      parameters:
*      - in: body
*        name: body
*        description: Email and Password. Use for test user = admin and password = admin
*        required: true
*        schema:
*          $ref: '#/definitions/Login'
*      responses:
*        '200':
*          description: Return User plus token
*          schema:
*            $ref: "#/definitions/User"
*        '404':
*          description: User not found or Invalid Password!
*/
router.post('/login', AuthController.login)

router.post('/change-password', checkJwt, AuthController.changePassword)

export default router
