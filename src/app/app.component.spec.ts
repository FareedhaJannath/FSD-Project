import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlertComponent } from './component/alert/alert.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpModule } from '@angular/http';
import { AlertService } from './component/alert/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {

  let mockAlertService = {
       
   
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,AlertComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule,HttpModule,FormsModule, ReactiveFormsModule ],
      providers: [{provide: AlertService, useValue: mockAlertService}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Work Out Master'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Work Out Master');
  }));
   
});
