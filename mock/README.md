## Mock Server (Koa 2)

通过 chokidar 监听 main.js 之外的文件变更，自动重载路由。

### Mock 数据示例

- 直接 Mock

```js
({
    url: '/health-check',
    method: 'post',
    response (req, res) {
      return {
        code: 200,
        msg: 'success',
        data: {
          query: req.query, // query string
          body: req.body    // post json body
        }
      };
    }
})
```

- 使用 [Mock.js](https://github.com/nuysoft/Mock/wiki/Getting-Started)

参见 `/mock/health/index.js`
