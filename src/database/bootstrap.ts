import { Sequelize } from 'sequelize'
import { DbInterface } from '../typings/DbInterface'
import { UserFactory } from '../models/User'

export const createModels = (): DbInterface => {
  const database = 'orbita'
  const username = 'root'
  const password = 'FpqoJ-A2EW@uXGpQ@bnY'
  const params = {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }

  const sequelize = new Sequelize(database, username, password, params)

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize)
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  return db
}
