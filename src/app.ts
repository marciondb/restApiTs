import express from 'express'
import cors from 'cors'
import { createModels } from './database/bootstrap'
import { UserInstance } from './models/instance/User'

class App {
    protected db = createModels()

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
      this.express.get('/', (req, res) => {
        this.db.User.findAll()
          .then((user: UserInstance[]) => res.status(200).json({ user }))
          .catch(err => res.status(500).json({ err: ['oops', err] }))
        // return res.send('Hello World')
      })
    }

    private database (): void {
      this.db.sequelize.sync()
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Error: ' + err))
    }
}

export default new App().express
