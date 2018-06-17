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

  describe('#getElStyle', () => {
    beforeEach(() => {
      component.config.scale = 50;
      component.width = 100;
      component.height = 100;
      component.left = 0;
      component.top = 0;
    });
    it('should calculate dimensiosn for content iframe', () => {
      const res = component.getElStyle();
      expect(res).toEqual({
        transform: 'scale(0.5)',
        top: '0px',
        left: '0px',
        width: '200px',
        height: '200px'
      });
    });
  });

  describe('#splits', () => {
    beforeEach(() => {
      component.width = 100;
      component.height = 100;
      component.left = 0;
      component.top = 0;
      component.config.size = 60;
    });
    it('should calculate correct split area dimensions on vertical split', () => {
      component.config.direction = 'vertical';
      const res = component.splits();
      expect(res[0]).toEqual({
        top: 0,
        left: 0,
        width: 100,
        height: 60
      });
      expect(res[1]).toEqual({
        top: 60,
        left: 0,
        width: 100,
        height: 40
      });
    });
    it('should calculate correct split area dimensions on horizontal split', () => {
      component.config.direction = 'horizontal';
      const res = component.splits();
      expect(res[0]).toEqual({
        top: 0,
        left: 0,
        width: 60,
        height: 100
      });
      expect(res[1]).toEqual({
        top: 0,
        left: 60,
        width: 40,
        height: 100
      });
    });
  });
});
