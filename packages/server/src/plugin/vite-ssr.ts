import * as fs from 'fs';
import * as path from 'path';
import {
  FastifyPluginAsync,
  FastifyPluginCallback,
  FastifyRequest
} from "fastify";
import middiePlugin from "middie";
import FastifyStatic from "fastify-static";
import FastifyCompress from 'fastify-compress';
import fp from 'fastify-plugin';
import type { ViteDevServer } from "vite";

const viteRenderDev : FastifyPluginAsync = (
  fastify,
  opts,
) => {
  const { createServer: createViteServer } = require('vite')
  const promise = createViteServer({
    server: { middlewareMode: 'ssr' }
  }).then(async (viteServer : ViteDevServer) => {
    // @ts-ignore
    await fastify.register(middiePlugin)
    fastify.use(viteServer.middlewares)
    return viteServer
  })

  function ssrRender(request: FastifyRequest) {
    return promise.then(async (viteServer : ViteDevServer) => {
      const { url } = request
      try {
        const template = await viteServer.transformIndexHtml(
          url,
          fs.readFileSync(
            require.resolve('@sprinkle/svelte-app/index.html'),
            'utf-8'
          )
        )

        require('svelte/register')({ hydratable: true })
        const { default: serverModule } = await viteServer.ssrLoadModule(
          require.resolve('@sprinkle/svelte-app/src/entry/server.ts')
        )
        const res = serverModule.render({ url })
        return template
          .replace(`<!--ssr-outlet-->`, res.html)
          // .replace(`<!--css-outlet-->`, css)
          // .replace(`<!--head-outlet-->`, head)
      } catch (e) {
        viteServer.ssrFixStacktrace(e as Error)
        request.log.error(e)
        throw e;
      }
    })
  }

  fastify.decorate('viteRender', ssrRender)
  fastify.log.info('Added `render` method to fastify instance')

  return promise.then(() => {})
}

const viteRender : FastifyPluginCallback = (
  fastify,
  opts,
  done
) => {
  fastify.decorate('viteRender', ssrRender)
  const distPath = path.join(__dirname, '../../../../dist');

  fastify.register(FastifyCompress, {})
  fastify.register(FastifyStatic, {
    // monorepo 根目录
    root: distPath,
  })

  const template = fs.readFileSync(path.join(distPath, 'client/index.html'), 'utf-8')
  // const manifest = require(path.join(distPath, 'client/ssr-manifest.json'))
  const { render } = require(path.join(distPath, 'server/entry-server.js'))

  function ssrRender(request: FastifyRequest) {
    try {
      const { head, html, css } = render(request.url)
      return template.replace(`<!--ssr-outlet-->`, html)
    } catch (e) {
      request.log.error(e)
      throw e;
    }
  }

  done()
}

export default fp(
  process.env.NODE_ENV === 'development' ? viteRenderDev : viteRender,
  {
    fastify: '3.x',
    name: 'vite-render',
  }
)
