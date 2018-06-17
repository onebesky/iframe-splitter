import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { StorageService } from './storage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public width: number;
  public height: number;
  constructor(public storageService: StorageService) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @HostListener('window:resize') onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

}
