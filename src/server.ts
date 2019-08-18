import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as cors from 'cors'
import routes from './routes'

createConnection()
  .then(async () => {
    const app = express()

    // Call midlewares
    app.use(cors())
    app.use(helmet())
    app.use(bodyParser.json())

    app.use('/', routes)

    app.listen(3333, () => {
      console.log('Server started on port 3333!')
    })
  })
  .catch(error => console.log(error))
