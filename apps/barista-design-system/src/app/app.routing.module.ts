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

import { Route, RouterModule } from '@angular/router';
// import { BaPageGuard } from '../shared/page-guard';
import { BaErrorPage } from '../pages/error-page/error-page';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export const baristaRoutes: Route[] = [
  // {
  //   path: '/components',
  //   loadChildren: () =>
  //     import('./pages/overview-page/overview-page.module').then(
  //       module => module.BaOverviewPageModule
  //     )
  // },
  // {
  //   path: '/components/**',
  //   loadChildren: () =>
  //     import('./pages/single-page/single-page.module').then(
  //       module => module.BaSinglePageModule
  //     )
  // },
  // {
  //   path: 'page',
  //   loadChildren: () =>
  //     import('./pages/content-page/content-page.module').then(
  //       module => module.ContentPageModule
  //     )
  // },
  { path: '', redirectTo: '/components/button', pathMatch: 'full' },
  { path: 'not-found', component: BaErrorPage },
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/index-page/index-page.module').then(
        module => module.BaIndexPageModule,
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/single-page/single-page.module').then(
        module => module.BaSinglePageModule,
      ),
  },
];

@NgModule({
  declarations: [BaErrorPage],
  imports: [
    CommonModule,
    RouterModule.forRoot(baristaRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always',
      enableTracing: false, // Can be set for debugging the router
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class BaRoutingModule {}