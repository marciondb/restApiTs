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

  public get3HigherMonthInstallationByStateId = async (req: Request, res: Response): Promise<Response> => {
    const userStateId = res.locals.jwtPayload.userStateId
    const result = await getRepository(PanelInstallation)
      .createQueryBuilder('panel_installation')
      .select('concat(\'ano \',YEAR(installation_date)) as theYear, COUNT(CASE WHEN  MONTH(installation_date) = 1 THEN 1 ELSE NULL END) January, COUNT(CASE WHEN  MONTH(installation_date) = 2 THEN 1 ELSE NULL END) Feburary, COUNT(CASE WHEN  MONTH(installation_date) = 3 THEN 1 ELSE NULL END) March, COUNT(CASE WHEN  MONTH(installation_date) = 4 THEN 1 ELSE NULL END) April, COUNT(CASE WHEN  MONTH(installation_date) = 5 THEN 1 ELSE NULL END) May, COUNT(CASE WHEN  MONTH(installation_date) = 6 THEN 1 ELSE NULL END) June, COUNT(CASE WHEN  MONTH(installation_date) = 7 THEN 1 ELSE NULL END) July, COUNT(CASE WHEN  MONTH(installation_date) = 8 THEN 1 ELSE NULL END) August, COUNT(CASE WHEN  MONTH(installation_date) = 9 THEN 1 ELSE NULL END) September, COUNT(CASE WHEN  MONTH(installation_date) = 10 THEN 1 ELSE NULL END) October, COUNT(CASE WHEN  MONTH(installation_date) = 11 THEN 1 ELSE NULL END) November, COUNT(CASE WHEN  MONTH(installation_date) = 12 THEN 1 ELSE NULL END) December')
      .where('panel_installation.state_id = :stateId', { stateId: userStateId })
      .groupBy('theYear')
      .orderBy('theYear', 'DESC')
      .getRawMany()

    const onlyValues = result.map(item => Object.values(item))
    const toBeReturn = {}
    function sum3HigherMonth (item) {
      item.sort()
      toBeReturn[item[item.length - 1]] = parseInt(item[0]) + parseInt(item[1]) + parseInt(item[2])
    }
    onlyValues.map(sum3HigherMonth)
    return res.send(toBeReturn)
  }
}

export default new PanelInstallationController()
