import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { error } from 'node:console'

const PORT = 8000

  const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  if (req.url === '/api' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(destinations))
  } else {
    res.setHeader('Content-Type', 'application/json')
    let Message = {error:"not foound", message:"The requested route does not exist"}
    res.statusCode = 404;
    res.end(JSON.stringify(Message));
/*
Challenge:
  1. If the client tries to access a route that isn’t covered by the above, send this object: 
      {error: "not found", message: "The requested route does not exist"}
  Think: what do we need to send along with the data?
*/
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
