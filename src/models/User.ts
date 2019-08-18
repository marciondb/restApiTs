import * as Sequelize from 'sequelize'
import { UserAttributes } from './interfaces/User'
import { UserInstance } from './instance/User'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING(45)
    },
    email: {
      type: DataTypes.STRING(45)
    },
    password: {
      type: DataTypes.STRING(255)
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    state_id: {
      type: DataTypes.INTEGER
    }
  }

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes)

  return User
}
