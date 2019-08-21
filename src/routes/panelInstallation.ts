import { Router } from 'express'
import PanelInstallationController from '../controllers/PanelInstallationController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

/**
* @swagger
* /panelInstallation/listByUserStateId:
*    get:
*      tags:
*        - Panel Installation
*      summary: List Panel Installation by logged user state id
*      description: List all Panel Installation by user's state id.
*      operationId: listByUserStateId
*      produces:
*        - application/json
*      responses:
*        default:
*          description: list of Panel Installation
*          schema:
*            type: array
*            items:
*              $ref: "#/definitions/PanelInstallation"
*/
router.get('/listByUserStateId', checkJwt, PanelInstallationController.listByUserStateId)

export default router
