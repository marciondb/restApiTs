
import { Router } from 'express'
import UserController from '../controllers/UserController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/user', checkJwt, UserController.listAll)

router.get('/user:id([0-9]+)', checkJwt, UserController.getOneById
)

router.post('/user', checkJwt, UserController.newUser)

router.patch('/user:id([0-9]+)', checkJwt, UserController.editUser
)

router.delete('/user:id([0-9]+)', checkJwt, UserController.deleteUser
)

export default router
