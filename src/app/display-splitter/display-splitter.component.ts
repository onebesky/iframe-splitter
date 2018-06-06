import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ISplitterConfig, StorageService } from '../storage-service/storage.service';

@Component({
  selector: 'app-display-splitter',
  templateUrl: './display-splitter.component.html',
  styleUrls: ['./display-splitter.component.css']
})
export class DisplaySplitterComponent implements OnInit {

  @Input()
  public config: ISplitterConfig;

  public targetUrl: any;

  constructor(public storageService: StorageService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    if (this.config && this.isValidUrl(this.config.iframeTarget)) {
      this.targetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.iframeTarget);
    }
  }

  public isValidUrl(str) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  }

}
