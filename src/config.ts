import * as dotenv from "dotenv"

dotenv.config()

const config = {
     env: process.env.NODE_ENV || "development",
     protocol: process.env.PROTOCOL || "http",
     host: process.env.HOST || "localhost",
     port: process.env.PORT || 8888,
}

export default config
