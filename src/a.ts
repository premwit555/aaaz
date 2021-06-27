import * as fastify from 'fastify'
console.log(fastify);

const server = fastify()

interface Query {
  foo?: number
}

interface Params {
  bar?: string
}

interface Body {
  baz?: string
}

interface Headers {
  a?: string
}

const opts: fastify.RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        foo: {
          type: 'number'
        }
      }
    },
    params: {
      type: 'object',
      properties: {
        bar: {
          type: 'string'
        }
      }
    },
    body: {
      type: 'object',
      properties: {
        baz: {
          type: 'string'
        }
      }
    },
    headers: {
      type: 'object',
      properties: {
        a: {
          type: 'string'
        }
      }
    }
  }
}

server.get<Query, Params, Body, Headers>('/ping/:bar', opts, (request, reply) => {
  console.log(request.query) // this is of type Query!
  console.log(request.params) // this is of type Params!
  console.log(request.body) // this is of type Body!
  console.log(request.headers) // this is of type Headers!
  reply.code(200).send({ pong: 'it worked!' })
})