/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { PanelInstallation } from '../model/PanelInstallation'

class PanelInstallationController {
  public listByUserStateId = async (req: Request, res: Response): Promise<Response> => {
    const skip: number = req.params['skip']
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

  public getNumberOfInstallationByStateId = async (req: Request, res: Response): Promise<Response> => {
    const userStateId = res.locals.jwtPayload.userStateId
    const panelInstallationRepository = getRepository(PanelInstallation)

    const panelInstallations = await panelInstallationRepository.findAndCount({
      select: ['id'],
      relations: ['stateId'],
      where: { stateId: userStateId },
      order: {
        id: 'ASC'
      },
      take: 1
    })

    const items = panelInstallations[0]
    const count = panelInstallations[1]
    const pi: PanelInstallation = items[0]

    return res.send({ stateName: pi.stateId['name'], count: count })
  }

  public getInstallationWIthHigherCostByStateId = async (req: Request, res: Response): Promise<Response> => {
    const userStateId = res.locals.jwtPayload.userStateId
    const panelInstallationRepository = getRepository(PanelInstallation)

    const panelInstallations = await panelInstallationRepository.find({
      select: ['id', 'zipcode', 'cost'],
      relations: ['stateId'],
      where: { stateId: userStateId },
      order: {
        cost: 'DESC'
      },
      take: 1
    })

    return res.json(panelInstallations[0])
  }
}

export default new PanelInstallationController()
