import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Router from '../../common/router';

export default function () {
  return function renderPage (req, res) {
    const context = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const styleSheet = new ServerStyleSheet();

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <StyleSheetManager sheet={styleSheet.instance}>
          <Router />
        </StyleSheetManager>
      </StaticRouter>
    );

    const styleTags = styleSheet.getStyleTags();

    const statsFile = path.join(process.cwd(), './build-static/loadable-stats.json');
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: '/',
    });

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta name="ie-compat" content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
          <title>${req.config.get('title')}</title>
          ${extractor.getLinkTags()}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous" />
          ${styleTags}
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags()}
          <script async src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
        </body>
      </html>
    `);
  }
}
