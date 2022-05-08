import React from 'react'
import {hydrateRoot} from 'react-dom/client'
import {renderToString} from 'react-dom/server'
import {BrowserRouter} from 'react-router-dom'
import {StaticRouter} from 'react-router-dom/server'
import {FilledContext, HelmetProvider} from 'react-helmet-async'
import init from 'excel-wasm'
import App from './App'

function render({url}: { url?: string } = {}) {
  const helmetContext = {}
  if (import.meta.env.SSR && typeof url !== 'undefined') {
    const html = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App/>
        </StaticRouter>
      </HelmetProvider>
    )
    const helmetStatic = (helmetContext as FilledContext).helmet
    const head = `
    ${helmetStatic.title.toString()}
    ${helmetStatic.priority.toString()}
    ${helmetStatic.meta.toString()}
    ${helmetStatic.link.toString()}
    ${helmetStatic.script.toString()}
    `
    return {html, head}
  } else {
    void init()
    hydrateRoot(
      document.getElementById('app') as HTMLElement,
      <HelmetProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </HelmetProvider>
    )
  }
}

export default import.meta.env.SSR ? {render} : render()
