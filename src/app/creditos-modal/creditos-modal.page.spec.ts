import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditosModalPage } from './creditos-modal.page';

describe('CreditosModalPage', () => {
  let component: CreditosModalPage;
  let fixture: ComponentFixture<CreditosModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditosModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditosModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
