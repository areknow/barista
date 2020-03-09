/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { APP_BASE_HREF } from '@angular/common';
import { BaSinglePageContent } from '@dynatrace/shared/barista-definitions';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync, readFileSync } from 'fs';
import { sync } from 'glob';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import { AppServerModule } from './main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(
    process.cwd(),
    'dist/apps/barista-design-system/browser',
  );
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  const cacheMap = buildCacheMap(distFolder);

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
      providers: [
        {
          provide: 'CACHE_MAP',
          useValue: cacheMap,
        },
      ],
    }) as any,
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  server.get('/**/*', (req: express.Request, res: express.Response) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Builds the map for the pages that is provided
 * to the angular app instead of making http
 * request for the pages
 */
function buildCacheMap(distFolder: string): Map<string, BaSinglePageContent> {
  const data = sync('**/*.json', { cwd: join(distFolder, 'data') });
  const map = new Map<string, BaSinglePageContent>();

  data
    .filter(file => file.length)
    .forEach(file => {
      const content = readFileSync(join(distFolder, 'data', file), {
        encoding: 'utf-8',
      });
      map.set(file.replace('.json', ''), JSON.parse(content));
    });

  return map;
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './main.server';
