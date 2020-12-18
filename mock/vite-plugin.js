import path from 'path';
import { createServer } from 'vite';
import Router from '@koa/router';
import chalk from 'chalk';


const mockDir = path.join(process.cwd(), 'mock');
const log = (content, head) =>
  console.log(chalk.magenta.underline.bold(`[Mock${head ? ' ' + head : ''}]`), content);

const registerRoutes = router => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mocks = require('./mock/');
  mocks.forEach(mockApi => {
    const { url, method, response, } = mockApi;
    router[method](
      `/mock${url}`,
      (ctx, next) => {
        log(`${ctx.request.method} ${ctx.request.url}`);
        ctx.body = response(ctx.request, ctx.res);
        next();
      }
    );
  });
};

const reloadRoutes = (router, path) => {
  try {
    router.stack = [];
    Object.keys(require.cache).forEach(i => {
      if (i.includes(mockDir)) {
        delete require.cache[require.resolve(i)];
      }
    });
    registerRoutes(router);
    log(`router reloaded ${path.split(mockDir)[1]}`, 'Server');
  } catch (e) {
    console.warn(e);
  }
};

const mockPlugin = ({
  root, // project root directory, absolute path
  app, // Koa app instance
  server, // raw http server instance
  watcher, // chokidar file watcher instance
}) => {
  const mockRouter = new Router();
  registerRoutes(mockRouter);
  app.use(mockRouter.routes()).use(mockRouter.allowedMethods());

  ['add', 'addDir', 'change'].forEach(event => {
    watcher.on(event, (path) => {
      if (path.includes(mockDir) && !/vite-plugin/.test(path)) reloadRoutes(mockRouter, path);
    });
  });
};

createServer({
  configureServer: [mockPlugin],
}).listen(9876);
