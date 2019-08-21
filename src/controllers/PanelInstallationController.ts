/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { PanelInstallation } from '../model/PanelInstallation'

class PanelInstallationController {
  public listByUserStateId = async (req: Request, res: Response): Promise<Response> => {
    const skip: number = req.params['skip']
    console.log(skip)
    const userStateId = res.locals.jwtPayload.userStateId
    const panelInstallationRepository = getRepository(PanelInstallation)

    const panelInstallations = await panelInstallationRepository.find({
      select: ['id', 'dataProvider', 'system_size', 'zipcode', 'stateId', 'cost', 'installation_date'],
      relations: ['dataProvider', 'stateId'],
      where: { stateId: userStateId },
      order: {
        id: 'ASC'
      },
      skip: skip,
      take: 1000
    })

    return res.send(panelInstallations)
  }
}

export default new PanelInstallationController()
