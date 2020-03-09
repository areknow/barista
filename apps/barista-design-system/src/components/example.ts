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

import {
  Compiler,
  Component,
  Input,
  NgModule,
  OnInit,
  Type,
} from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ba-live-example',
  template: `
    <ng-container [ngComponentOutlet]="example$ | async"></ng-container>
  `,
})
export class BaLiveExample implements OnInit {
  /** The name of the example (class name) that will be instantiated. */
  @Input() name: string;

  example$: Observable<any>;

  constructor(private _compiler: Compiler) {}

  ngOnInit(): void {
    this._initExample();
  }

  private _initExample(): void {
    this.example$ = from(import(`@dynatrace/examples/chart`)).pipe(
      map(es6Module => getNgModuleFromEs6Module(es6Module)),
      filter(Boolean),
      switchMap((moduleType: Type<NgModule>) =>
        this._compiler.compileModuleAndAllComponentsAsync(moduleType),
      ),
      map(({ componentFactories }) => {
        return componentFactories.find(
          factory => factory.componentType.name === this.name,
        )?.componentType;
      }),
    );
  }
}

/** Retrieves the NgModule of an es6 module */
function getNgModuleFromEs6Module(es6Module: any): Type<NgModule> | null {
  for (const key of Object.keys(es6Module)) {
    if (isNgModule(es6Module[key])) {
      return es6Module[key];
    }
  }
  return null;
}

/** Checks if a provided type is an Angular Module */
const isNgModule = (moduleType: any): boolean =>
  !!(
    Array.isArray(moduleType?.decorators) &&
    moduleType.decorators[0]?.type?.prototype?.ngMetadataName === 'NgModule'
  );
