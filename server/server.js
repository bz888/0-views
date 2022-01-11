const path = require('path')
const express = require('express')
const searchRoute = require('./routes/search')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/search', searchRoute)

module.exports = server
