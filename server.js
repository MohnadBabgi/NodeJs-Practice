import http from 'node:http'
import { getDataFromDB } from './database/db.js'
 
const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200;
  if (req.url === '/api' && req.method === 'GET') {
    res.end(JSON.stringify(destinations))
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
