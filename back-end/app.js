const express = require('express')
const routes = require('./src/routes')
const middlewares = require('./src/middlewares')
var cors = require('cors')

const framework = express()

const { Http, Paths, Database, Auth } = require('./src/configs')

Http(framework)
Paths(framework)
Auth(framework)

framework.use(cors())

Database
    .then(() => console.info('MongoDB connected'))
    .catch((e) => console.error(e))

Object.values(routes).forEach((route) => framework.use(route))
Object.values(middlewares).forEach((middleware) => framework.use(middleware))

framework.listen(3000, () => {
    console.log('Server started')
})