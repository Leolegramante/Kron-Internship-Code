import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { router } from './routes'
import swaggerFiler from './swagger.json'

const app = express()

app.use(express.json())

app.use('/api-docks', swaggerUi.serve, swaggerUi.setup(swaggerFiler))

app.use(router)

app.listen(3333, () => console.log('Server is running!'))
