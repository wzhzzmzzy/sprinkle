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

export interface ViteRenderOptions {
  appPackage: string
}

function svelteModuleRender (template : string, serverModule : any, props : Record<string, any>) {
  const res = serverModule.default.render(props)
  return template
    .replace(`<!--ssr-outlet-->`, res.html)
    .replace(`<!--css-outlet-->`, res.css?.code)
    .replace(`<!--head-outlet-->`, res.head)
}


const viteRenderDev : FastifyPluginAsync<ViteRenderOptions> = (
  fastify,
  opts,
) => {
  const { createServer: createViteServer } = require('vite')
  const promise = createViteServer({
    configFile: require.resolve(`${opts.appPackage}/vite.config.ts`),
  }).then(async (viteServer : ViteDevServer) => {
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
            require.resolve(`${opts.appPackage}/index.html`),
            'utf-8'
          )
        )
        const serverModule = await viteServer.ssrLoadModule(
          require.resolve(`${opts.appPackage}/src/main.ts`)
        )
        return svelteModuleRender(template, serverModule, { url })
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

const viteRender : FastifyPluginCallback<ViteRenderOptions> = (
  fastify,
  opts,
  done
) => {
  fastify.decorate('viteRender', ssrRender)
  const distPath = path.join(process.cwd(), 'dist')

  fastify.register(FastifyCompress, {})
  fastify.register(FastifyStatic, {
    root: path.join(distPath, 'client'),
  })

  const template = fs.readFileSync(path.join(distPath, 'client/index.html'), 'utf-8')
  // const manifest = require(path.join(distPath, 'client/ssr-manifest.json'))
  const serverModule = require(path.join(distPath, 'server/main.js'))

  function ssrRender(request: FastifyRequest) {
    try {
      const { url } = request
      return svelteModuleRender(template, serverModule, { url })
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
