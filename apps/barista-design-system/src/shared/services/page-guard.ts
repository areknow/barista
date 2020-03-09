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

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BaPageLayoutType } from '@dynatrace/shared/barista-definitions';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { BaPageService } from './page.service';

@Injectable({
  providedIn: 'root',
})
export class BaPageGuard implements CanActivate {
  constructor(private _pageService: BaPageService, private _router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this._pageService._getPage(state.url.substr(1)).pipe(
      tap(data => {
        if (data.layout === BaPageLayoutType.Error) {
          this._router.navigate(['not-found']);
        }
      }),
      mapTo(true),
    );
  }
}
