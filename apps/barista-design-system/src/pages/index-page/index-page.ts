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

import { Component } from '@angular/core';
import { BaPageService } from '../../shared/services/page.service';
// import { BaRecentlyOrderedService } from '../../shared/services/recently-ordered.service';
import { environment } from '../../environments/environment';
import { BaPageLink } from '@dynatrace/shared/barista-definitions';

@Component({
  selector: 'ba-index-page',
  templateUrl: './index-page.html',
  styleUrls: ['./index-page.scss'],
})
export class BaIndexPage {
  contents = this._pageService._getCurrentPage();

  constructor(private _pageService: BaPageService) {}
  /** @internal whether the internal content should be displayed */
  _internal = environment.internal;
  /** @internal array of recently visited pages */
  _orderedItems: (BaPageLink | null)[] = [];
  /** @internal whether recently ordered items should be displayed */
  _showOrderedItems: boolean = true;

  // constructor(private _recentlyOrderedService: BaRecentlyOrderedService) {
  //   this._orderedItems = this._recentlyOrderedService.getRecentlyOrderedItems();
  //   // It's fine to only set this property once as it shouldn't change
  //   // during runtime when staying on the index page.
  //   this._showOrderedItems =
  //     this._orderedItems.filter(item => item !== null).length > 0;
  // }
}
