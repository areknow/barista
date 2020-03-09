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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BaPageGuard } from '../../shared/services/page-guard';
import { BaPageContent } from './page-content';
import { BaSidenav } from '../../shared/components/sidenav';
import { BaContributors } from './components/contributors';
import { BaPageFooter } from './components/page-footer';
import { BaPageHeader } from './components/page-header';
// import { BaToc } from './components/toc';
import { BaSinglePage } from './single-page';
import { BaComponentsModule } from '../../components';

export const routes: Route[] = [
  {
    path: '',
    component: BaSinglePage,
    canActivate: [BaPageGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BaComponentsModule,
  ],
  declarations: [
    BaSinglePage,
    BaPageContent,
    BaPageHeader,
    BaContributors,
    BaPageFooter,
    BaSidenav,
    // BaToc,
  ],
})
export class BaSinglePageModule {}
