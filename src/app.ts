import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import cors from 'cors'
import routes from './routes/index'
// import * as helmet from 'helmet'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()

      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
      this.express.use(routes)
      this.express.get('/', (req, res) => {
        return res.send('Hello Orbita')
      })
    }

    private database (): void {
      createConnection()
    }
}

export default new App().express
