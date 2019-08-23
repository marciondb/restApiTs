import { Router } from 'express'
import PanelInstallationController from '../controllers/PanelInstallationController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

/**
* @swagger
* /panelInstallation/listByUserStateId/{skip}:
*    get:
*      tags:
*        - Panel Installation
*      summary: List Panel Installation by logged user state id
*      description: List all Panel Installation by user's state id. Is limited to 1000 entities per get
*      operationId: listByUserStateId
*      produces:
*        - application/json
*      parameters:
*        - in: path
*          name: skip
*          description: offset (paginated) from where entities should be taken.
*          required: true
*          type: number
*      responses:
*        default:
*          description: list of Panel Installation
*          schema:
*            type: array
*            items:
*              $ref: "#/definitions/PanelInstallation"
*/
router.get('/listByUserStateId/:skip([0-9]+)', checkJwt, PanelInstallationController.listByUserStateId)

/**
* @swagger
* /panelInstallation/getNumberOfInstallationByStateId:
*    post:
*      tags:
*        - Panel Installation
*      summary: Get the total of Installation by logged user state id
*      description: Get the total of Installation by logged user state id
*      operationId: getNumberOfInstallationByStateId
*      produces:
*        - application/json
*      responses:
*        default:
*          description: Number Of Installation By User State Id with State
*/
router.post('/getNumberOfInstallationByStateId', checkJwt, PanelInstallationController.getNumberOfInstallationByStateId)

/**
* @swagger
* /panelInstallation/getInstallationWIthHigherCostByStateId:
*    post:
*      tags:
*        - Panel Installation
*      summary: Get Installation WIth Higher Cost by logged user state id
*      description: Get Installation WIth Higher Cost by logged user state id
*      operationId: getInstallationWIthHigherCostByStateId
*      produces:
*        - application/json
*      responses:
*        default:
*          description: Number Of Installation By User State Id with State
*/
router.post('/getInstallationWIthHigherCostByStateId', checkJwt, PanelInstallationController.getInstallationWIthHigherCostByStateId)

export default router
