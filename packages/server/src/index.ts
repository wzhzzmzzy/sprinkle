import Fastify, {FastifyInstance} from 'fastify'
import viteRender, {ViteRenderOptions} from './plugin/vite-ssr'

function createServer(): FastifyInstance {
  const app = Fastify ()
  const svelteRenderOptions : ViteRenderOptions = {
    appPackage: '@sprinkle/svelte-app',
    framework: 'svelte'
  }
  const reactRenderOptions : ViteRenderOptions = {
    appPackage: '@sprinkle/react-app',
    framework: 'react'
  }

  app.register<ViteRenderOptions>(viteRender, reactRenderOptions)

  app.get('*', async (request, reply) => {
    try {
      // @ts-ignore
      const html = await app.viteRender(request) as string
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

startServer()
