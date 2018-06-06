import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularSplitModule } from 'angular-split';
import { StorageService } from '../storage-service/storage.service';
import { SetupSplitterComponent } from './setup-splitter.component';


// tslint:disable:prefer-const
describe('SetupSplitterComponent', () => {
  let component: SetupSplitterComponent;
  let fixture: ComponentFixture<SetupSplitterComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let storageService: any;

  @Component({
    selector: `app-host-component`,
    template: `<app-setup-splitter [config]="testConfig"></app-setup-splitter>`
  })
  class TestHostComponent {

    @ViewChild(SetupSplitterComponent)
    public componentUnderTestComponent: SetupSplitterComponent;

    private testConfig: any = {
      isContent: true,
      iframeTarget: 'my-target'
    };

    setConfig(newConfig: any) {
      this.testConfig = newConfig;
    }
  }

  beforeEach(async(() => {
    storageService = {
      activeConfig: null
    };

    TestBed.configureTestingModule({
      declarations: [SetupSplitterComponent, TestHostComponent],
      imports: [
        AngularSplitModule,
        AngularFontAwesomeModule,
        FormsModule,
        NgbModule.forRoot()],
      providers: [
        {
          provide: StorageService,
          useValue: storageService
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

  describe('#split', () => {
    it('should create two child nodes', () => {
      component.split('horizontal');
      expect(component.config.nodes.length).toEqual(2);
    });

    it('should update the first node with parents config', () => {
      component.split('horizontal');
      expect(component.config.nodes[0].iframeTarget).toEqual('my-target');
    });

    it('should set isContent to be falsy', () => {
      component.split('horizontal');
      expect(component.config.isContent).toBeFalsy();
    });

    it('should set the provided direction', () => {
      component.split('horizontal');
      expect(component.config.direction).toEqual('horizontal');
    });
  });
});
