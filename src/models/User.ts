import * as Sequelize from 'sequelize'
import { UserAttributes } from './interfaces/User'
import { UserInstance } from './instance/User'
import { SequelizeAttributes } from '../typings/SequelizeAttributes'

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    stateId: {
      type: DataTypes.NUMBER
    }
  }

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes)

  return User
}
