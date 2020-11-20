import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalyticPage } from './analytic.page';

describe('AnalyticPage', () => {
  let component: AnalyticPage;
  let fixture: ComponentFixture<AnalyticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
