import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { SendJSONres } from './utils/SendRespondJSON.js'
import { FilterData } from './utils/GetDataByParam.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  if (req.url === '/api' && req.method === 'GET') {
    SendJSONres(res, 200, destinations)

  } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
    const continent = req.url.split('/').pop()
    const filteredData = FilterData(continent, destinations)
    SendJSONres(res, 200, filteredData)

  } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
    const country = req.url.split('/').pop()
    const filteredData = FilterData(country, destinations)
    SendJSONres(res, 200, filteredData)

  } else {
    SendJSONres(res, 404, {
      error: "not found",
      message: "The requested route does not exist"
    })
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
