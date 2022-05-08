import Fastify, {FastifyInstance, FastifyRequest} from 'fastify'
import viteRender, {ViteRenderOptions} from './plugin/vite-ssr'

type SSRApp = FastifyInstance & {
  viteRender: (request: FastifyRequest) => Promise<string>
}

function createServer(): FastifyInstance {
  const app = Fastify ()
  // const svelteRenderOptions : ViteRenderOptions = {
  //   appPackage: '@sprinkle/svelte-app',
  //   framework: 'svelte'
  // }
  const reactRenderOptions : ViteRenderOptions = {
    appPackage: '@sprinkle/react-app',
    framework: 'react'
  }

  void app.register<ViteRenderOptions>(viteRender, reactRenderOptions)

  app.get('*', async (request, reply) => {
    try {
      const html = await (app as unknown as SSRApp).viteRender(request)
      void reply.type('text/html').send(html)
    } catch (e) {
      void reply.status(500).send(e)
    }
  })

  return app
}

async function startServer() {
  const server = createServer()
  await server.ready()
  await server.listen(3002)
  console.log('Server is listening at http://localhost:3002')
}

void startServer()
