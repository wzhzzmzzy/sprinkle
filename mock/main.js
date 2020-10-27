const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('@koa/router')
const path = require('path')
const chokidar = require('chokidar')
const chalk = require('chalk')

const mockDir = path.join(process.cwd(), 'mock')
const log = (content, head) =>
  console.log(chalk.magenta.underline.bold(`[Mock${head ? ' ' + head : ''}]`), content)

const registerRoutes = router => {
  const mocks = require('./index')
  mocks.forEach(mockApi => {
    const { url, method, response } = mockApi
    router[method](
      `${process.env.VUE_APP_MOCK_API || '/mock'}${url}`,
      (ctx, next) => {
        log(`${ctx.request.method} ${ctx.request.url}`)
        ctx.body = response(ctx.request, ctx.res)
        next()
      }
    )
  })
}

const reloadRoutes = (router, path) => {
  try {
    router.stack = []
    Object.keys(require.cache).forEach(i => {
      if (i.includes(mockDir)) {
        delete require.cache[require.resolve(i)]
      }
    })
    registerRoutes(router)
    log(`router reloaded ${path.split(mockDir)[1]}`, 'Server')
  } catch (e) {
    console.warn(e)
  }
}

function main () {
  const app = new Koa()
  const router = new Router()
  const port = 9876
  registerRoutes(router)

  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(port)
  log(`running at port ${port}. You can fetch mock api with ${chalk.bold.blueBright('_env_=mock')}.`, 'Server')

  const fsWatcher = chokidar.watch(mockDir, {
    ignored: /main/,
    ignoreInitial: true
  });

  ['add', 'addDir', 'change'].forEach(event => {
    fsWatcher.on(event, reloadRoutes.bind(null, router))
  })
}

main()
