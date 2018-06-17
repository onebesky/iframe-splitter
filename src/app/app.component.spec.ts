import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StorageService } from './storage-service/storage.service';
import { SetupSplitterComponent } from './setup-splitter/setup-splitter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplaySplitterComponent } from './display-splitter/display-splitter.component';
import { AngularSplitModule } from 'angular-split';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SetupSplitterComponent,
        NavbarComponent,
        DisplaySplitterComponent
      ],
      imports: [
        AngularSplitModule,
        AngularFontAwesomeModule,
        FormsModule
      ],
      providers: [
        StorageService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render empty setup splitter component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').textContent).toEqual('');
  }));
});
