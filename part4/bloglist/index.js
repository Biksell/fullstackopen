const app = require("./app")
const config = require('./utils/config')
const logger = require('./utils/logger')
require("express-async-errors")


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
