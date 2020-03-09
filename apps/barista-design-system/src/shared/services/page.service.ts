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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BaErrorPageContent, BaPageLayoutType, BaSinglePageContent } from '@dynatrace/shared/barista-definitions';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const CONTENT_PATH_PREFIX = 'data/';

const ERRORPAGE_404: BaErrorPageContent = {
  title: 'Error 404',
  layout: BaPageLayoutType.Error,
  content:
    'Sorry, the page you tried to access does not exist. Are you using an outdated link?',
};

const ERRORPAGE: BaErrorPageContent = {
  title: 'Oops!',
  layout: BaPageLayoutType.Error,
  content:
    "Sorry, an error has occured. Don't worry, we're working to fix the problem!",
};

@Injectable()
export class BaPageService {
  /**
   * @internal
   * Caches pages once they have been loaded.
   */
  _cache = new Map<string, BaSinglePageContent>([['not-found', ERRORPAGE]]);

  /**
   * The current page that should be displayed.
   */
  currentPage: Observable<BaSinglePageContent>;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    @Optional() @Inject("CACHE_MAP") cacheMap: Map<string, BaSinglePageContent>
  ) {
    if (cacheMap) {
      this._cache = cacheMap;
    }
  }

  _getCurrentPage(): BaSinglePageContent | null {
    console.log('>> Get current Page: ', this._router.url)
    const url = this._router.url.substr(1);
    const page = this._cache.get(url);

    if (!page) {
      this._router.navigate(['not-found']);
      return null;
    }
    return page;
  }

  /**
   * @internal
   * Gets page from cache.
   * @param url - path to page
   */
  _getPage(url: string): Observable<BaSinglePageContent> {
    console.log('>> Get Page: ', url)
    if (!this._cache.has(url)) {
      return this._fetchPage(url);
    }
    return of(this._cache.get(url)!);
  }

  /**
   * Fetches page from data source.
   * @param id - page id (path).
   */
  private _fetchPage(id: string): Observable<BaSinglePageContent> {
    console.log('>> Fetch Page: ', id)
    const requestPath = `${environment.dataHost}${CONTENT_PATH_PREFIX}${id}.json`;

    return this._http
      .get<BaSinglePageContent>(requestPath, { responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          of(error.status === 404 ? ERRORPAGE_404 : ERRORPAGE),
        ),
        tap(data => this._cache.set(id, data)),
      );
  }
}
