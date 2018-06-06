import { Component, OnInit } from '@angular/core';
import { FullscreenService } from '../fullscreen/fullscreen.service';
import { StorageService } from '../storage-service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(public fullscreenService: FullscreenService, public storageService: StorageService) { }

  ngOnInit() {
  }

}
