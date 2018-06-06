import { TestBed, inject } from '@angular/core/testing';

import { FullscreenService } from './fullscreen.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('FullscreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullscreenService],
      imports: [
        NgbModule.forRoot(),
      ]
    });
  });

  it('should be created', inject([FullscreenService], (service: FullscreenService) => {
    expect(service).toBeTruthy();
  }));
});
