/**
 * 配置项：https://github.com/vitejs/vite/blob/master/src/node/config.ts
 */

import * as path from 'path';
import './mock/vite-plugin.js';

export default {
  base: './',
  publicPath: '/',
  alias: {
    '/@/': path.resolve(__dirname, './src'),
  },
  optimizeDeps: {
    include: ['lodash/fp'],
  },
  sourcemap: true,
  port: 9875,
  open: false,
  proxy: {
    '/mock': 'localhost:9876',
  },
  chokidarWatchOptions: {
    // 去掉无意义的监听
    ignored: ['**/dist/**', '**/fontawesome/**', '**/.idea/**'],
  },
};
