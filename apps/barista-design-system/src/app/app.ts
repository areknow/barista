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

// tslint:disable: indent object-literal-key-quotes quotemark trailing-comma max-line-length no-duplicate-imports max-file-line-count

import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Title } from '@angular/platform-browser';
import { Subscription, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// import { map, switchMap } from 'rxjs/operators';
// import { BaLocationService } from './shared/services/location.service';
// import { BaPageService } from './shared/services/page.service';
// import {
//   BaPageLayoutType,
//   BaSinglePageContent,
// } from '@dynatrace/shared/barista-definitions';

const PAGE_THEME_MAP = new Map<string, string>([
  ['brand', 'purple'],
  ['resources', 'blue'],
  ['components', 'royalblue'],
  ['patterns', 'turquoise'],
]);

export const DEFAULT_PAGE_THEME = 'turquoise';

@Component({
  selector: 'ba-app',
  templateUrl: 'app.html',
  styleUrls: ['./app.scss'],
})
// implements OnInit, OnDestroy
export class BaApp {
  //   /**
  //    * @internal
  //    * The object containing all data needed to display the current page.
  //    */
  //   _currentPage$: Observable<BaSinglePageContent> = this._pageService
  //     .currentPage;
  //   /**
  //    * @internal
  //    * Observable of the current path.
  //    */
  //   _breadcrumbs$ = this._locationService.currentPath$.pipe(
  //     switchMap(path =>
  //       this._pageService.currentPage.pipe(map(page => ({ path, page }))),
  //     ),
  //     map(({ path, page }) => {
  //       return page.layout === BaPageLayoutType.Error
  //         ? []
  //         : createBreadcrumbItems(path);
  //     }),
  //   );

  //   /** Subscription on the current page. */
  //   private _currentPageSubscription = Subscription.EMPTY;
  constructor(
    //     private _pageService: BaPageService,
    //     private _locationService: BaLocationService,
    //     private _titleService: Title,
    private _router: Router,
  ) {}
  //   ngOnInit(): void {
  //     this._currentPageSubscription = this._currentPage$.subscribe(page =>
  //       this._titleService.setTitle(`${page.title} | Barista design system`),
  //     );
  //   }
  //   ngOnDestroy(): void {
  //     this._currentPageSubscription.unsubscribe();
  //   }

  /** @internal Gets the page theme based on the current location. */
  _getPageTheme(): string {
    const path = this._router.url.substr(1);
    let pageTheme = DEFAULT_PAGE_THEME;
    if (path.length) {
      const firstPart = path.split('/')[0];
      pageTheme = PAGE_THEME_MAP.get(firstPart) || pageTheme;
    }
    return pageTheme;
  }
}

  // function createBreadcrumbItems(
  //   path: string,
  // ): { title: string; href: string }[] {
  //   let previousPath = '';
  //   return path.split('/').map((part: string) => {
  //     previousPath = `${previousPath}/${part}`;
  //     part = part
  //       .split('-')
  //       .join(' ')
  //       .replace(part.charAt(0), part.charAt(0).toUpperCase());
  //     return { title: part, href: previousPath };
  //   });
  // }
