import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @Input()
  public top: number;
  @Input()
  public left: number;
  @Input()
  public width: number;
  @Input()
  public height: number;

  @ViewChild('contentIframe') contentIframeRef: ElementRef;

  constructor(public storageService: StorageService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    if (this.config && this.isValidUrl(this.config.iframeTarget)) {
      this.targetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.iframeTarget);
    }

    if (this.config.autoRefresh) {
      this.doAutoRefresh();
    }
  }

  public isValidUrl(str) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  }

  public getElStyle() {
    const scalePercent = this.config.scale || 100;
    const scale = scalePercent / 100;
    return {
      transform: `scale(${scale})`,
      top: this.top + 'px',
      left: this.left + 'px',
      width: (this.width / scale) + 'px',
      height: (this.height / scale) + 'px'
    };
  }

  public splits() {
    let result;

    const top = Number(this.top);
    const left = Number(this.left);
    const width = Number(this.width);
    const height = Number(this.height);

    if (this.config.direction === 'vertical') {
      const firstSize = Math.round(this.config.size / 100 * height);
      result = [{
        top: top,
        left: left,
        width: width,
        height: firstSize
      }, {
        top: top + firstSize,
        left: left,
        width: width,
        height: height - firstSize
      }];
    } else {
      const firstSize = Math.round(this.config.size / 100 * this.width);
      result = [{
        top: top,
        left: left,
        width: firstSize,
        height: height
      }, {
        top: top,
        left: left + firstSize,
        width: width - firstSize,
        height: height
      }];
    }

    return result;
  }

  private doAutoRefresh() {
    window.setInterval(() => {
      if (this.contentIframeRef) {
        const src = this.contentIframeRef.nativeElement.src;
        this.contentIframeRef.nativeElement.src = '';
        this.contentIframeRef.nativeElement.src = src;
      }
    }, this.config.autoRefresh * 1000);
  }
}
