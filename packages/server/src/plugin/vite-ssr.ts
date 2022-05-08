import * as fs from 'fs'
import * as path from 'path'
import {FastifyPluginAsync, FastifyPluginCallback, FastifyRequest} from 'fastify'
import middiePlugin from 'middie'
import FastifyStatic from 'fastify-static'
import FastifyCompress from 'fastify-compress'
import fp from 'fastify-plugin'
import type {ViteDevServer} from 'vite'

export interface ViteRenderOptions {
  appPackage: string
  framework: 'svelte' | 'react'
}

type ViteRenderServerModule<T> = {
  default: {
    render: (props: Record<string, string>) => T
  }
}

type SvelteRenderServerModule = ViteRenderServerModule<{
  html: string
  css: { code?: string }
  head: string
}>

type ReactRenderServerModule = ViteRenderServerModule<{
  html: string
  head: string
}>

type ServerModuleRender = (template: string, serverModule: SvelteRenderServerModule, props: Record<string, string>) => string

const svelteModuleRender : ServerModuleRender = (template, serverModule, props) => {
  const res = serverModule.default.render(props)
  return template
    .replace('<!--ssr-outlet-->', res.html)
    .replace('<!--css-outlet-->', res.css?.code)
    .replace('<!--head-outlet-->', res.head)
}

function reactModuleRender (template : string, serverModule : ReactRenderServerModule, props: Record<string, string>) {
  const res = serverModule.default.render(props)
  return template
    .replace('<!--ssr-outlet-->', res.html)
    .replace('<!--head-outlet-->', res.head)
}

const viteRenderDev : FastifyPluginAsync<ViteRenderOptions> = async (
  fastify,
  opts,
) => {
  const importPromise = import('vite')
  const promise = importPromise
    .then(({ createServer }) => createServer({
      configFile: require.resolve(`${opts.appPackage}/vite.config.ts`),
    }))
    .then(async (viteServer : ViteDevServer) => {
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
          require.resolve(
            opts.framework === 'react'
              ? `${opts.appPackage}/src/main.tsx`
              : `${opts.appPackage}/src/main.ts`
          )
        )

        if (opts.framework === 'svelte') {
          return svelteModuleRender(template, serverModule as SvelteRenderServerModule, { url })
        } else if (opts.framework === 'react') {
          return reactModuleRender(template, serverModule as ReactRenderServerModule, { url })
        } else {
          throw new Error(`Unknown framework: ${opts.framework as string}`)
        }

      } catch (e) {
        viteServer.ssrFixStacktrace(e as Error)
        request.log.error(e)
        throw e
      }
    })
  }

  fastify.decorate('viteRender', ssrRender)
  fastify.log.info('Added `render` method to fastify instance')

  await promise
}

const viteRender : FastifyPluginCallback<ViteRenderOptions> = (
  fastify,
  opts,
  done
) => {
  fastify.decorate('viteRender', ssrRender)
  const distPath = path.join(process.cwd(), 'dist')

  void fastify.register(FastifyCompress, {})
  void fastify.register(FastifyStatic, {
    root: path.join(distPath, 'client'),
  })

  const template = fs.readFileSync(path.join(distPath, 'client/index.html'), 'utf-8')
  // const manifest = require(path.join(distPath, 'client/ssr-manifest.json'))
  const serverModule = require(path.join(distPath, 'server/main.js')) as SvelteRenderServerModule | ReactRenderServerModule

  function ssrRender(request: FastifyRequest) {
    try {
      const { url } = request
      if (opts.framework === 'svelte') {
        return svelteModuleRender(template, serverModule as SvelteRenderServerModule, { url })
      } else if (opts.framework === 'react') {
        return reactModuleRender(template, serverModule as ReactRenderServerModule, { url })
      } else {
        throw new Error(`Unknown framework: ${opts.framework as string}`)
      }
    } catch (e) {
      request.log.error(e)
      throw e
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
