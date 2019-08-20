import { createConnection, Connection } from 'typeorm'
import * as express from 'express'
import * as cors from 'cors'
import routes from './routes'
import 'reflect-metadata'

class App {
    public express: express.Application

    public constructor () {
      this.database()
      this.express = express()

      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
      this.express.use('/', routes)
    }

    private async database (): Promise<Connection> {
      const connection = await createConnection()
      return connection
    }
}

export default new App().express
