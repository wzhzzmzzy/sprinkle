import Fastify, {FastifyInstance} from "fastify";
import viteRender, { ViteRenderOptions } from "./plugin/vite-ssr";

function createServer(): FastifyInstance {
  const app = Fastify ()

  app.register<ViteRenderOptions>(viteRender, { appPackage: '@sprinkle/svelte-app' })

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
  await server.listen(3001)
  console.log('Server is listening at http://localhost:3001')
}

startServer()
