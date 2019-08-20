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

/**
* @swagger
* '/auth/change-password':
*    post:
*      tags:
*        - auth
*      summary: Change Password
*      description: Change Password from the current user logged. This can only be done by the logged in user.
*      operationId: changePassword
*      produces:
*      - application/json
*      parameters:
*      - in: body
*        name: body
*        description: oldPassword and newPassword
*        required: true
*        schema:
*          $ref: '#/definitions/ChangePassword'
*      responses:
*        '200':
*          description: Password changed.
*          schema:
*            $ref: "#/definitions/User"
*        '400':
*          description: oldPassword and newPassword are mandatory!
*        '404':
*          description: User not found or oldPassword is invalid!
*/
router.post('/change-password', checkJwt, AuthController.changePassword)

export default router
