import React from 'react'
import {hydrate} from 'react-dom'
import {renderToString} from 'react-dom/server'
import {BrowserRouter} from 'react-router-dom'
import {StaticRouter} from 'react-router-dom/server'
import {Helmet} from 'react-helmet'
import init from 'excel-wasm'
import App from './App'

function render({url}: { url?: string } = {}) {
  if (import.meta.env.SSR && typeof url !== 'undefined') {
    const html = renderToString(
      <StaticRouter location={url}>
        <App/>
      </StaticRouter>
    )
    const helmetStatic = Helmet.renderStatic()
    const head = `
    ${helmetStatic.title.toString()}
    ${helmetStatic.meta.toString()}
    ${helmetStatic.link.toString()}
    `
    return {html, head}
  } else {
    void init()
    hydrate(
      <BrowserRouter>
        <App/>
      </BrowserRouter>,
      document.getElementById('app')
    )
  }
}

export default import.meta.env.SSR ? {render} : render()
