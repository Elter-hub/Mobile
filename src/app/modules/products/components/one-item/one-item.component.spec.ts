import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OneItemComponent } from './one-item.component';

describe('OneItemComponent', () => {
  let component: OneItemComponent;
  let fixture: ComponentFixture<OneItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OneItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
