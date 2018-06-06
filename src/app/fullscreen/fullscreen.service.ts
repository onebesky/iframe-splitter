import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  constructor() { }

  isInFullscreenMode() {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement || null;

    return !!fullScreenElement;
  }

  goFullScreen() {
    const element = document.querySelector('#main-display');
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }
}
