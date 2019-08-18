import { UserAttributes } from '../interfaces/User'
import Sequelize from 'sequelize'

export interface UserInstance extends
    Sequelize.Instance<UserAttributes>, UserAttributes {
}
