import express from 'express'
import cors from 'cors'
import db from './database/bootstrap'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()

      this.middlewares()
      this.routes()
      this.database()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private routes (): void {
      this.express.get('/', (req, res) => {
        return res.send('Hello World')
      })
    }

    private database (): void {
      db.authenticate()
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Error: ' + err))
    }
}

export default new App().express
