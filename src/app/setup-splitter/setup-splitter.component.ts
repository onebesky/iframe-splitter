import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { StorageService } from '../storage-service/storage.service';


@Component({
  selector: 'app-setup-splitter',
  templateUrl: './setup-splitter.component.html',
  styleUrls: ['./setup-splitter.component.css']
})
export class SetupSplitterComponent implements OnInit, AfterViewInit {

  @Input()
  public config;

  @Input()
  public parent?: SetupSplitterComponent;

  constructor(public storageService: StorageService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (!this.parent) {
      this.storageService.activeConfig = this.config;
    }
  }

  split(direction) {
    this.config.isContent = false;
    this.config.direction = direction;
    this.config.nodes = [
      _.clone(StorageService.defaultConfig),
      _.clone(StorageService.defaultConfig)
    ];

    this.config.nodes[0].index = 0;
    this.config.nodes[1].index = 1;

    this.config.nodes[0].iframeTarget = this.config.iframeTarget;
  }

  remove() {
    if (this.parent) {
      const parent = this.parent;
      const nodeToKeep = this.config.index === 0 ? parent.config.nodes[1] : parent.config.nodes[0];
      parent.config.nodes = nodeToKeep.nodes;
      parent.config.isContent = nodeToKeep.isContent;
      parent.config.size = nodeToKeep.size;
      parent.config.iframeTarget = nodeToKeep.iframeTarget;
    }
  }

  onDragEnd(event) {
    this.config.size = Math.round(event.sizes[0]);
    this.config.nodes[0].size = this.config.size;
    this.config.nodes[1].size = 100 - this.config.size;
  }
}

