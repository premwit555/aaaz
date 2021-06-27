import fastify, { FastifyInstance, FastifyServerOptions ,RouteShorthandOptions} from "fastify"
import fastifyCors from "fastify-cors"
import { CustomError } from "./custom/errors/custom-error"
import { PrismaClient } from "@prisma/client"

require("dotenv").config()

interface Query {
     q?: String
   }

   const opts: RouteShorthandOptions = {
     schema: {
       querystring: {
         type: 'object',
         properties: {
           q: {
             type: 'string'
           }
         }
       },
      
     }
   }

const createApp = (options: FastifyServerOptions) => {
     const prisma = new PrismaClient()
     const app: FastifyInstance = fastify(options)

     app.register(fastifyCors)
     app.get("/", async () => "Hi World")
     app.get("/user", async (req, reply) => {
          return prisma.user.findMany()
     })
     app.get<Query>("/admin", opts, async (req, reply) => {
          const  { q } = req.query


          return prisma.admin.findFirst()
     })

     app.setErrorHandler((error, request, reply) => {
          const customError: CustomError = error

          reply.status(customError.statusCode || 500).send({
               error: {
                    message: customError.message,
                    code: customError.code,
                    data: customError.data,
               },
          })
     })
     return app
}

export default createApp
