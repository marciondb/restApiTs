import * as Sequelize from 'sequelize'
import { UserInstance } from '../../models/instance/User'
import { UserAttributes } from '../../models/interfaces/User'

export interface DbInterface {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  User: Sequelize.Model<UserInstance, UserAttributes>
}
