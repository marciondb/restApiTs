import { Router } from 'express'
import UserController from '../controllers/UserController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

/**
* @swagger
* /user:
*    get:
*      tags:
*        - user
*      summary: List All User
*      description: This can only be done by the logged in user.
*      operationId: listAllUser
*      produces:
*        - application/json
*      responses:
*        default:
*          description: get all users
*          schema:
*            type: array
*            items:
*              $ref: "#/definitions/Login"
*/
router.get('/', checkJwt, UserController.listAll)

/**
* @swagger
* /user:
*    post:
*      tags:
*        - user
*      summary: Create user
*      description: This can only be done by the logged in user.
*      operationId: createUser
*      produces:
*        - application/json
*      parameters:
*        - in: body
*          name: body
*          description: Created user object
*          required: true
*          schema:
*            $ref: '#/definitions/User'
*      responses:
*        default:
*          description: User Json Object
*/
router.post('/', checkJwt, UserController.newUser)

/**
* @swagger
* '/user/{id}':
*    get:
*      tags:
*        - user
*      summary: Get user by user id
*      description: This can only be done by the logged in user.
*      operationId: getUserById
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: id
*          description: The id that needs to be fetched. Use 1 for testing.
*          required: true
*          type: number
*          schema:
*            $ref: '#/definitions/User'
*      responses:
*        '201':
*          description: User Object
*          schema:
*            $ref: '#/definitions/User'
*        '400':
*          description: Invalid(s) field(s) supplied
*        '404':
*          description: User not found
*        '409':
*          description: user email already in use
*/
router.get('/:id([0-9]+)', checkJwt, UserController.getOneById)

/**
* @swagger
* '/user/{id}':
*    patch:
*      tags:
*        - user
*      summary: Updated user
*      description: This can only be done by the logged in user.
*      operationId: updateUser
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: id
*          description: The id that need to be updated.
*          required: true
*          type: number
*        - in: body
*          name: body
*          description: Only name and state_id to be updated.
*          required: true
*          type: number
*          schema:
*            $ref: '#/definitions/User'
*      responses:
*        '201':
*          description: User Object
*          schema:
*            $ref: '#/definitions/User'
*        '400':
*          description: Invalid(s) field(s) supplied
*        '404':
*          description: User not found
*/
router.patch('/:id([0-9]+)', checkJwt, UserController.editUser)

/**
* @swagger
* '/user/{id}':
*    delete:
*      tags:
*        - user
*      summary: Delete user
*      description: This can only be done by the logged in user.
*      operationId: deleteUser
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: id
*          description: The id that need to be deleted.
*          required: true
*          type: number
*          schema:
*            $ref: '#/definitions/User'
*      responses:
*        '201':
*          description: User deleted
*        '404':
*          description: User not found
*/
router.delete('/:id([0-9]+)', checkJwt, UserController.deleteUser)

export default router
