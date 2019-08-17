import { Sequelize } from 'sequelize'

class DataBase {
  public connection (): Sequelize {
    const dbConn = new Sequelize('orbita', 'root', 'FpqoJ-A2EW@uXGpQ@bnY', {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

    return dbConn
  }
}

export default new DataBase().connection()
