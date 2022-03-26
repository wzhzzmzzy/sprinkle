import * as path from 'path';
import * as process from "process";
import Fastify, {FastifyInstance} from "fastify";
import FastifyStatic from 'fastify-static';
import viteRender from "./plugin/vite-ssr";

function createServer(): FastifyInstance {
  const app = Fastify ()

  app.register(FastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/', // optional: default '/'
  })

  app.register(viteRender)

  app.get('/', async (request, reply) => {
    try {
      // @ts-ignore
      const html = await app.viteRender(request)
      reply.type('text/html').send(html)
    } catch (e) {
      reply.status(500).send(e)
    }
  })

  return app
}

async function startServer() {
  const server = createServer()
  await server.ready()
  server.listen(3001, function (err, address) {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  })
}

startServer()