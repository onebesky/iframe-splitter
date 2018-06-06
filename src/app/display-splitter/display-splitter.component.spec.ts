import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySplitterComponent } from './display-splitter.component';
import { StorageService } from '../storage-service/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild } from '@angular/core';

// tslint:disable:prefer-const
describe('DisplaySplitterComponent', () => {

  let component: DisplaySplitterComponent;
  let fixture: ComponentFixture<DisplaySplitterComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let sanitizerSpy: jasmine.Spy;

  @Component({
    selector: `app-host-component`,
    template: `<app-display-splitter [config]="testConfig"></app-display-splitter>`
  })
  class TestHostComponent {

    @ViewChild(DisplaySplitterComponent)
    public componentUnderTestComponent: DisplaySplitterComponent;

    private testConfig: any = {
      isContent: true,
      iframeTarget: 'https://angular.io'
    };

    setConfig(newConfig: any) {
      this.testConfig = newConfig;
    }
  }

  beforeEach(async(() => {
    sanitizerSpy = jasmine.createSpy().and.returnValue('sanitized');

    TestBed.configureTestingModule({
      declarations: [DisplaySplitterComponent, TestHostComponent],
      imports: [
        AngularSplitModule,
        NgbModule.forRoot()],
      providers: [
        StorageService,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: sanitizerSpy,
            sanitize: sanitizerSpy
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
    component = testHostComponent.componentUnderTestComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sanitize target url', () => {
    expect(sanitizerSpy).toHaveBeenCalled();
    expect(component.targetUrl).toEqual('sanitized');
  })
    ;
  describe('#isValidUrl', () => {
    it('should return true', () => {
      const validUrl = 'https://angular.io/guide/quickstart';
      expect(component.isValidUrl(validUrl)).toBe(true);
    });

    describe('when invalid url is provided', () => {
      it('should return false', () => {
        const invalidUrl = 'ftp://mygrandmaslaundry.com';
        expect(component.isValidUrl(invalidUrl)).toBe(false);
      });
    });
  });
});
