import { Injectable } from '@angular/core';
import { SetupSplitterComponent } from '../setup-splitter/setup-splitter.component';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/Rx';

// whats wrong with the ts linter...
// tslint:disable-next-line:no-var-keyword
export interface ISplitterConfig {
  isContent: boolean;
  direction: string;
  size: number;
  index: number;
  iframeTarget: string;
  nodes: ISplitterConfig[];
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static defaultConfig: ISplitterConfig = {
    isContent: true,
    direction: '',
    size: 50,
    index: 0,
    iframeTarget: '',
    nodes: []
  };

  private rootConfig: BehaviorSubject<ISplitterConfig>;
  public activeConfig;
  public isInEditMode = false;

  constructor() {
    let storedConfig = _.clone(StorageService.defaultConfig);
    try {
      storedConfig = JSON.parse(window.localStorage.getItem('iframe-splitter-config'));
    } catch (error) {
      // silent error
    }
    if (!storedConfig) {
      this.isInEditMode = true;
      storedConfig = _.clone(StorageService.defaultConfig);
    }

    this.rootConfig = <BehaviorSubject<ISplitterConfig>> new BehaviorSubject(storedConfig);
  }

  public save() {
    this.isInEditMode = false;
    this.rootConfig.next(this.activeConfig);
    window.localStorage.setItem('iframe-splitter-config', JSON.stringify(this.activeConfig));
  }

  public openEditMode() {
    this.isInEditMode = true;
  }

  public getConfig() {
    return this.rootConfig.asObservable();
  }
}
