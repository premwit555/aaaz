
import { FastifyServerOptions } from "fastify"
import createApp from "./src/app"
import config from "./src/config"

const options: FastifyServerOptions = {
     logger: true,
}

const server = createApp(options)

server.listen(config.port)
